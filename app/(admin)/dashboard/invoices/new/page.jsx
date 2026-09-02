import { client } from "@/sanity/lib/client";

import { getCustomerOptions } from "../../../_lib/invoices";
import {
  getSeller,
  getBankDetails,
  getSignatory,
  INVOICE_TERMS,
} from "../../../_lib/seller";
import CreateInvoiceForm from "./_components/CreateInvoiceForm";

export const dynamic = "force-dynamic";

// Sanity is the product catalogue; Neon holds customers. The picker needs both.
const PRODUCTS_QUERY = `*[_type == "allProducts"] | order(name asc) {
  productID,
  name,
  sellingPrice,
  company
}`;

export default async function NewInvoicePage() {
  const [customers, products] = await Promise.all([
    getCustomerOptions(),
    client.fetch(PRODUCTS_QUERY),
  ]);

  return (
    <CreateInvoiceForm
      customers={customers}
      products={products ?? []}
      seller={getSeller()}
      bank={getBankDetails()}
      signatory={getSignatory()}
      terms={INVOICE_TERMS}
    />
  );
}
