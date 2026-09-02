"use client";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { count, money } from "../../_lib/format";

/**
 * A ranked magnitude list, built in plain markup rather than a chart component.
 * Five bars with a label and a value do not need a plotting library, and hand
 * markup keeps the 4px rounded data-end and the recessive track exact.
 *
 * One measure (units) means one hue — this is not categorical data, so the bars
 * deliberately share a colour and rank carries the meaning.
 */
export default function TopProductsCard({ products }) {
  const max = Math.max(...products.map((p) => p.units), 1);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Top products" subheader="By units sold" />

      <Stack spacing={2.5} sx={{ px: 3, pb: 3 }}>
        {products.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No orders yet.
          </Typography>
        )}

        {products.map((product) => (
          <Stack key={product.productId} spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {product.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                {count(product.units)} · {money(product.revenue)}
              </Typography>
            </Stack>

            <Box
              sx={{
                position: "relative",
                height: 8,
                borderRadius: 1,
                backgroundColor: "grey.100",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: `${(product.units / max) * 100}%`,
                  borderRadius: 1,
                  backgroundColor: "primary.main",
                }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
