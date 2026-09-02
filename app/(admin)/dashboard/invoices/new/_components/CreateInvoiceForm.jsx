"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import InvoiceDocument from "../../../../_components/InvoiceDocument";
import { computeTotals, PAYMENT_TERMS, dueDateFor } from "../../../../_lib/seller";
import { saveInvoiceAction } from "../../../../_lib/actions";

const DEFAULT_TAX_RATE = 18;

function Label({ children }) {
  return (
    <Typography
      variant="overline"
      sx={{
        color: "text.secondary",
        display: "inline-block",
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 0.25,
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

let keyCounter = 0;
const nextKey = () => `line-${(keyCounter += 1)}`;

export default function CreateInvoiceForm({
  customers,
  products,
  seller,
  bank,
  signatory,
  terms,
}) {
  const router = useRouter();
  const [isSaving, startSaving] = useTransition();
  const [error, setError] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);
  const [issueDate, setIssueDate] = useState(today);
  const [paymentTerms, setPaymentTerms] = useState("Net 15");
  const [dueDate, setDueDate] = useState(dueDateFor(today, "Net 15"));
  const [notes, setNotes] = useState("");

  const customer = customers.find((c) => String(c.customerId) === customerId) ?? null;

  const billTo = customer
    ? {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        gstin: customer.gstin ?? null,
      }
    : null;

  // Same function the server uses before insert, so the preview cannot lie.
  const totals = useMemo(() => computeTotals(items), [items]);

  function handleTermsChange(value) {
    setPaymentTerms(value);
    const implied = dueDateFor(issueDate, value);
    if (implied) setDueDate(implied);
  }

  function handleIssueDateChange(value) {
    setIssueDate(value);
    const implied = dueDateFor(value, paymentTerms);
    if (implied) setDueDate(implied);
  }

  function addProduct() {
    setItems((prev) => [
      ...prev,
      {
        key: nextKey(),
        productId: "",
        name: "",
        description: "",
        hsnCode: "",
        quantity: 1,
        unit: "pcs",
        rate: 0,
        taxRate: DEFAULT_TAX_RATE,
      },
    ]);
  }

  function addAdHoc() {
    setItems((prev) => [
      ...prev,
      {
        key: nextKey(),
        productId: null,
        name: "",
        description: "",
        hsnCode: "",
        quantity: 1,
        unit: "pcs",
        rate: 0,
        taxRate: DEFAULT_TAX_RATE,
        adHoc: true,
      },
    ]);
  }

  function updateItem(key, changes) {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, ...changes } : item)));
  }

  function pickProduct(key, productId) {
    const product = products.find((p) => String(p.productID) === String(productId));
    updateItem(key, {
      productId,
      name: product?.name ?? "",
      rate: product?.sellingPrice ?? 0,
    });
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  function handleSave() {
    setError(null);
    startSaving(async () => {
      const result = await saveInvoiceAction({
        customerId: customer?.customerId ?? null,
        billTo,
        items: totals.lines,
        issueDate,
        dueDate,
        paymentTerms,
        notes,
      });
      // A successful action redirects, so anything returned here is a failure.
      if (result && !result.ok) setError(result.error);
    });
  }

  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="overline" color="text.secondary">
            New
          </Typography>
          <Typography variant="h4">Create invoice.</Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" color="inherit" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Save invoice"}
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={4}>
        {/* ---------------------------------------------------- form */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Label>Customer</Label>
              <TextField
                select
                fullWidth
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                slotProps={{
                  select: {
                    displayEmpty: true,
                    // Names repeat in this table, so the closed field carries the
                    // email as well — otherwise you cannot tell which row is picked.
                    renderValue: (value) => {
                      if (!value) return <em>Select customer…</em>;
                      const picked = customers.find(
                        (c) => String(c.customerId) === value
                      );
                      if (!picked) return value;
                      return (
                        <Box component="span">
                          {picked.name}
                          {picked.email && (
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 1 }}
                            >
                              {picked.email}
                            </Typography>
                          )}
                        </Box>
                      );
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select customer…</em>
                </MenuItem>
                {customers.map((c) => (
                  <MenuItem key={c.customerId} value={String(c.customerId)}>
                    {/* Email and id disambiguate the several customers who
                        share a display name. */}
                    <Box>
                      <Typography variant="body2">{c.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {[c.email, c.phone, `#${c.customerId}`]
                          .filter(Boolean)
                          .join(" · ")}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              {customer && (
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    {[customer.email, customer.phone].filter(Boolean).join(" · ")}
                  </Typography>
                  {customer.address && (
                    <Typography variant="body2" color="text.secondary">
                      {customer.address}
                    </Typography>
                  )}
                </Box>
              )}
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Label>Line items</Label>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={addProduct}
                  >
                    Add product
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="inherit"
                    startIcon={<AddRoundedIcon />}
                    onClick={addAdHoc}
                  >
                    Ad-hoc
                  </Button>
                </Stack>
              </Stack>

              {items.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 4 }}
                >
                  No items yet.
                </Typography>
              )}

              <Stack spacing={2}>
                {items.map((item) => (
                  <Box
                    key={item.key}
                    sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
                  >
                    <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1.5 }}>
                      {item.adHoc ? (
                        <TextField
                          fullWidth
                          size="small"
                          label="Item name"
                          value={item.name}
                          onChange={(event) => updateItem(item.key, { name: event.target.value })}
                        />
                      ) : (
                        <TextField
                          select
                          fullWidth
                          size="small"
                          label="Product"
                          value={item.productId ?? ""}
                          onChange={(event) => pickProduct(item.key, event.target.value)}
                        >
                          <MenuItem value="">
                            <em>Select product…</em>
                          </MenuItem>
                          {products.map((product) => (
                            <MenuItem key={product.productID} value={String(product.productID)}>
                              {product.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}

                      <IconButton
                        onClick={() => removeItem(item.key)}
                        aria-label="Remove line"
                        sx={{ mt: 0.5 }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>

                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      minRows={2}
                      placeholder="Description (optional)"
                      value={item.description}
                      onChange={(event) =>
                        updateItem(item.key, { description: event.target.value })
                      }
                      sx={{ mb: 1.5 }}
                    />

                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 6, sm: 2.4 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Qty"
                          type="number"
                          value={item.quantity}
                          onChange={(event) =>
                            updateItem(item.key, { quantity: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 6, sm: 2.4 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Rate"
                          type="number"
                          value={item.rate}
                          onChange={(event) => updateItem(item.key, { rate: event.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 6, sm: 2.4 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Tax %"
                          type="number"
                          value={item.taxRate}
                          onChange={(event) =>
                            updateItem(item.key, { taxRate: event.target.value })
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 6, sm: 2.4 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Unit"
                          value={item.unit}
                          onChange={(event) => updateItem(item.key, { unit: event.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2.4 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="HSN"
                          value={item.hsnCode}
                          onChange={(event) =>
                            updateItem(item.key, { hsnCode: event.target.value })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Label>Invoice details</Label>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Invoice date"
                    value={issueDate}
                    onChange={(event) => handleIssueDateChange(event.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Due date"
                    value={dueDate ?? ""}
                    onChange={(event) => setDueDate(event.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Payment terms"
                    value={paymentTerms}
                    onChange={(event) => handleTermsChange(event.target.value)}
                  >
                    {PAYMENT_TERMS.map((term) => (
                      <MenuItem key={term.value} value={term.value}>
                        {term.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    minRows={3}
                    label="Notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </Grid>
              </Grid>
            </Card>
          </Stack>
        </Grid>

        {/* ------------------------------------------------- live preview */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box sx={{ position: { lg: "sticky" }, top: { lg: 96 } }}>
            <Label>Live preview</Label>
            <Card variant="outlined">
              <InvoiceDocument
                seller={seller}
                bank={bank}
                signatory={signatory}
                terms={terms}
                billTo={billTo}
                invoiceNumber={null}
                issueDate={issueDate}
                dueDate={dueDate}
                paymentTerms={paymentTerms}
                status="draft"
                items={totals.lines}
                subtotal={totals.subtotal}
                taxTotal={totals.taxTotal}
                total={totals.total}
                notes={notes}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
