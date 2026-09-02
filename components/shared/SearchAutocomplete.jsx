"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import "./SearchAutocomplete.scss";
import { useRouter } from "next/navigation";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Wrap matched substring(s) in <mark>, case-insensitive
function highlight(text, query) {
  if (!text) return "";
  if (!query) return text;
  const re = new RegExp(escapeRegex(query), "gi");
  return text.replace(re, (m) => `<mark>${m}</mark>`);
}

export default function SearchAutocomplete({ products = [], onSelect }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);
  const activeItemRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (products ?? []).filter(
      (m) =>
        m?.name?.toLowerCase().includes(q) ||
        m?.category?.name?.toLowerCase().includes(q) ||
        m?.company?.toLowerCase().includes(q)
    );
    }, [query, products]);

  // Reset active index whenever the result set changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // Open or close dropdown based on whether there's a query
  useEffect(() => {
    setIsOpen(query.trim().length > 0);
  }, [query]);

  // Scroll active item into view on keyboard navigation
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  function handleClear() {
    setQuery("");
    setIsOpen(false);
    searchInputRef.current?.focus();
  }

  function selectResult(index) {
    const item = results[index];
    if (!item) return;
    setQuery(item.name);
    setIsOpen(false);
    if (onSelect) {
      onSelect(item);
    } else {
      router.push(`/products/${item.slug?.current}`);
    }
  }

  function handleKeyDown(e) {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) selectResult(activeIndex);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (activeIndex >= 0) {
      selectResult(activeIndex);
    }
  }

  return (
    <div className="search-wrapper" ref={searchWrapperRef}>
      <form
        className={`search-bar ${isFocused ? "focused" : ""}`}
        onSubmit={handleSubmit}
      >
        <span className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>

        <input
          ref={searchInputRef}
          className="search-input"
          type="text"
          placeholder="Search products..."
          autoComplete="off"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className={`clear-btn ${query.length > 0 ? "visible" : ""}`}
          onClick={handleClear}
        >
          &#10005;
        </button>

        {/* <button type="submit" className="search-submit">
          Search
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button> */}
      </form>

      <div className={`dropdown ${isOpen ? "open" : ""}`}>
        <div className="dropdown-header">
          {results.length} RESULT{results.length !== 1 ? "S" : ""} FOUND
        </div>

        <div className="dropdown-list">
          {results.length === 0 ? (
            <div className="no-results">No products found for &quot;{query}&quot;</div>
          ) : (
            results.map((m, i) => (
              <a
                key={m.name}
                href={`/products/${m.slug?.current || ""}`} // real destination as fallback
                ref={i === activeIndex ? activeItemRef : null}
                className={`result-item ${i === activeIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={(e) => {
                  e.preventDefault();
                  selectResult(i);
                }}
              >
                <span className="result-body">
                  <span className="result-title-row">
                    <span
                      className="result-title"
                      dangerouslySetInnerHTML={{ __html: highlight(m.name, query) }}
                    />
                  </span>
                  <span
                    className="result-subtitle"
                    dangerouslySetInnerHTML={{
                      __html: `${highlight(m.category?.name ?? "", query)} &nbsp;&middot;&nbsp; ${m.company ?? ""}`,
                    }}
                  />
                </span>
                <span className={`result-stock ${m.instock ? "in-stock" : "out-of-stock"}`}>
                  {m.instock ? "In Stock" : "Out of Stock"}
                </span>
              </a>
            ))
          )}
        </div>

        <div className="dropdown-footer">
          <span><kbd>&uarr;&darr;</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to select</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}


