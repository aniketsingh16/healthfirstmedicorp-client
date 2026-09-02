import { Inter } from "next/font/google";
import AdminShell from "./_components/AdminShell";
import "./_styles/admin.scss";

// Devias uses Inter. The storefront's Jost is applied on <html> by the root
// layout, so this overrides it for the admin subtree only.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Admin — Healthfirst Medicorp",
};

export default function AdminLayout({ children }) {
  return (
    <div className={inter.className}>
      <AdminShell fontFamily={inter.style.fontFamily}>{children}</AdminShell>
    </div>
  );
}
