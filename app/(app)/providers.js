// app/
// ├── layout.js                 ← unchanged (root, fonts + CSS)
// └── (app)/
//     ├── layout.js              ← replaced (Clerk, Redux, Sanity, Providers)
//     ├── providers.js           ← new file (CookiesProvider, MasterLayout, ProductsProvider)
//     └── ...your existing routes/pages

'use client';

import { CookiesProvider } from "react-cookie";
import MasterLayout from "@/components/layouts/MasterLayout";
import { ProductsProvider } from "@/utilities/ProductContext";

export default function Providers({ children }) {
  return (
    <ProductsProvider>
      <CookiesProvider>
        <MasterLayout>
          <main id="homepage-one">{children}</main>
        </MasterLayout>
      </CookiesProvider>
    </ProductsProvider>
  );
}