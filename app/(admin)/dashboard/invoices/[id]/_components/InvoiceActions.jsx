"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

import { INVOICE_STATUSES, INVOICE_STATUS_LABEL } from "../../../../_lib/seller";
import { updateInvoiceStatusAction } from "../../../../_lib/actions";

export default function InvoiceActions({ invoiceId, status }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(status);

  function changeStatus(next) {
    setValue(next);
    startTransition(async () => {
      await updateInvoiceStatusAction(invoiceId, next);
      router.refresh();
    });
  }

  return (
    // `no-print` is stripped from the printed page by the print stylesheet.
    <Stack direction="row" spacing={1.5} className="no-print" alignItems="center">
      <TextField
        select
        size="small"
        label="Status"
        value={value}
        disabled={isPending}
        onChange={(event) => changeStatus(event.target.value)}
        sx={{ minWidth: 150 }}
      >
        {INVOICE_STATUSES.map((option) => (
          <MenuItem key={option} value={option}>
            {INVOICE_STATUS_LABEL[option]}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        startIcon={<PrintRoundedIcon />}
        onClick={() => window.print()}
      >
        Print
      </Button>
    </Stack>
  );
}
