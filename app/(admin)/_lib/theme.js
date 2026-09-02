import { createTheme } from "@mui/material/styles";

/**
 * Admin theme, tuned to match the Devias reference screenshots.
 *
 * Devias is MUI with light customisation, so most of the look comes from the
 * defaults — what is overridden here is the indigo primary, the near-black
 * neutral text, the 20px card radius, and the flat (shadow-less) surfaces.
 *
 * SIDEBAR_* are exported rather than themed because the nav is a dark island in
 * an otherwise light UI; putting it in the palette would mean fighting
 * `mode: 'light'` on every nav child.
 */
export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_BG = "#1C2536";
export const SIDEBAR_TEXT = "#9DA4AE";
export const SIDEBAR_TEXT_ACTIVE = "#FFFFFF";
export const SIDEBAR_ACTIVE_BG = "rgba(255, 255, 255, 0.04)";
export const SIDEBAR_HEADING = "#635BFF";

export const TOPBAR_HEIGHT = 72;

export function buildAdminTheme(fontFamily) {
  return createTheme({
    palette: {
      mode: "light",
      primary: { main: "#6366F1", light: "#818CF8", dark: "#4338CA", contrastText: "#FFFFFF" },
      success: { main: "#10B981", light: "#3FC79A", dark: "#0B815A", contrastText: "#FFFFFF" },
      warning: { main: "#F79009", light: "#FDB022", dark: "#B54708", contrastText: "#FFFFFF" },
      error: { main: "#F04438", light: "#DA6868", dark: "#B42318", contrastText: "#FFFFFF" },
      info: { main: "#06AED4", light: "#22CCEE", dark: "#0E7090", contrastText: "#FFFFFF" },
      text: {
        primary: "#111927",
        secondary: "#6C737F",
        disabled: "rgba(17, 25, 39, 0.38)",
      },
      background: {
        default: "#F8F9FA",
        paper: "#FFFFFF",
      },
      divider: "#F2F4F7",
      grey: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D2D6DB",
        400: "#9DA4AE",
        500: "#6C737F",
        600: "#4D5761",
        700: "#2F3746",
        800: "#1C2536",
        900: "#111927",
      },
    },

    shape: { borderRadius: 8 },

    typography: {
      fontFamily,
      button: { fontWeight: 600, textTransform: "none" },
      h1: { fontWeight: 700, fontSize: "3.5rem", lineHeight: 1.2 },
      h2: { fontWeight: 700, fontSize: "3rem", lineHeight: 1.2 },
      h3: { fontWeight: 700, fontSize: "2.25rem", lineHeight: 1.2 },
      h4: { fontWeight: 700, fontSize: "2rem", lineHeight: 1.2 },
      h5: { fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.2 },
      h6: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.2 },
      subtitle2: { fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.57 },
      body2: { fontSize: "0.875rem", lineHeight: 1.57 },
      caption: { fontSize: "0.75rem", lineHeight: 1.66 },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      },
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: "0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: "h6" },
          subheaderTypographyProps: { variant: "body2" },
        },
        styleOverrides: { root: { padding: "24px 24px 16px" } },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              backgroundColor: "#F8F9FA",
              color: "#6C737F",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              borderBottom: "1px solid #F2F4F7",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: "1px solid #F2F4F7", padding: "16px" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 12, paddingInline: 16, textTransform: "none" },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: "0.75rem", borderRadius: 12 },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            minWidth: "auto",
            paddingInline: 0,
            marginRight: 24,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 12, backgroundColor: "#FFFFFF" },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": { boxSizing: "border-box" },
          html: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" },
        },
      },
    },
  });
}
