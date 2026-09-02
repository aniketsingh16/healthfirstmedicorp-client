// Storefront CSS lives here (moved out of app/layout.js) so it does not leak
// into app/(admin) or the Sanity studio. Third-party first, then the theme.
import { GoogleAnalytics } from "@next/third-parties/google";

import 'antd/dist/reset.css';
import "@/public/static/css/bootstrap.min.css";
import "@/public/static/fonts/feather-font/css/iconfont.css";
import "@/public/static/fonts/Linearicons/Font/demo-files/demo.css";
import "@/public/static/fonts/font-awesome/css/font-awesome.min.css";
import "@/public/static/css/style.min.css";
import "@/public/static/css/slick.min.css";
import "@/styles/scss/home.scss";
import "@/styles/platform/custom.scss";
import "@/styles/platform/themes/home-one.scss";
import "@/styles/scss/autocomplete.scss";
import 'swiper/css';

import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
// import StoreHydration from "@/store/StoreHydration";
import Providers from "./providers";
import StoreHydration from "@/store/Zustand/StoreHydration";
import { Toaster } from "sonner";

function AppLayout({ children }) {
  // Storefront only — deliberately not in app/layout.js, so GA does not load on
  // /dashboard (admin) or /admin (Sanity Studio) and our own back-office work
  // never registers as site traffic.
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const enableGA = gaId && process.env.NODE_ENV === "production";

  return (
    <ClerkProvider>
      <StoreHydration />
      <Providers>{children}</Providers>
      <SanityLive />
      <Toaster richColors/>
      {enableGA && <GoogleAnalytics gaId={gaId} />}
    </ClerkProvider>
  );
}


export default AppLayout;
