"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const FormSearchHeader = ({ allProducts = [] }) => {
    const [keyword, setKeyword] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setMounted(true); // portals need the DOM, so only render after mount
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target) &&
                !e.target.closest(".ps-search-autocomplete")
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

    // function handleSelectProduct(product) {
    //     setKeyword("");
    //     setShowDropdown(false);
    //     router.push(`/products/${product.slug}`);
    // }

    function handleSelectProduct(product) {
    console.log("Selected product:", product);
    console.log("product.slug specifically:", product.slug);
    setKeyword("");
    setShowDropdown(false);
    router.push(`/products/${product.slug}`);
}
    function handleSubmit(e) {
        e.preventDefault();
        if (keyword !== "") {
            setShowDropdown(false);
            router.push(`/search?keyword=${keyword}`);
        }
    }

    // const dropdown =
    //     showDropdown && matches.length > 0
    //         ? createPortal(
    //               <ul
    //                   className="ps-search-autocomplete"
    //                   style={{
    //                       position: "absolute",
    //                       top: coords.top,
    //                       left: coords.left,
    //                       width: coords.width,
    //                       background: "#ffffff",
    //                       border: "1px solid #eee",
    //                       listStyle: "none",
    //                       margin: 0,
    //                       padding: 0,
    //                       zIndex: 999999,
    //                       maxHeight: "320px",
    //                       overflowY: "auto",
    //                       boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    //                   }}
    //               >
    //                   {matches.map((product) => (
    //                       <li
    //                           key={product.id}
    //                           onClick={() => handleSelectProduct(product)}
    //                           onMouseDown={(e) => e.preventDefault()}
    //                           style={{
    //                               padding: "8px 12px",
    //                               cursor: "pointer",
    //                               color: "#000000",
    //                               background: "#ffffff",
    //                               borderBottom: "1px solid #f5f5f5",
    //                           }}
    //                       >
    //                           {product.item}
    //                       </li>
    //                   ))}
    //               </ul>,
    //               document.body
    //           )
    //         : null;
    const dropdown =
    showDropdown && matches.length > 0
        ? createPortal(
              <ul
                  className="ps-search-autocomplete"
                  style={{
                      position: "absolute",
                      top: coords.top + 8,
                      left: coords.left,
                      width: coords.width,
                      background: "#ffffff",
                      border: "1px solid #e8ebf0",
                      borderRadius: "12px",
                      listStyle: "none",
                      margin: 0,
                      padding: "6px",
                      zIndex: 999999,
                      maxHeight: "320px",
                      overflowY: "auto",
                      boxShadow: "0 8px 24px rgba(20, 30, 60, 0.12)",
                  }}
              >
                  {matches.map((product, index) => (
                      <li
                          key={product.productID}
                          onClick={() => handleSelectProduct(product)}
                          onMouseDown={(e) => e.preventDefault()}
                          style={{
                              padding: "12px 16px",
                              cursor: "pointer",
                              color: "#1f2937",
                              fontSize: "15px",
                              borderRadius: "8px",
                              transition: "background 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f0f4fa";
                              e.currentTarget.style.color = "#1a3a6b";
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#1f2937";
                          }}
                      >
                          {product.name}
                      </li>
                  ))}
              </ul>,
              document.body
          )
        : null;

    return (
        <form onSubmit={handleSubmit} className="header__search-form">
            <div className="ps-search-table" ref={wrapperRef} style={{ position: "relative" }}>
                <div className="input-group">
                    <input
                        ref={inputRef}
                        className="form-control ps-input"
                        type="text"
                        placeholder="Search for products"
                        value={keyword}
                        onChange={handleSetKeyword}
                        onFocus={handleFocus}
                        autoComplete="off"
                    />
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