// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//    images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//       }
//     ]
//   }
// };

// export default nextConfig;




/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    // Uses a Fragment ref instead of findDOMNode to locate the new segment, so
    // React-hoisted <head> metadata from generateMetadata is no longer mistaken
    // for page content (which silently cancelled the scroll-to-top).
    appNewScrollHandler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      }
    ]
  }
};

export default nextConfig;
