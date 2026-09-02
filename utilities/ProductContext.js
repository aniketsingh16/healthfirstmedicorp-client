// ProductsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { client } from "./client";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await client.fetch(`*[_type == "allProducts"]{
          ...,
          category->{ _id, "name": coalesce(name, title), slug }
        }`);
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
