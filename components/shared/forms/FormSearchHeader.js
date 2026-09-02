// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// const FormSearchHeader = () => {
//     const [keyword, setKeyword] = useState(null);
//     const router = useRouter();

//     function handleSetKeyword(e) {
//         e.preventDefault();
//         if (e.target.value !== "") {
//             setKeyword(e.target.value);
//         } else {
//             setKeyword(e.target.value);
//         }
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (keyword !== "") {
//             console.log('CLICKED!!!  --from-search-header')
//             router.push(`/search?keyword=${keyword}`);
//         }
//     }

//     return (
//         <>
//             <form
//                 onSubmit={(e) => handleSubmit(e)}
//                 className="header__search-form">
//                 <div className="ps-search-table">
//                     <div className="input-group">
//                         <input
//                             className="form-control ps-input"
//                             type="text"
//                             placeholder="Search for products"
//                             onChange={(e) => handleSetKeyword(e)}
//                         />
//                         <div className="input-group-append">
//                             <a href="#" onClick={(e) => handleSubmit(e)}>
//                                 <i className="fa fa-search"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default FormSearchHeader;

// "use client";
// import React, { useState, useMemo, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { urlFor } from "@/utilities/client";

// const FormSearchHeader = ({ allProducts = [] }) => {
//     const [keyword, setKeyword] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);
//     const router = useRouter();
//     const wrapperRef = useRef(null);

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//                 setShowDropdown(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const matches = useMemo(() => {
//         if (!keyword.trim()) return [];
//         const lower = keyword.toLowerCase();
//         return allProducts
//             .filter((product) => product.item?.toLowerCase().includes(lower))
//             .slice(0, 8);
//     }, [keyword, allProducts]);

//     function handleSetKeyword(e) {
//         const value = e.target.value;
//         setKeyword(value);
//         setShowDropdown(value !== "");
//     }

//     function handleSelectProduct(product) {
//         setKeyword("");
//         setShowDropdown(false);
//         router.push(`/product/${product.id}`);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (keyword !== "") {
//             setShowDropdown(false);
//             router.push(`/search?keyword=${keyword}`);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="header__search-form">
//             <div className="ps-search-table" ref={wrapperRef} style={{ position: "relative" }}>
//                 <div className="input-group">
//                     <input
//                         className="form-control ps-input"
//                         type="text"
//                         placeholder="Search for products"
//                         value={keyword}
//                         onChange={handleSetKeyword}
//                         onFocus={() => keyword && setShowDropdown(true)}
//                         autoComplete="off"
//                     />
//                     <div className="input-group-append">
//                         <a href="#" onClick={handleSubmit}>
//                             <i className="fa fa-search"></i>
//                         </a>
//                     </div>
//                 </div>

//                 {showDropdown && matches.length > 0 && (
//                     <ul
//                         className="ps-search-autocomplete"
//                         style={{
//                             position: "absolute",
//                             top: "100%",
//                             left: 0,
//                             right: 0,
//                             background: "#fff",
//                             border: "1px solid #eee",
//                             borderTop: "none",
//                             listStyle: "none",
//                             margin: 0,
//                             padding: 0,
//                             zIndex: 999,
//                             maxHeight: "320px",
//                             overflowY: "auto",
//                             boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
//                         }}
//                     >
//                         {matches.map((product) => (
//                             <li
//                                 key={product.id}
//                                 onClick={() => handleSelectProduct(product)}
//                                 onMouseDown={(e) => e.preventDefault()}
//                                 style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "10px",
//                                     padding: "8px 12px",
//                                     cursor: "pointer",
//                                     borderBottom: "1px solid #f5f5f5",
//                                 }}
//                             >
//                                 {product.imageurl && (
//                                     <img
//                                         src={urlFor(product.imageurl).width(32).height(32).url()}
//                                         alt={product.item}
//                                         style={{ width: 32, height: 32, objectFit: "cover" }}
//                                     />
//                                 )}
//                                 <span style={{ flex: 1 }}>{product.item}</span>
//                                 <span style={{ color: "#888" }}>₹{product.price}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </form>
//     );
// };

// export default FormSearchHeader;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";
// import React, { useState, useMemo, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createPortal } from "react-dom";

// const FormSearchHeader = ({ allProducts = [] }) => {
//     const [keyword, setKeyword] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
//     const [mounted, setMounted] = useState(false);
//     const router = useRouter();
//     const wrapperRef = useRef(null);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         setMounted(true); // portals need the DOM, so only render after mount
//     }, []);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (
//                 wrapperRef.current &&
//                 !wrapperRef.current.contains(e.target) &&
//                 !e.target.closest(".ps-search-autocomplete")
//             ) {
//                 setShowDropdown(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const matches = useMemo(() => {
//         if (!keyword.trim()) {
//             return allProducts.slice(0, 8);
//         }
//         const lower = keyword.toLowerCase();
//         return allProducts
//             .filter((product) => product.item?.toLowerCase().includes(lower))
//             .slice(0, 8);
//     }, [keyword, allProducts]);

//     function updateCoords() {
//         if (inputRef.current) {
//             const rect = inputRef.current.getBoundingClientRect();
//             setCoords({
//                 top: rect.bottom + window.scrollY,
//                 left: rect.left + window.scrollX,
//                 width: rect.width,
//             });
//         }
//     }

//     function handleSetKeyword(e) {
//         setKeyword(e.target.value);
//         setShowDropdown(true);
//         updateCoords();
//     }

//     function handleFocus() {
//         setShowDropdown(true);
//         updateCoords();
//     }

//     function handleSelectProduct(product) {
//         setKeyword("");
//         setShowDropdown(false);
//         router.push(`/products/${product.slug.current}`);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (keyword !== "") {
//             setShowDropdown(false);
//             router.push(`/search?keyword=${keyword}`);
//         }
//     }

//     const dropdown =
//         showDropdown && matches.length > 0
//             ? createPortal(
//                   <ul
//                       className="ps-search-autocomplete"
//                       style={{
//                           position: "absolute",
//                           top: coords.top,
//                           left: coords.left,
//                           width: coords.width,
//                           background: "#ffffff",
//                           border: "1px solid #eee",
//                           listStyle: "none",
//                           margin: 0,
//                           padding: 0,
//                           zIndex: 999999,
//                           maxHeight: "320px",
//                           overflowY: "auto",
//                           boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
//                       }}
//                   >
//                       {matches.map((product) => (
//                           <li
//                               key={product.id}
//                               onClick={() => handleSelectProduct(product)}
//                               onMouseDown={(e) => e.preventDefault()}
//                               style={{
//                                   padding: "8px 12px",
//                                   cursor: "pointer",
//                                   color: "#000000",
//                                   background: "#ffffff",
//                                   borderBottom: "1px solid #f5f5f5",
//                               }}
//                           >
//                               {product.item}
//                           </li>
//                       ))}
//                   </ul>,
//                   document.body
//               )
//             : null;

//     return (
//         <form onSubmit={handleSubmit} className="header__search-form">
//             <div className="ps-search-table" ref={wrapperRef} style={{ position: "relative" }}>
//                 <div className="input-group">
//                     <input
//                         ref={inputRef}
//                         className="form-control ps-input"
//                         type="text"
//                         placeholder="Search for products"
//                         value={keyword}
//                         onChange={handleSetKeyword}
//                         onFocus={handleFocus}
//                         autoComplete="off"
//                     />
//                     <div className="input-group-append">
//                         <a href="#" onClick={handleSubmit}>
//                             <i className="fa fa-search"></i>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             {mounted && dropdown}
//         </form>
//     );
// };

// export default FormSearchHeader;


"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import "./autocomplete.scss";

// Escape special regex chars so the query can be used safely inside a RegExp
function escapeRegex(str = "") {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Wraps every case-insensitive match of `query` inside `text` with <mark>
function highlightMatch(text = "", query = "") {
    if (!query.trim()) return text;
    const re = new RegExp(escapeRegex(query), "gi");
    const parts = text.split(re);
    const matches = text.match(re);

    if (!matches) return text;

    return parts.reduce((acc, part, i) => {
        acc.push(part);
        if (i < matches.length) {
            acc.push(<mark key={i}>{matches[i]}</mark>);
        }
        return acc;
    }, []);
}

function resolveImageUrl(product) {
    // return urlFor(product.imageurl).width(80).height(80).url();
    return product?.imageurl?.asset?.url || null; // placeholder fallback
}

const FormSearchHeader = ({ allProducts = [] }) => {
    const [keyword, setKeyword] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const router = useRouter();
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        setMounted(true); // portals need the DOM, so only render after mount
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target) &&
                !e.target.closest(".hfm-autocomplete__dropdown")
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const matches = useMemo(() => {
        if (!keyword.trim()) {
            return allProducts.slice(0, 8);
        }
        const lower = keyword.toLowerCase();
        return allProducts
            .filter((product) => product.name?.toLowerCase().includes(lower))
            .slice(0, 8);
    }, [keyword, allProducts]);

    // Reset the keyboard-highlighted row whenever the result set changes
    useEffect(() => {
        setActiveIndex(-1);
    }, [matches]);

    function updateCoords() {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }

    function handleSetKeyword(e) {
        setKeyword(e.target.value);
        setShowDropdown(true);
        updateCoords();
    }

    function handleFocus() {
        setShowDropdown(true);
        updateCoords();
    }

    function handleClear() {
        setKeyword("");
        setShowDropdown(false);
        inputRef.current?.focus();
    }

    function handleSelectProduct(product) {
        setKeyword("");
        setShowDropdown(false);
        router.push(`/products/${product.slug.current}`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword !== "") {
            setShowDropdown(false);
            router.push(`/search?keyword=${keyword}`);
        }
    }

    function handleKeyDown(e) {
        if (!showDropdown || matches.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, matches.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            if (activeIndex >= 0) {
                e.preventDefault();
                handleSelectProduct(matches[activeIndex]);
            }
        } else if (e.key === "Escape") {
            setShowDropdown(false);
        }
    }

    // Keep the keyboard-active row in view as the user arrows through
    useEffect(() => {
        if (activeIndex < 0 || !listRef.current) return;
        const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
        activeEl?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    const dropdown =
        showDropdown && matches.length > 0
            ? createPortal(
                  <div
                      className="hfm-autocomplete__dropdown"
                      style={{
                          position: "absolute",
                          top: coords.top + 10,
                          left: coords.left,
                          width: coords.width,
                          zIndex: 999999,
                      }}
                  >
                      <div className="hfm-autocomplete__dropdown-header">
                          {matches.length} RESULT{matches.length !== 1 ? "S" : ""} FOUND
                      </div>
                      <div className="hfm-autocomplete__list" ref={listRef}>
                          {matches.map((product, index) => {
                              const imageUrl = resolveImageUrl(product);
                              const inStock = product.instock ?? product.stock > 0;

                              return (
                                  <a
                                      key={product.productID}
                                      href="#"
                                      data-index={index}
                                      className={`hfm-autocomplete__item${
                                          index === activeIndex ? " hfm-autocomplete__item--active" : ""
                                      }`}
                                      onMouseEnter={() => setActiveIndex(index)}
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={(e) => {
                                          e.preventDefault();
                                          handleSelectProduct(product);
                                      }}
                                  >
                                      <span className="hfm-autocomplete__item-thumb">
                                          {imageUrl ? (
                                              <img src={imageUrl} alt={product.name} />
                                          ) : (
                                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <rect x="3" y="3" width="18" height="18" rx="2" />
                                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                                  <path d="M21 15l-5-5L5 21" />
                                              </svg>
                                          )}
                                      </span>
                                      <span className="hfm-autocomplete__item-body">
                                          <span className="hfm-autocomplete__item-title-row">
                                              <span className="hfm-autocomplete__item-title">
                                                  {highlightMatch(product.name, keyword)}
                                              </span>
                                              {product.category?.name && (
                                                  <span className="hfm-autocomplete__badge">
                                                      {product.category.name}
                                                  </span>
                                              )}
                                          </span>
                                          {product.company && (
                                              <span className="hfm-autocomplete__item-subtitle">
                                                  {product.company}
                                              </span>
                                          )}
                                      </span>
                                      <span className="hfm-autocomplete__item-trailing">
                                          {typeof product.sellingPrice === "number" && (
                                              <span className="hfm-autocomplete__price">
                                                  &#8377;{product.sellingPrice}
                                              </span>
                                          )}
                                          <span
                                              className={`hfm-autocomplete__stock hfm-autocomplete__stock--${
                                                  inStock ? "in" : "out"
                                              }`}
                                          >
                                              {inStock ? "In Stock" : "Out of Stock"}
                                          </span>
                                      </span>
                                  </a>
                              );
                          })}
                      </div>
                      <div className="hfm-autocomplete__footer">
                          <span><kbd>&uarr;&darr;</kbd> to navigate</span>
                          <span><kbd>Enter</kbd> to select</span>
                          <span><kbd>Esc</kbd> to close</span>
                      </div>
                  </div>,
                  document.body
              )
            : null;

    return (
        <form onSubmit={handleSubmit} className="header__search-form hfm-autocomplete">
            <div className="ps-search-table hfm-autocomplete__search-bar" ref={wrapperRef}>
                <div className="input-group">
                    <input
                        ref={inputRef}
                        className="form-control ps-input hfm-autocomplete__input"
                        type="text"
                        placeholder="Search for products"
                        value={keyword}
                        onChange={handleSetKeyword}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                    {keyword && (
                        <button
                            type="button"
                            className="hfm-autocomplete__clear-btn"
                            onClick={handleClear}
                        >
                            &#10005;
                        </button>
                    )}
                    <div className="input-group-append">
                        <a href="#" onClick={handleSubmit}>
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                </div>
            </div>
            {mounted && dropdown}
        </form>
    );
};

export default FormSearchHeader;