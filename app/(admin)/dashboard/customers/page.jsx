import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getCustomers } from "../../_lib/queries";
import CustomersView from "./_components/CustomersView";

export const dynamic = "force-dynamic";

export default async function CustomersPage({ searchParams }) {
  const params = await searchParams;
  const segment = ["prospect", "returning"].includes(params?.segment) ? params.segment : "all";
  const search = params?.search ?? "";

  const customers = await getCustomers({ segment, search, limit: 50 });

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Customers</Typography>
        <Typography variant="body2" color="text.secondary">
          Lifetime spend excludes cancelled and refunded orders
        </Typography>
      </Stack>

      <CustomersView customers={customers} segment={segment} search={search} />
    </Stack>
  );
}
