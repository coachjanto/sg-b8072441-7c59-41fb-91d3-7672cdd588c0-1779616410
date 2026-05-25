-- Add password column to users table and set Super Admin password
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash text;

-- Update Janto's password (in real app this should be hashed)
UPDATE users 
SET password_hash = '1100110011'
WHERE email = 'coach.janto@gmail.com';

-- Set default passwords for other members (they can be changed by Super Admin)
UPDATE users 
SET password_hash = 'password123'
WHERE email != 'coach.janto@gmail.com';