"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { moneyExact, dateLong } from "../_lib/format";
import { INVOICE_STATUS_LABEL } from "../_lib/seller";
import InvoiceFooter from "./InvoiceFooter";

/**
 * The invoice itself. Deliberately one component shared by the create form's
 * live preview and the saved detail page — if these ever diverge, what the user
 * approved is not what gets printed.
 *
 * Presentational only: every number arrives computed. It never calls
 * computeTotals itself, so preview and stored document cannot drift.
 */

function Label({ children }) {
  return (
    <Typography
      variant="overline"
      sx={{ color: "text.secondary", display: "block", lineHeight: 1.6 }}
    >
      {children}
    </Typography>
  );
}

export default function InvoiceDocument({
  seller,
  bank,
  signatory,
  terms,
  billTo,
  invoiceNumber,
  issueDate,
  dueDate,
  paymentTerms,
  status = "draft",
  items = [],
  subtotal = 0,
  taxTotal = 0,
  total = 0,
  notes,
}) {
  return (
    <Box
      className="invoice-document"
      sx={{ p: { xs: 3, md: 4 }, backgroundColor: "background.paper" }}
    >
      {/* Header ------------------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {seller?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {seller?.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {seller?.email} · {seller?.phone}
          </Typography>
          {seller?.gstin && (
            <Typography variant="body2" color="text.secondary">
              GSTIN: {seller.gstin}
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: "right", flexShrink: 0 }}>
          <Label>Invoice</Label>
          <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
            {invoiceNumber ?? "(auto)"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {issueDate ? dateLong(issueDate) : "—"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Due: {dueDate ? dateLong(dueDate) : "—"}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Parties ------------------------------------------------------ */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ mb: 4 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Label>Billed to</Label>
          {billTo?.name ? (
            <>
              <Typography variant="subtitle2">{billTo.name}</Typography>
              {billTo.address && (
                <Typography variant="body2" color="text.secondary">
                  {billTo.address}
                </Typography>
              )}
              {(billTo.email || billTo.phone) && (
                <Typography variant="body2" color="text.secondary">
                  {[billTo.email, billTo.phone].filter(Boolean).join(" · ")}
                </Typography>
              )}
              {billTo.gstin && (
                <Typography variant="body2" color="text.secondary">
                  GSTIN: {billTo.gstin}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body2" sx={{ color: "primary.light" }}>
              Select a customer
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Label>Payment terms</Label>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {paymentTerms || "—"}
          </Typography>
          <Label>Status</Label>
          <Typography variant="body2">{INVOICE_STATUS_LABEL[status] ?? status}</Typography>
        </Box>
      </Stack>

      {/* Lines -------------------------------------------------------- */}
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
        <Box component="thead">
          <Box component="tr">
            {["SKU", "Description", "Qty", "Rate", "Tax", "Amount"].map((heading, index) => (
              <Box
                key={heading}
                component="th"
                sx={{
                  textAlign: index < 2 ? "left" : "right",
                  py: 1,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  whiteSpace: "nowrap",
                }}
              >
                <Label>{heading}</Label>
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="tbody">
          {items.length === 0 && (
            <Box component="tr">
              <Box component="td" colSpan={6} sx={{ py: 5, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "primary.light" }}>
                  Add line items to see totals
                </Typography>
              </Box>
            </Box>
          )}

          {items.map((item, index) => (
            <Box component="tr" key={item.key ?? index}>
              <Box component="td" sx={{ py: 2, verticalAlign: "top" }}>
                <Typography variant="caption" color="text.secondary">
                  {item.hsnCode || "—"}
                </Typography>
              </Box>
              <Box component="td" sx={{ py: 2, verticalAlign: "top", pr: 2 }}>
                <Typography variant="subtitle2">{item.name || "Untitled item"}</Typography>
                {item.description && (
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </Box>
              <Box component="td" sx={{ py: 2, textAlign: "right", whiteSpace: "nowrap" }}>
                <Typography variant="body2">
                  {item.quantity} {item.unit}
                </Typography>
              </Box>
              <Box component="td" sx={{ py: 2, textAlign: "right", whiteSpace: "nowrap" }}>
                <Typography variant="body2">{moneyExact(item.rate)}</Typography>
              </Box>
              <Box component="td" sx={{ py: 2, textAlign: "right", whiteSpace: "nowrap" }}>
                <Typography variant="body2">{item.taxRate}%</Typography>
              </Box>
              <Box component="td" sx={{ py: 2, textAlign: "right", whiteSpace: "nowrap" }}>
                <Typography variant="subtitle2">{moneyExact(item.lineTotal)}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Totals ------------------------------------------------------- */}
      <Stack sx={{ mt: 4, ml: "auto", maxWidth: 320 }} spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Subtotal
          </Typography>
          <Typography variant="body2">{moneyExact(subtotal)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Tax (GST)
          </Typography>
          <Typography variant="body2">{moneyExact(taxTotal)}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            Grand total
          </Typography>
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            {moneyExact(total)}
          </Typography>
        </Stack>
      </Stack>

      {notes && (
        <Box sx={{ mt: 4 }}>
          <Label>Notes</Label>
          <Typography variant="body2" color="text.secondary">
            {notes}
          </Typography>
        </Box>
      )}

      {bank && signatory && (
        <InvoiceFooter
          bank={bank}
          signatory={signatory}
          terms={terms}
          signedAt={issueDate}
        />
      )}
    </Box>
  );
}
