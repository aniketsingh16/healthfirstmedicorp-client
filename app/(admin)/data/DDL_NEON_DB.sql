-- delete from contact_submissions where 1=1;
-- select * from contact_submissions order by id desc;

-- select * from users;
-- DROP TABLE IF EXISTS customers;
-- -- SET TIME ZONE 'Asia/Kolkata';
-- CREATE TABLE customers  (
--   customer_id BIGSERIAL PRIMARY KEY,
--   clerk_id TEXT UNIQUE NOT NULL,
--   first_name TEXT,
--   last_name TEXT,
--   mobile TEXT,
--   email TEXT,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

select * from customers;


-- CREATE TABLE addresses (
--     address_id       BIGSERIAL PRIMARY KEY,
--     customer_id      BIGINT NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
--     first_name TEXT NOT NULL,
--     last_name  TEXT NOT NULL,
--     company_name     TEXT,
--     address_line1    TEXT NOT NULL,
--     address_line2    TEXT,
--     pincode          TEXT NOT NULL,
--     contact_number   TEXT NOT NULL,
--     city             TEXT NOT NULL,
--     state            TEXT NOT NULL,
--     is_default       BOOLEAN NOT NULL DEFAULT false,
--     created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

select * from addresses;
-- select * from customers;
-- CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

CREATE TABLE IF NOT EXISTS orders (
  order_id          BIGSERIAL PRIMARY KEY,

  order_number      TEXT NOT NULL UNIQUE
                    DEFAULT (
                      'HFMC-'
                      || to_char(now() AT TIME ZONE 'Asia/Kolkata', 'YYYYMMDD')
                      || '-'
                      || lpad(nextval('order_number_seq')::text, 5, '0')
                    ),

  customer_id       BIGINT NOT NULL
                    REFERENCES customers(customer_id) ON DELETE RESTRICT,

  address_id        BIGINT
                    REFERENCES addresses(address_id) ON DELETE SET NULL,

  shipping_address  JSONB NOT NULL,

  delivery_method   TEXT NOT NULL
                    CHECK (delivery_method IN ('standard', 'express', 'sameday')),
  payment_method    TEXT NOT NULL
                    CHECK (payment_method IN ('card', 'upi', 'cod')),

  subtotal          NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  shipping_fee      NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
  tax               NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
  total             NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  currency          TEXT NOT NULL DEFAULT 'INR',

  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','packed','shipped',
                                      'delivered','cancelled','refunded')),
  payment_status    TEXT NOT NULL DEFAULT 'unpaid'
                    CHECK (payment_status IN ('unpaid','paid','failed','refunded')),

  invoice_sent_at   TIMESTAMPTZ,
  notes             TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_customer     ON orders (customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at   ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_stat ON orders (payment_status);

CREATE TABLE IF NOT EXISTS order_items (
  order_item_id   BIGSERIAL PRIMARY KEY,
  order_id        BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,

  -- Sanity's string `id` field, deliberately NOT a foreign key:
  -- Sanity is a separate system and products can be deleted there.
  product_id      TEXT NOT NULL,

  -- Snapshots taken at purchase time, so raising a price tomorrow
  -- doesn't silently rewrite yesterday's invoice.
  product_name    TEXT NOT NULL,
  unit_price      NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  quantity        INTEGER       NOT NULL CHECK (quantity > 0),
  line_total      NUMERIC(12,2) NOT NULL CHECK (line_total >= 0),

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- One line per product per order; quantity carries the count.
  UNIQUE (order_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order   ON order_items (order_id);
-- Drives the "units sold per product" KPI on the dashboard.
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items (product_id);




CREATE TABLE IF NOT EXISTS payments (
  payment_id           BIGSERIAL PRIMARY KEY,
  order_id             BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,

  provider             TEXT NOT NULL DEFAULT 'manual',  -- 'razorpay' | 'stripe' | 'cod' | 'manual'
  provider_payment_id  TEXT,                            -- NULL until a gateway responds
  method               TEXT,                            -- 'card' | 'upi' | 'cod'

  amount               NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  currency             TEXT NOT NULL DEFAULT 'INR',
  status               TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','succeeded','failed',
                                         'refunded','partially_refunded')),
  failure_reason       TEXT,
  refunded_amount      NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (refunded_amount >= 0),

  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_order ON payments (order_id);

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


SELECT table_name, count(*) AS columns
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('orders','order_items','payments')
GROUP BY table_name
ORDER BY table_name;

