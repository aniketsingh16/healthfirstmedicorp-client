"use client";

import Link from "next/link";
import Button from "@mui/material/Button";

/**
 * A MUI Button that navigates via next/link.
 *
 * This exists as its own client component because `component={Link}` passes a
 * function, and a server component cannot hand a function to a client one.
 * Wrapping the Button in an <a> would work around it but nests interactive
 * content inside interactive content, which is invalid HTML.
 */
export default function LinkButton({ href, children, ...props }) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
