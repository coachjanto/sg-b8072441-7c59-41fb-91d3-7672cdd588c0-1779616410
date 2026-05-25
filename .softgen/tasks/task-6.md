---
title: Admin Dashboard & System Configuration
status: in_progress
priority: urgent
type: feature
tags:
  - admin
  - configuration
  - super-admin
created_by: agent
created_at: 2026-05-24
position: 6
---
## Notes
Super Admin dashboard accessible only to coach.janto@gmail.com for system-wide configuration including API keys, security settings, member management, budget allocation, appearance customization, and AI knowledge base management. Separate from regular member settings.

## Checklist
- [x] Create admin page route /admin with access control (only coach.janto@gmail.com)
- [x] Update users table with email field, super_admin boolean flag, and password_hash column
- [x] Build tabbed interface with 7 sections: API Keys, Knowledge Base, Security, Budget, Members, Appearance, Notifications
- [x] AI Provider selection: choose between Claude or OpenAI with model selector
- [x] API Keys tab: input fields for Claude/OpenAI API keys (conditional based on provider) and Google Drive API credentials
- [x] Knowledge Base tab: add text prompts or upload files for Claudia Yang's AI context with custom categories
- [x] Edit and delete knowledge base entries with modal dialogs
- [x] Security tab: set 6-digit PIN for sensitive data protection (separate from login password)
- [x] Budget tab: input for total trip budget in JPY, toggle for per-pax billing mode
- [x] Members tab: display all 4 family members with email, role badges (Super Admin/Member), and status
- [x] Add member add/remove/role change functionality with modal dialogs and validation
- [x] Password management: Super Admin can set passwords for all users (Janto default: 1100110011)
- [x] Implement save functionality to localStorage with persistence across sessions
- [ ] Build thread approval queue showing pending thread requests from members
- [ ] Create thread approval action buttons (approve → creates thread, reject → sends reason message)
- [ ] Appearance tab: background image upload to Supabase Storage with live preview
- [ ] Add budget allocation per member with individual limits
- [ ] Create notification preferences panel for push notifications and reminders
- [ ] Migrate all localStorage saves to Supabase for production-ready persistence

## Acceptance
- Admin page only accessible to coach.janto@gmail.com
- AI provider can be selected between Claude or OpenAI with appropriate model options
- API keys save successfully to localStorage and persist across page reloads
- Knowledge base entries can be added (text/file), edited, and deleted
- PIN protection works for passport/booking data access
- Per-pax billing toggle affects financial report calculations
- Super Admin can set and change passwords for all users
- Settings persist and don't cause logout when saved
- Member profiles can be edited, added, and deleted through the Members tab