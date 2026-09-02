import { notFound } from "next/navigation";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import LinkButton from "../../../_components/LinkButton";
import InvoiceDocument from "../../../_components/InvoiceDocument";
import { getInvoice } from "../../../_lib/invoices";
import { getBankDetails, getSignatory, INVOICE_TERMS } from "../../../_lib/seller";
import InvoiceActions from "./_components/InvoiceActions";

export const dynamic = "force-dynamic";

export default async function InvoiceDetailPage({ params }) {
  const { id } = await params;
  const invoice = await getInvoice(Number(id));

  if (!invoice) notFound();

  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        spacing={2}
        className="no-print"
      >
        <Stack spacing={0.5}>
          <LinkButton
            href="/dashboard/invoices"
            color="inherit"
            size="small"
            startIcon={<ArrowBackRoundedIcon />}
            sx={{ alignSelf: "flex-start", ml: -1 }}
          >
            Invoices
          </LinkButton>
          <Typography variant="h4">{invoice.invoiceNumber}</Typography>
        </Stack>

        <InvoiceActions invoiceId={invoice.invoiceId} status={invoice.status} />
      </Stack>

      <Card variant="outlined" className="invoice-sheet">
        <InvoiceDocument
          seller={invoice.seller}
          bank={getBankDetails()}
          signatory={getSignatory()}
          terms={INVOICE_TERMS}
          billTo={invoice.billTo}
          invoiceNumber={invoice.invoiceNumber}
          issueDate={invoice.issueDate}
          dueDate={invoice.dueDate}
          paymentTerms={invoice.paymentTerms}
          status={invoice.status}
          items={invoice.items}
          subtotal={invoice.subtotal}
          taxTotal={invoice.taxTotal}
          total={invoice.total}
          notes={invoice.notes}
        />
      </Card>
    </Stack>
  );
}
