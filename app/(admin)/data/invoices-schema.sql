-- ===========================================================================
-- Invoices
--
-- Standalone documents, NOT a view over `orders`. An invoice can be raised for
-- a walk-in sale, a quote, or a B2B order that never went through checkout, so
-- `order_id` is an optional link rather than the parent.
--
-- Run this once against Neon.
-- ===========================================================================

-- --------------------------------------------------------------------------
-- Gap-free numbering.
--
-- A Postgres SEQUENCE deliberately leaks numbers on rollback — that is what
-- makes it concurrent and fast, and it is exactly wrong for invoice numbers,
-- which an auditor expects to run 1, 2, 3 with no holes. So we keep a counter
-- row per year and take a row lock while allocating.
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoice_counters (
  year        INTEGER PRIMARY KEY,
  last_number INTEGER NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION next_invoice_number(p_year INTEGER)
RETURNS TEXT AS $$
DECLARE
  v_next INTEGER;
BEGIN
  INSERT INTO invoice_counters (year, last_number)
  VALUES (p_year, 0)
  ON CONFLICT (year) DO NOTHING;

  -- UPDATE ... RETURNING takes a row lock for the duration of the transaction,
  -- so two concurrent inserts serialise here instead of colliding on a number.
  UPDATE invoice_counters
     SET last_number = last_number + 1
   WHERE year = p_year
  RETURNING last_number INTO v_next;

  RETURN 'INV-' || p_year::text || '-' || lpad(v_next::text, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------------
-- invoices
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
  invoice_id      BIGSERIAL PRIMARY KEY,
  invoice_number  TEXT NOT NULL UNIQUE,
  year            INTEGER NOT NULL,

  customer_id     BIGINT REFERENCES customers(customer_id) ON DELETE RESTRICT,
  order_id        BIGINT REFERENCES orders(order_id) ON DELETE SET NULL,

  -- Snapshots. A finalised invoice must not change because someone later
  -- edited their address or the company moved office.
  bill_to         JSONB NOT NULL,   -- { name, email, phone, address, gstin }
  seller          JSONB NOT NULL,   -- { name, address, email, phone, gstin }

  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','sent','paid','overdue','cancelled')),

  issue_date      DATE NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Kolkata')::date,
  due_date        DATE,
  payment_terms   TEXT,             -- 'Net 15', 'Due on receipt', ...

  -- Totals are stored, not derived on read: an invoice is a legal record of
  -- what was billed, and must not shift if rounding rules are ever changed.
  subtotal        NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  tax_total       NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
  total           NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  currency        TEXT NOT NULL DEFAULT 'INR',

  -- GST. Populated when the sale is B2B; harmless when NULL for B2C.
  place_of_supply TEXT,
  notes           TEXT,

  sent_at         TIMESTAMPTZ,
  paid_at         TIMESTAMPTZ,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoices_customer   ON invoices (customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status     ON invoices (status);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices (issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_order      ON invoices (order_id);

-- --------------------------------------------------------------------------
-- invoice_items
--
-- `product_id` is nullable so ad-hoc lines (delivery charge, servicing, a
-- one-off item) sit alongside catalogue lines in the same table.
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoice_items (
  invoice_item_id BIGSERIAL PRIMARY KEY,
  invoice_id      BIGINT NOT NULL REFERENCES invoices(invoice_id) ON DELETE CASCADE,
  position        INTEGER NOT NULL DEFAULT 0,   -- preserves the author's ordering

  product_id      TEXT,          -- Sanity id, NULL for ad-hoc lines
  hsn_code        TEXT,          -- shown as SKU on the document
  name            TEXT NOT NULL,
  description     TEXT,

  quantity        NUMERIC(12,3) NOT NULL CHECK (quantity > 0),
  unit            TEXT NOT NULL DEFAULT 'pcs',
  rate            NUMERIC(12,2) NOT NULL CHECK (rate >= 0),

  -- Per line, not per invoice: a single invoice can legitimately mix 5%, 12%
  -- and 18% HSN slabs, and one invoice-level rate cannot express that.
  tax_rate        NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (tax_rate >= 0),

  taxable_value   NUMERIC(12,2) NOT NULL CHECK (taxable_value >= 0), -- qty * rate
  tax_amount      NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  line_total      NUMERIC(12,2) NOT NULL CHECK (line_total >= 0),    -- incl. tax

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON invoice_items (invoice_id);

-- Reuses the trigger function already defined in DDL_NEON_DB.sql.
DROP TRIGGER IF EXISTS trg_invoices_updated_at ON invoices;
CREATE TRIGGER trg_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
