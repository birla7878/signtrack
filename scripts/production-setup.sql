-- Production Database Setup for SignTrack
-- Run this after deploying the main database schema

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_cards ENABLE ROW LEVEL SECURITY;

-- Create admin user function (optional)
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Add admin user IDs here
  RETURN user_id IN (
    'admin-user-id-1',
    'admin-user-id-2'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create backup function
CREATE OR REPLACE FUNCTION backup_user_data(user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'customers', (SELECT json_agg(row_to_json(c)) FROM customers c WHERE c.user_id = backup_user_data.user_id),
    'orders', (SELECT json_agg(row_to_json(o)) FROM orders o WHERE o.customer_id IN (SELECT id FROM customers WHERE user_id = backup_user_data.user_id)),
    'quotations', (SELECT json_agg(row_to_json(q)) FROM quotations q WHERE q.customer_id IN (SELECT id FROM customers WHERE user_id = backup_user_data.user_id)),
    'payments', (SELECT json_agg(row_to_json(p)) FROM payments p WHERE p.order_id IN (SELECT o.id FROM orders o JOIN customers c ON o.customer_id = c.id WHERE c.user_id = backup_user_data.user_id))
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id_status ON customers(user_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_status ON orders(customer_id, status);
CREATE INDEX IF NOT EXISTS idx_quotations_customer_status ON quotations(customer_id, status);
CREATE INDEX IF NOT EXISTS idx_payments_order_date ON payments(order_id, payment_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotations_updated_at BEFORE UPDATE ON quotations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_cards_updated_at BEFORE UPDATE ON job_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
