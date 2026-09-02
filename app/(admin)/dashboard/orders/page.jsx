import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getOrders, getStatusBreakdown, getOrderItemsByOrder } from "../../_lib/queries";
import OrdersView from "./_components/OrdersView";

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }) {
  // Next 15+ hands searchParams over as a promise.
  const params = await searchParams;
  const status = params?.status ?? "all";
  const search = params?.search ?? "";
  const sort = params?.sort === "oldest" ? "oldest" : "newest";

  const [{ rows, total }, counts] = await Promise.all([
    getOrders({ status, search, sort, limit: 50 }),
    getStatusBreakdown(),
  ]);

  // Fetched for the whole page in one query so expanding a row is instant and
  // needs no extra round trip.
  const itemsByOrder = await getOrderItemsByOrder(rows.map((r) => r.orderId));

  const allCount = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Orders</Typography>
        <Typography variant="body2" color="text.secondary">
          {total} {total === 1 ? "order" : "orders"} in this view
        </Typography>
      </Stack>

      <OrdersView
        orders={rows}
        itemsByOrder={itemsByOrder}
        total={allCount}
        counts={counts}
        status={status}
        search={search}
        sort={sort}
      />
    </Stack>
  );
}
