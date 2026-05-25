-- Update admin_settings table to include AI provider selection
ALTER TABLE admin_settings 
ADD COLUMN IF NOT EXISTS ai_provider varchar(20) DEFAULT 'claude',
ADD COLUMN IF NOT EXISTS openai_api_key text,
ADD COLUMN IF NOT EXISTS ai_model varchar(50);

-- Update comment
COMMENT ON COLUMN admin_settings.ai_provider IS 'AI provider choice: claude or openai';
COMMENT ON COLUMN admin_settings.openai_api_key IS 'OpenAI API key (encrypted)';
COMMENT ON COLUMN admin_settings.ai_model IS 'Selected AI model (e.g., claude-3-5-sonnet-20241022 or gpt-4o)';