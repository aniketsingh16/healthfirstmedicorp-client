"use client";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";

import { money, dateLong } from "../../_lib/format";

/**
 * Single series, so no legend — the card title names it. Grid is horizontal
 * only and recessive; vertical rules would add ink without adding readings.
 */
export default function RevenueChart({ series }) {
  const days = series.map((point) => new Date(point.day));
  const revenue = series.map((point) => point.revenue);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title="Revenue"
        subheader={`Last ${series.length} days · cancelled and refunded orders excluded`}
      />
      <Box sx={{ px: 1, pb: 2 }}>
        <LineChart
          height={320}
          xAxis={[
            {
              data: days,
              scaleType: "time",
              valueFormatter: (value) => dateLong(value),
              tickLabelStyle: { fontSize: 12, fill: "#6C737F" },
            },
          ]}
          yAxis={[
            {
              valueFormatter: (value) => money(value),
              tickLabelStyle: { fontSize: 12, fill: "#6C737F" },
            },
          ]}
          series={[
            {
              data: revenue,
              label: "Revenue",
              color: "#6366F1",
              area: true,
              showMark: false,
              curve: "monotoneX",
              valueFormatter: (value) => money(value),
            },
          ]}
          margin={{ left: 12, right: 20, top: 16, bottom: 24 }}
          grid={{ horizontal: true }}
          hideLegend
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiAreaElement-root": { fill: "url(#revenueFade)" },
            "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "#F2F4F7" },
            "& .MuiChartsGrid-line": { stroke: "#F2F4F7" },
          }}
        >
          <defs>
            <linearGradient id="revenueFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.24} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
    </Card>
  );
}
