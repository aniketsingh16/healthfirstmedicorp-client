import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import LinkButton from "../../_components/LinkButton";
import { getInvoices, getInvoiceKpis, getCustomerOptions } from "../../_lib/invoices";
import InvoicesView from "./_components/InvoicesView";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    search: params?.search ?? "",
    status: params?.status ?? "all",
    customerId: params?.customerId ?? "",
    from: params?.from ?? "",
    to: params?.to ?? "",
  };

  const [invoices, kpis, customers] = await Promise.all([
    getInvoices(filters),
    getInvoiceKpis(),
    getCustomerOptions(),
  ]);

  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4">Invoices</Typography>
          <Typography variant="body2" color="text.secondary">
            {invoices.length} shown
          </Typography>
        </Stack>

        <LinkButton
          href="/dashboard/invoices/new"
          variant="contained"
          startIcon={<AddRoundedIcon />}
        >
          New invoice
        </LinkButton>
      </Stack>

      <InvoicesView invoices={invoices} kpis={kpis} customers={customers} filters={filters} />
    </Stack>
  );
}
