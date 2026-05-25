-- Create knowledge_base table for storing Super Admin's context data
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  entry_type text NOT NULL CHECK (entry_type IN ('text', 'file')),
  file_name text,
  file_url text,
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Super admin can do everything
CREATE POLICY "knowledge_admin_all" ON knowledge_base
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = uploaded_by 
      AND users.super_admin = true
    )
  );

-- All authenticated users can read
CREATE POLICY "knowledge_read_all" ON knowledge_base
  FOR SELECT
  USING (true);