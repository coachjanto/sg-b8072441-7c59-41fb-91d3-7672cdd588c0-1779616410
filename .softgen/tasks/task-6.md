---
title: Admin Dashboard & System Configuration
status: todo
priority: urgent
type: feature
tags:
  - admin
  - config
  - api-keys
created_by: agent
created_at: 2026-05-24
position: 6
---
## Notes
Admin-only dashboard for Janto to configure Claude API keys, upload custom background photos, set PIN for sensitive data access, toggle per-pax billing, manage member accounts, approve thread requests, and configure trip budget allocation.

## Checklist
- [ ] Create admin dashboard page (`/admin`) accessible only to Janto's account
- [ ] Add Claude API key input field with model selector (Claude 3.5 Sonnet, Claude 3 Opus, etc.) and test connection button
- [ ] Build background photo upload interface with preview (saves to Google Drive, displays across all pages)
- [ ] Create PIN setup for sensitive data (4-6 digit, separate from login password, stored securely in Supabase)
- [ ] Add toggle for "Enable per-pax billing" feature (affects expense report calculations)
- [ ] Build member management panel: view all 4 members, change roles (Admin/Member), reset passwords
- [ ] Create thread approval queue showing pending thread requests with approve/reject buttons
- [ ] Add budget configuration interface: set total trip budget in JPY, allocate per member, set category limits (Meals/Transport/Tickets/Souvenir)
- [ ] Display current API usage stats (Claude API calls, storage used, active threads)
- [ ] Add "Export all data" button (downloads complete trip data as JSON backup)

## Acceptance
- Janto can access `/admin` after login; other members see 403 Forbidden
- Claude API key saved and working (validated via test call)
- Custom background photo uploads and displays site-wide
- PIN successfully protects passport/booking data access