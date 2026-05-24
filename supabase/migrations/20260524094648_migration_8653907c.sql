-- Add email and super_admin columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email text UNIQUE,
ADD COLUMN IF NOT EXISTS super_admin boolean DEFAULT false;

-- Update Janto's email and set as super admin
UPDATE users 
SET email = 'coach.janto@gmail.com', super_admin = true 
WHERE name = 'Janto';

-- Add emails for other members
UPDATE users SET email = 'yina.djojo@gmail.com' WHERE name = 'Yina';
UPDATE users SET email = 'pauline.djojo@gmail.com' WHERE name = 'Pauline';
UPDATE users SET email = 'clement.djojo@gmail.com' WHERE name = 'Clement';

-- Create admin_settings table for storing system configuration
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text,
  updated_by uuid REFERENCES users(id),
  updated_at timestamptz DEFAULT now()
);

-- Insert default admin settings
INSERT INTO admin_settings (setting_key, setting_value) VALUES
  ('claude_api_key', null),
  ('google_drive_api_key', null),
  ('sensitive_data_pin', null),
  ('per_pax_billing_enabled', 'false'),
  ('total_budget_jpy', '0'),
  ('background_image_url', null)
ON CONFLICT (setting_key) DO NOTHING;

-- Create budget_allocation table
CREATE TABLE IF NOT EXISTS budget_allocation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  allocated_amount_jpy decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);