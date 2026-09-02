-- CUSTOMERS (already exists, refining slightly)
CREATE TABLE customers  (
  customer_id SERIAL PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  mobile TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT SUBMISSIONS (already exists, linking to users optionally)
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  query TEXT NOT NULL,
  user_email TEXT REFERENCES users(email) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,       -- human-friendly, e.g. "ORD-20260801-0001"
  user_email TEXT NOT NULL REFERENCES users(email) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, paid, shipped, delivered, cancelled, refunded
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_fee NUMERIC(10,2) DEFAULT 0,
  tax NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_status TEXT DEFAULT 'unpaid',    -- unpaid, paid, failed, refunded
  payment_id TEXT,                         -- reference to Stripe/Razorpay/etc charge id
  shipping_address JSONB,                  -- or a separate addresses table (see below)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

/* 

orders
─────────────────────────────────────
id | user_email      | total  | status
1  | a@gmail.com      | 2500   | paid

*/

-- ORDER ITEMS (line items — this is the key relational piece)
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,          -- Sanity's _id, NOT a foreign key (external system)
  product_name TEXT NOT NULL,        -- snapshot at time of purchase — Sanity data can change/be deleted later
  product_price NUMERIC(10,2) NOT NULL, -- snapshot price, not live Sanity price
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  line_total NUMERIC(10,2) NOT NULL
);

/*
order_items
──────────────────────────────────────────────────
id | order_id | product_id      | quantity | line_total
1  | 1        | sanity_shirt_1  | 2        | 1000
2  | 1        | sanity_shoes_9  | 1        | 1500
*/

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,              -- 'razorpay', 'stripe', 'paypal', etc.
  provider_payment_id TEXT NOT NULL,   -- the charge/transaction ID from that provider
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, succeeded, failed, refunded, partially_refunded
  method TEXT,                          -- 'card', 'upi', 'netbanking', 'wallet', etc.
  failure_reason TEXT,                  -- populated if status = 'failed'
  refunded_amount NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  query TEXT NOT NULL,
  user_clerk_id TEXT REFERENCES users(clerk_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- SET TIME ZONE 'Asia/Kolkata';