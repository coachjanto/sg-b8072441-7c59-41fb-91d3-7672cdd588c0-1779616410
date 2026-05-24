---
title: Guest Mode & Invite System
status: todo
priority: medium
type: feature
tags:
  - guest-access
  - sharing
  - permissions
created_by: agent
created_at: 2026-05-24
position: 10
---
## Notes
Guest access system where admin generates shareable invite links/codes. Guests can view trip photos, itinerary, and public content, and leave comments, but cannot see expenses, sensitive documents, or private chats. No full account registration required.

## Checklist
- [ ] Create guest invite generator in admin dashboard: generate unique invite code or shareable link with expiry date selector
- [ ] Build guest registration flow: enter invite code/follow link → set display name and optional avatar → instant read-only access
- [ ] Implement permission system: guests can view (photos, public itinerary, guest-marked documents), cannot view (expenses, sensitive docs, private threads, member profiles)
- [ ] Create guest-friendly landing page: welcome message, trip overview (dates, destination, family intro), navigation to accessible sections
- [ ] Add comment system for guests: can comment on photos and public itinerary items, comments visible to all members and guests
- [ ] Build guest list in admin panel: view all active guests, see last active time, revoke access, extend invite expiry
- [ ] Create guest badge/indicator: visual badge showing guest status on comments and interactions
- [ ] Implement content visibility toggle: members can mark specific photos/posts as "Members-only" or "Public for guests"
- [ ] Add guest analytics in admin dashboard: total guests, most active guests, popular content among guests
- [ ] Create share options: members can generate quick share links for specific albums or itinerary days

## Acceptance
- Admin generates working invite links with configurable expiry
- Guests access limited content without creating full accounts
- Guests can comment on photos; members see guest badge on comments
- Permission system correctly blocks guests from expenses and sensitive data