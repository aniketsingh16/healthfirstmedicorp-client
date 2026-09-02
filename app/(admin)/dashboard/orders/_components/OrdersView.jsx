"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import ButtonBase from "@mui/material/ButtonBase";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import {
  ORDER_STATUSES,
  STATUS_INTENT,
  STATUS_LABEL,
  dateChip,
  moneyExact,
} from "../../../_lib/format";

function DateChip({ date }) {
  const { month, day } = dateChip(date);
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 56,
        height: 56,
        flexShrink: 0,
        borderRadius: 2,
        backgroundColor: "grey.100",
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
        {month}
      </Typography>
      <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
        {day}
      </Typography>
    </Stack>
  );
}

/**
 * The expanded panel: what was actually bought, plus how the total was reached.
 *
 * Rows come from order_items, which snapshots name and price at purchase time —
 * so this stays accurate even if the product is later renamed or removed.
 */
function OrderItemsPanel({ items, order }) {
  if (!items || items.length === 0) {
    return (
      <Box sx={{ px: 3, pb: 2.5, pl: 11 }}>
        <Typography variant="body2" color="text.secondary">
          No line items were recorded for this order.
        </Typography>
      </Box>
    );
  }

  const summary = [
    ["Subtotal", order.subtotal],
    ["Shipping", order.shippingFee],
    ["Tax", order.tax],
  ];

  return (
    <Box sx={{ px: 3, pb: 2.5, pl: 11 }}>
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Stack
            key={item.productId}
            direction="row"
            alignItems="baseline"
            spacing={2}
          >
            <Typography variant="body2" sx={{ flexGrow: 1, minWidth: 0 }}>
              {item.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
              {item.quantity} × {moneyExact(item.unitPrice)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ width: 120, textAlign: "right", whiteSpace: "nowrap" }}
            >
              {moneyExact(item.lineTotal)}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Stack spacing={0.5}>
        {summary.map(([label, value]) => (
          <Stack key={label} direction="row" justifyContent="flex-end" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ width: 120, textAlign: "right" }}
            >
              {moneyExact(value)}
            </Typography>
          </Stack>
        ))}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Typography variant="subtitle2">Total</Typography>
          <Typography variant="subtitle2" sx={{ width: 120, textAlign: "right" }}>
            {moneyExact(order.total)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function OrdersView({ orders, itemsByOrder = {}, total, counts, status, search, sort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchDraft, setSearchDraft] = useState(search);
  // Which rows are open. A Set rather than a single id so several orders can be
  // compared side by side without collapsing each other.
  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpanded = (orderId) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });

  // Keep the input in step when navigation changes the URL from elsewhere
  // (back button, a link), without fighting the user mid-keystroke.
  useEffect(() => setSearchDraft(search), [search]);

  const pushParams = useCallback(
    (changes) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(changes).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, value);
      });
      startTransition(() =>
        router.replace(`/dashboard/orders?${params.toString()}`, { scroll: false }),
      );
    },
    [router, searchParams],
  );

  // Debounce so a typed order number is one query, not one per character.
  useEffect(() => {
    if (searchDraft === search) return undefined;
    const timer = setTimeout(() => pushParams({ search: searchDraft }), 350);
    return () => clearTimeout(timer);
  }, [searchDraft, search, pushParams]);

  return (
    <Card>
      <Tabs
        value={status}
        onChange={(_, value) => pushParams({ status: value })}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ px: 3, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Tab value="all" label={`All (${total})`} />
        {ORDER_STATUSES.map((value) => (
          <Tab
            key={value}
            value={value}
            label={`${STATUS_LABEL[value]}${counts[value] ? ` (${counts[value]})` : ""}`}
          />
        ))}
      </Tabs>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ p: 3 }}
        alignItems={{ md: "center" }}
      >
        <TextField
          fullWidth
          value={searchDraft}
          onChange={(event) => setSearchDraft(event.target.value)}
          placeholder="Search by order number"
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
          label="Sort By"
          value={sort}
          onChange={(event) => pushParams({ sort: event.target.value })}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </TextField>
      </Stack>

      {isPending && <LinearProgress />}

      <Divider />

      {orders.length === 0 ? (
        <Box sx={{ p: 6, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No orders match this filter.
          </Typography>
        </Box>
      ) : (
        orders.map((order, index) => {
          const items = itemsByOrder[order.orderId] ?? [];
          const isOpen = expanded.has(order.orderId);
          const units = items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <Box key={order.orderId}>
              {index > 0 && <Divider />}
              <ButtonBase
                onClick={() => toggleExpanded(order.orderId)}
                aria-expanded={isOpen}
                aria-label={`Products in order ${order.orderNumber}`}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  display: "block",
                  transition: "background-color .15s ease",
                  "&:hover": { backgroundColor: "grey.50" },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 3, py: 2 }}>
                  <DateChip date={order.createdAt} />

                  <Stack sx={{ flexGrow: 1, minWidth: 0 }} spacing={0.25}>
                    <Typography variant="subtitle2" noWrap>
                      {order.orderNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {order.customerName} · {moneyExact(order.total)}
                    </Typography>
                    {/* The hint that makes the row worth clicking. */}
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {items.length === 0
                        ? "No items recorded"
                        : `${items.length} ${items.length === 1 ? "product" : "products"} · ${units} ${
                            units === 1 ? "unit" : "units"
                          }`}
                    </Typography>
                  </Stack>

                  <Chip
                    size="small"
                    label={STATUS_LABEL[order.status] ?? order.status}
                    color={STATUS_INTENT[order.status] ?? "default"}
                    variant="outlined"
                  />

                  <ExpandMoreRoundedIcon
                    fontSize="small"
                    sx={{
                      color: "text.secondary",
                      flexShrink: 0,
                      transition: "transform .2s ease",
                      transform: isOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                </Stack>
              </ButtonBase>

              <Collapse in={isOpen} unmountOnExit>
                <OrderItemsPanel items={items} order={order} />
              </Collapse>
            </Box>
          );
        })
      )}
    </Card>
  );
}
