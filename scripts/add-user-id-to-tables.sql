-- Add user_id column to customers table to link customers to specific users
ALTER TABLE customers 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);

-- Update existing customers to have a user_id (you'll need to set this manually for existing data)
-- UPDATE customers SET user_id = 'your-admin-user-id' WHERE user_id IS NULL;

-- Add RLS (Row Level Security) policies to ensure users can only see their own data
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own customers" ON customers
  FOR ALL USING (auth.uid() = user_id);

-- Apply similar policies to other tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own orders" ON orders
  FOR ALL USING (
    customer_id IN (
      SELECT id FROM customers WHERE user_id = auth.uid()
    )
  );

ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own quotations" ON quotations
  FOR ALL USING (
    customer_id IN (
      SELECT id FROM customers WHERE user_id = auth.uid()
    )
  );

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own payments" ON payments
  FOR ALL USING (
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.user_id = auth.uid()
    )
  );

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own leads" ON leads
  FOR ALL USING (
    customer_id IN (
      SELECT id FROM customers WHERE user_id = auth.uid()
    )
  );

ALTER TABLE job_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own job cards" ON job_cards
  FOR ALL USING (
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.user_id = auth.uid()
    )
  );
