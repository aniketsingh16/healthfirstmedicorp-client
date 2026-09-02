"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { avatarColor, count, initials, moneyExact } from "../../../_lib/format";

const SEGMENTS = [
  { value: "all", label: "All" },
  { value: "prospect", label: "Prospect" },
  { value: "returning", label: "Returning" },
];

export default function CustomersView({ customers, segment, search }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchDraft, setSearchDraft] = useState(search);

  useEffect(() => setSearchDraft(search), [search]);

  const pushParams = useCallback(
    (changes) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(changes).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, value);
      });
      startTransition(() =>
        router.replace(`/dashboard/customers?${params.toString()}`, { scroll: false }),
      );
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (searchDraft === search) return undefined;
    const timer = setTimeout(() => pushParams({ search: searchDraft }), 350);
    return () => clearTimeout(timer);
  }, [searchDraft, search, pushParams]);

  return (
    <Card>
      <Tabs
        value={segment}
        onChange={(_, value) => pushParams({ segment: value })}
        sx={{ px: 3, borderBottom: "1px solid", borderColor: "divider" }}
      >
        {SEGMENTS.map((item) => (
          <Tab key={item.value} value={item.value} label={item.label} />
        ))}
      </Tabs>

      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          value={searchDraft}
          onChange={(event) => setSearchDraft(event.target.value)}
          placeholder="Search customers by name or email"
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
      </Box>

      {isPending && <LinearProgress />}

      <TableContainer>
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Orders</TableCell>
              <TableCell align="right">Spent</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} sx={{ py: 6, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    No customers match this filter.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {customers.map((customer) => (
              <TableRow key={customer.customerId} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        fontSize: 14,
                        fontWeight: 600,
                        bgcolor: avatarColor(customer.email ?? customer.name),
                      }}
                    >
                      {initials(customer.name)}
                    </Avatar>
                    <Stack sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>
                        {customer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {customer.email}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography variant="body2">{customer.location}</Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="body2">{count(customer.orderCount)}</Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="subtitle2">{moneyExact(customer.spent)}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
