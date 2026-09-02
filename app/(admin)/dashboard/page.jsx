import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getOverviewKpis, getRevenueSeries, getTopProducts } from "../_lib/queries";
import { money, count } from "../_lib/format";
import StatTile from "./_components/StatTile";
import RevenueChart from "./_components/RevenueChart";
import TopProductsCard from "./_components/TopProductsCard";

// Sales figures should not be served from a build-time cache.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [kpis, series, topProducts] = await Promise.all([
    getOverviewKpis(),
    getRevenueSeries(30),
    getTopProducts(5),
  ]);

  const revenueSpark = series.map((point) => point.revenue);
  const ordersSpark = series.map((point) => point.orders);

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Overview</Typography>
        <Typography variant="body2" color="text.secondary">
          Sales performance across all channels
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatTile
            label="Revenue"
            value={money(kpis.revenue)}
            series={revenueSpark}
            caption="Excludes cancelled and refunded"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatTile
            label="Orders"
            value={count(kpis.orderCount)}
            series={ordersSpark}
            caption="Last 30 days trend"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatTile
            label="Customers"
            value={count(kpis.customerCount)}
            caption={`${count(kpis.buyingCustomers)} have ordered`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatTile
            label="Average order value"
            value={money(kpis.avgOrderValue)}
            caption="Across counted orders"
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueChart series={series} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TopProductsCard products={topProducts} />
        </Grid>
      </Grid>
    </Stack>
  );
}
