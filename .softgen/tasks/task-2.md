---
title: Main App Shell and Thread Navigation
status: in_progress
priority: high
type: feature
tags:
  - navigation
  - threads
  - layout
created_by: agent
created_at: 2026-05-24
position: 2
---
## Notes
Main authenticated app interface with bottom navigation (mobile) / left sidebar (tablet), thread management system with swipe navigation, and admin approval workflow for new thread requests. Integrates with admin dashboard for thread approval and member management.

## Checklist
- [x] Build the main app shell with glassmorphism bottom nav (mobile, 48px tap targets) and left sidebar (tablet unfold mode)
- [x] Create navigation items: Chat (default), Documents, Expenses, Souvenirs, Gallery, Profile/Settings
- [ ] Implement thread tab system displaying as horizontal scrollable glass tabs with topic icons
- [ ] Add swipe gesture navigation (left-right) to switch between threads smoothly with slide animation
- [ ] Build "New Thread Request" flow: member fills form (thread name, icon, description) → creates pending request → notifies Admin
- [ ] Create thread approval notification badge for Janto showing count of pending requests
- [ ] Build the Admin thread approval interface: view pending requests, approve (creates thread immediately), or reject (with optional reason message)
- [ ] Add preset thread templates: 🗺️ Itinerary & Rute, 🍜 Kuliner & Meals, 📸 Konten & Reels, 🎬 Live Coaching, 🚇 Transportasi, 💡 Spontan & Dadakan, 📄 Dokumen Trip
- [ ] Implement thread settings accessible only by Admin: rename, change icon, archive, delete
- [ ] Create user profile dropdown showing: display name, role badge (Admin/Member), theme toggle, logout button, link to admin dashboard (Admin only)

## Acceptance
- Bottom nav works on mobile, converts to sidebar on tablet
- Thread tabs display with swipe navigation and smooth animations
- New thread request flow sends notification to Admin
- Admin can approve/reject requests, approved threads appear immediately for all members