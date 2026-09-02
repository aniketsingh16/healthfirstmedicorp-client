
"use client";
import React, { useState, useMemo } from "react";
import { AutoComplete, Input } from "antd";
import { useRouter } from "next/navigation"; // use "next/router" if Pages Router
import { urlFor } from "~/utilities/client";

export default function SearchAutocomplete({ allProducts }) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const options = useMemo(() => {
    if (!searchText.trim()) return [];

    const lower = searchText.toLowerCase();
    const matches = allProducts.filter((product) =>
      product.name?.toLowerCase().includes(lower)
    );

    return matches.slice(0, 10).map((product) => ({
      value: product.name,
      id: product.productID,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {product.imageurl && (
            <img
              src={urlFor(product.imageurl).width(32).height(32).url()}
              alt={product.name}
              style={{ width: 32, height: 32, objectFit: "cover" }}
            />
          )}
          <span>{product.name}</span>
          <span style={{ marginLeft: "auto", color: "#888" }}>₹{product.sellingPrice}</span>
        </div>
      ),
    }));
  }, [searchText, allProducts]);

  const handleSelect = (value, option) => {
    setSearchText("");
    router.push(`/product/${option.id}`);
  };

  return (
    <AutoComplete
      value={searchText}
      options={options}
      style={{ width: "100%" }}
      onSearch={setSearchText}
      onSelect={handleSelect}
      onChange={setSearchText}
    >
      <Input.Search placeholder="Search products..." size="large" allowClear />
    </AutoComplete>
  );
}