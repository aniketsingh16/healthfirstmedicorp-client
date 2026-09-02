"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createInvoice, setInvoiceStatus } from "./invoices";

/**
 * Saves a new invoice.
 *
 * The payload is treated as untrusted: totals are recomputed server-side inside
 * createInvoice rather than taken from the form, because the browser can be
 * edited and this is a financial record.
 */
export async function saveInvoiceAction(payload) {
  const items = (payload.items ?? []).filter((item) => item.name?.trim());

  if (items.length === 0) {
    return { ok: false, error: "Add at least one line item." };
  }
  if (!payload.billTo?.name) {
    return { ok: false, error: "Select a customer." };
  }

  let created;
  try {
    created = await createInvoice({
      customerId: payload.customerId ?? null,
      billTo: payload.billTo,
      items,
      issueDate: payload.issueDate,
      dueDate: payload.dueDate || null,
      paymentTerms: payload.paymentTerms || null,
      notes: payload.notes || null,
      placeOfSupply: payload.placeOfSupply || null,
      status: "draft",
    });
  } catch (error) {
    return { ok: false, error: error.message ?? "Could not save the invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect(`/dashboard/invoices/${created.invoiceId}`);
}

export async function updateInvoiceStatusAction(invoiceId, status) {
  await setInvoiceStatus(invoiceId, status);
  revalidatePath(`/dashboard/invoices/${invoiceId}`);
  revalidatePath("/dashboard/invoices");
  return { ok: true };
}
