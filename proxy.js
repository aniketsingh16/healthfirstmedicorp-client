import { clerkMiddleware, clerkClient, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// /shop/cart stays public on purpose — a guest should be able to build a
// cart and only be asked to sign in when they actually place the order
// (/api/checkout returns a 401 the cart page surfaces as a message).
const isProtectedRoute = createRouteMatcher([
  // "/api/webhooks/clerk",
  "/shop/success",
  "/orders",
  "/orders/(.*)",
]);

// The staff dashboard under app/(admin). Route groups do not appear in URLs,
// so everything there lives beneath /dashboard — deliberately NOT /orders,
// which is reserved above for a customer's own order history.
const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

// ---------------------------------------------------------------------------
// TEMPORARY: leaves /dashboard wide open so the UI can be built without a
// Clerk role set up. Flip back to false when you are done testing.
//
// ANDed with NODE_ENV on purpose — a production build ignores this flag
// entirely, so forgetting to reset it cannot expose every order and customer
// to the internet. It only ever opens the door on localhost.
// ---------------------------------------------------------------------------
const SKIP_ADMIN_AUTH = true;
const adminAuthDisabled = SKIP_ADMIN_AUTH && process.env.NODE_ENV !== "production";

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    if (adminAuthDisabled) {
      return NextResponse.next();
    }

    const { userId, sessionClaims, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Signed in is NOT sufficient — every shopper who registers is signed in.
    // Staff access requires publicMetadata.role === "admin", set per user in
    // the Clerk dashboard (Users → user → Metadata → Public).
    //
    // Clerk does NOT include publicMetadata in the session JWT by default, so
    // the claim is read first (fast, no network) and we fall back to fetching
    // the user when it is absent. To skip the fallback entirely, add a custom
    // claim under Clerk → Sessions → Customize session token:
    //     { "metadata": "{{user.public_metadata}}" }
    let role =
      sessionClaims?.metadata?.role ??
      sessionClaims?.publicMetadata?.role ??
      sessionClaims?.public_metadata?.role;

    if (!role) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        role = user?.publicMetadata?.role;
      } catch {
        // Treat an unreachable Clerk API as "not staff" — failing closed is the
        // only safe default for a route that exposes every order and customer.
        role = undefined;
      }
    }

    if (role !== "admin") {
      // Send them to the storefront rather than a 403, so a customer who
      // guesses /dashboard just lands on the shop.
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};