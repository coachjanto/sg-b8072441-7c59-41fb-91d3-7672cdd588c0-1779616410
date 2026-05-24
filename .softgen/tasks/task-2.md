---
title: Main App Shell and Thread Navigation
status: todo
priority: high
type: feature
tags:
  - layout
  - navigation
  - threads
---
## Notes
Implements the core responsive layout. Mobile-first 9:16 ratio that adapts to a split view for tablet/foldable displays (like the Galaxy Z Fold 7). Includes horizontal swipeable thread navigation and the Admin approval flow for new threads.

## Checklist
- [ ] Build the mobile layout with a bottom navigation bar (min 48px tap targets) and a max-width of 430px when folded.
- [ ] Build the responsive unfolded view (max-width 768px) that splits into a thread list sidebar on the left and content area on the right.
- [ ] Create horizontal swipeable glass tabs for threads (e.g., 🗺️ Itinerary & Rute, 🍜 Kuliner & Meals, 📸 Konten & Reels).
- [ ] Implement the "Request New Thread" interface for standard members.
- [ ] Build the Admin (Janto) view to approve or reject new thread requests.