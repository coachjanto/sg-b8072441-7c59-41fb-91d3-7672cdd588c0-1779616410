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
Super Admin dashboard accessible only to coach.janto@gmail.com for system-wide configuration including API keys, security settings, member management, budget allocation, and appearance customization. Separate from regular member settings.

## Checklist
- [x] Create admin page route /admin with access control (only coach.janto@gmail.com)
- [x] Update users table with email field and super_admin boolean flag
- [x] Build tabbed interface with 6 sections: API Keys, Security, Budget, Members, Appearance, Notifications
- [x] API Keys tab: input fields for Claude API key and Google Drive API credentials with save functionality
- [x] Security tab: set 6-digit PIN for sensitive data protection (separate from login password)
- [x] Budget tab: input for total trip budget in JPY, toggle for per-pax billing mode
- [x] Members tab: display all 4 family members with email, role badges (Super Admin/Member), and status
- [x] Add member add/remove/role change functionality with modal dialogs and validation
- [ ] Implement actual save functionality to Supabase admin_settings table
- [ ] Build thread approval queue showing pending thread requests from members
- [ ] Create thread approval action buttons (approve → creates thread, reject → sends reason message)
- [ ] Appearance tab: background image upload to Supabase Storage with live preview
- [ ] Add budget allocation per member with individual limits
- [ ] Create notification preferences panel for push notifications and reminders

## Acceptance
- Admin page only accessible to coach.janto@gmail.com
- API keys save successfully and encrypt sensitive data
- PIN protection works for passport/booking data access
- Per-pax billing toggle affects financial report calculations
- Background upload works and photo displays site-wide
- PIN successfully protects passport/booking data access
- Member profiles can be edited, added, and deleted through the Members tab