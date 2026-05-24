-- Create users table with 4 specific family members
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE CHECK (name IN ('Janto', 'Yina', 'Pauline', 'Clement')),
  role text NOT NULL CHECK (role IN ('admin', 'member')),
  password_hash text NOT NULL,
  avatar_url text,
  has_completed_onboarding boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create threads table for topic-based chats
CREATE TABLE threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  created_by uuid REFERENCES users(id) ON DELETE CASCADE,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create messages table for chat
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES threads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  content text NOT NULL,
  is_ai boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create reminders table
CREATE TABLE reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  scheduled_for timestamptz NOT NULL,
  created_by uuid REFERENCES users(id) ON DELETE CASCADE,
  is_triggered boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies - all authenticated users can read everything (shared family workspace)
CREATE POLICY "users_read" ON users FOR SELECT USING (true);
CREATE POLICY "users_update_self" ON users FOR UPDATE USING (id = (SELECT id FROM users WHERE name = current_setting('app.current_user', true)));

CREATE POLICY "threads_read" ON threads FOR SELECT USING (true);
CREATE POLICY "threads_create" ON threads FOR INSERT WITH CHECK (true);
CREATE POLICY "threads_update_admin" ON threads FOR UPDATE USING ((SELECT role FROM users WHERE name = current_setting('app.current_user', true)) = 'admin');

CREATE POLICY "messages_read" ON messages FOR SELECT USING (true);
CREATE POLICY "messages_create" ON messages FOR INSERT WITH CHECK (true);

CREATE POLICY "reminders_read" ON reminders FOR SELECT USING (true);
CREATE POLICY "reminders_create_admin" ON reminders FOR INSERT WITH CHECK ((SELECT role FROM users WHERE name = current_setting('app.current_user', true)) = 'admin');

-- Insert the 4 family members (passwords will be hashed in the app, using placeholder for now)
INSERT INTO users (name, role, password_hash) VALUES
  ('Janto', 'admin', 'placeholder_hash'),
  ('Yina', 'member', 'placeholder_hash'),
  ('Pauline', 'member', 'placeholder_hash'),
  ('Clement', 'member', 'placeholder_hash');

-- Create default "Main Chat" thread
INSERT INTO threads (name, icon, is_approved) VALUES
  ('Main Chat', '💬', true);