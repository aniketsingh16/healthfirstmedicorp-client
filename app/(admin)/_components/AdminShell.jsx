"use client";

import { useMemo, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { buildAdminTheme, SIDEBAR_WIDTH } from "../_lib/theme";

/**
 * Owns everything client-side for the admin surface: the emotion cache Next
 * needs for SSR'd MUI, the theme, and the nav open/closed state.
 *
 * `fontFamily` is threaded down from the server layout because next/font must
 * be called in a server component, but createTheme needs the resulting stack.
 */
export default function AdminShell({ fontFamily, children }) {
  const [navOpen, setNavOpen] = useState(false);
  const theme = useMemo(() => buildAdminTheme(fontFamily), [fontFamily]);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "background.default",
            pl: { lg: `${SIDEBAR_WIDTH}px` },
          }}
        >
          <Topbar onOpenNav={() => setNavOpen(true)} />

          <Box component="main" sx={{ flexGrow: 1, py: { xs: 3, lg: 5 }, px: { xs: 2, lg: 4 } }}>
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
