"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import {
  SIDEBAR_WIDTH,
  SIDEBAR_BG,
  SIDEBAR_TEXT,
  SIDEBAR_TEXT_ACTIVE,
  SIDEBAR_ACTIVE_BG,
} from "../_lib/theme";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: GridViewRoundedIcon, exact: true },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCartRoundedIcon },
  { label: "Customers", href: "/dashboard/customers", icon: PeopleAltRoundedIcon },
  { label: "Invoices", href: "/dashboard/invoices", icon: ReceiptLongRoundedIcon },
];

function NavItem({ item, active }) {
  const Icon = item.icon;

  return (
    <Box
      component={Link}
      href={item.href}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.25,
        borderRadius: 2,
        textDecoration: "none",
        color: active ? SIDEBAR_TEXT_ACTIVE : SIDEBAR_TEXT,
        backgroundColor: active ? SIDEBAR_ACTIVE_BG : "transparent",
        transition: "background-color .15s ease, color .15s ease",
        "&:hover": {
          color: SIDEBAR_TEXT_ACTIVE,
          backgroundColor: SIDEBAR_ACTIVE_BG,
        },
      }}
    >
      <Icon sx={{ fontSize: 22, color: active ? "primary.light" : "inherit" }} />
      <Typography variant="subtitle2" sx={{ color: "inherit" }}>
        {item.label}
      </Typography>
    </Box>
  );
}

function SidebarContent({ pathname }) {
  return (
    <Stack sx={{ height: "100%", px: 2, py: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1, pb: 3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            backgroundColor: "primary.main",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          HF
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ color: SIDEBAR_TEXT_ACTIVE, lineHeight: 1.3 }}>
            Healthfirst
          </Typography>
          <Typography variant="caption" sx={{ color: SIDEBAR_TEXT }}>
            Medicorp
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={0.5}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            // Overview is `exact` because every other route sits beneath it —
            // a prefix match would keep it lit on /dashboard/orders.
            active={
              item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`)
            }
          />
        ))}
      </Stack>
    </Stack>
  );
}

/**
 * Permanent on desktop, temporary (overlay) below `lg`. Both render the same
 * content so there is one nav definition, not two that drift apart.
 */
export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  const paperSx = {
    width: SIDEBAR_WIDTH,
    backgroundColor: SIDEBAR_BG,
    borderRight: "none",
    color: SIDEBAR_TEXT,
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": paperSx,
        }}
      >
        <SidebarContent pathname={pathname} />
      </Drawer>

      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": paperSx,
        }}
      >
        <SidebarContent pathname={pathname} />
      </Drawer>
    </>
  );
}
