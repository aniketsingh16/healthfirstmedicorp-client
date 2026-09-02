"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

/**
 * A hero number, not a chart. The optional sparkline is context for the value —
 * it deliberately has no axes, no grid and no markers, because the moment it
 * grows those it stops being a tile and should become its own chart.
 */
export default function StatTile({ label, value, series, caption }) {
  const hasSpark = Array.isArray(series) && series.length > 1;

  return (
    <Card sx={{ height: "100%" }}>
      <Stack sx={{ p: 3, height: "100%" }} spacing={2} justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={0.5} sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h4" sx={{ lineHeight: 1.15 }}>
              {value}
            </Typography>
          </Stack>

          {hasSpark && (
            <Box sx={{ width: 110, height: 48, flexShrink: 0 }}>
              <SparkLineChart
                data={series}
                height={48}
                area
                showTooltip={false}
                showHighlight={false}
                color="#6366F1"
                sx={{
                  "& .MuiAreaElement-root": { fill: "url(#statTileFade)", opacity: 0.9 },
                  "& .MuiLineElement-root": { strokeWidth: 2 },
                }}
              >
                <defs>
                  <linearGradient id="statTileFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </SparkLineChart>
            </Box>
          )}
        </Stack>

        {caption && (
          <Typography variant="caption" color="text.secondary">
            {caption}
          </Typography>
        )}
      </Stack>
    </Card>
  );
}
