"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

import { money, moneyExact, dateLong, count } from "../../../_lib/format";
import {
  INVOICE_STATUSES,
  INVOICE_STATUS_LABEL,
  INVOICE_STATUS_INTENT,
} from "../../../_lib/seller";

function KpiTile({ icon: Icon, tone, label, value, sub }) {
  return (
    <Card sx={{ height: "100%" }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            backgroundColor: `${tone}.main`,
            opacity: 0.12,
            position: "relative",
          }}
        />
        <Box sx={{ ml: "-56px !important", width: 48, display: "grid", placeItems: "center" }}>
          <Icon sx={{ color: `${tone}.main` }} />
        </Box>
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5">{value}</Typography>
          <Typography variant="caption" color="text.secondary">
            {sub}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default function InvoicesView({ invoices, kpis, customers, filters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchDraft, setSearchDraft] = useState(filters.search);

  useEffect(() => setSearchDraft(filters.search), [filters.search]);

  const pushParams = useCallback(
    (changes) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(changes).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, value);
      });
      startTransition(() =>
        router.replace(`/dashboard/invoices?${params.toString()}`, { scroll: false }),
      );
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (searchDraft === filters.search) return undefined;
    const timer = setTimeout(() => pushParams({ search: searchDraft }), 350);
    return () => clearTimeout(timer);
  }, [searchDraft, filters.search, pushParams]);

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <KpiTile
            icon={ReceiptLongRoundedIcon}
            tone="primary"
            label="Total"
            value={money(kpis.totalValue)}
            sub={`from ${count(kpis.totalCount)} invoices`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <KpiTile
            icon={TaskAltRoundedIcon}
            tone="success"
            label="Paid"
            value={money(kpis.paidValue)}
            sub={`from ${count(kpis.paidCount)} invoices`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <KpiTile
            icon={ScheduleRoundedIcon}
            tone="warning"
            label="Pending"
            value={money(kpis.pendingValue)}
            sub={`from ${count(kpis.pendingCount)} invoices`}
          />
        </Grid>
      </Grid>

      <Card>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2}
          sx={{ p: 3 }}
          alignItems={{ lg: "center" }}
        >
          <TextField
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            placeholder="Invoice number"
            sx={{ flexGrow: 1 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            value={filters.status}
            onChange={(event) => pushParams({ status: event.target.value })}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="all">All statuses</MenuItem>
            {INVOICE_STATUSES.map((value) => (
              <MenuItem key={value} value={value}>
                {INVOICE_STATUS_LABEL[value]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            value={filters.customerId}
            onChange={(event) => pushParams({ customerId: event.target.value })}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All customers</MenuItem>
            {customers.map((customer) => (
              <MenuItem key={customer.customerId} value={String(customer.customerId)}>
                {customer.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="From"
            value={filters.from}
            onChange={(event) => pushParams({ from: event.target.value })}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ minWidth: 150 }}
          />
          <TextField
            type="date"
            label="To"
            value={filters.to}
            onChange={(event) => pushParams({ to: event.target.value })}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ minWidth: 150 }}
          />
        </Stack>

        {isPending && <LinearProgress />}

        <TableContainer>
          <Table sx={{ minWidth: 860 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Issued</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 6, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      No invoices match these filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {invoices.map((invoice) => (
                <TableRow key={invoice.invoiceId} hover>
                  <TableCell>
                    <Box
                      component={Link}
                      href={`/dashboard/invoices/${invoice.invoiceId}`}
                      sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {invoice.invoiceNumber}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{invoice.billTo?.name ?? "—"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {dateLong(invoice.issueDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {invoice.dueDate ? dateLong(invoice.dueDate) : "—"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={INVOICE_STATUS_LABEL[invoice.status] ?? invoice.status}
                      color={INVOICE_STATUS_INTENT[invoice.status] ?? "default"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">{moneyExact(invoice.total)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
}
