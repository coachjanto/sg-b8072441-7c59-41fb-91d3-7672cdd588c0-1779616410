---
title: Souvenir Wishlist & Tracking System
status: todo
priority: medium
type: feature
tags:
  - souvenirs
  - wishlist
  - shopping
created_by: agent
created_at: 2026-05-24
position: 8
---
## Notes
Souvenir request management system where family/friends can request items. Any member can log requests, update status (pending/bought/delivered), upload proof photos, and track estimated vs actual prices.

## Checklist
- [ ] Create souvenir request form: requester name, item description, estimated price (JPY), category (snacks/cosmetics/electronics/fashion/toys/other), quantity, urgency level, notes
- [ ] Build souvenir list view with status filter tabs (All/Pending/Bought/Delivered)
- [ ] Add status update interface: mark as "Bought" with actual price and store location, mark as "Delivered" with delivery date
- [ ] Implement photo upload for: requested item reference, proof of purchase receipt, delivered item photo
- [ ] Create summary dashboard: total requests, total estimated cost vs actual spent, completion rate, items by category
- [ ] Add member assignment: assign responsibility to specific member (Janto/Yina/Pauline/Clement) for purchasing specific items
- [ ] Build notification system: alert assigned member when approaching store location (GPS-triggered), remind of pending high-priority items
- [ ] Create shopping checklist view: group items by store/area (e.g., all Don Quijote items, all airport duty-free items)
- [ ] Add price comparison notes field: track multiple store prices to find best deal
- [ ] Implement "Add to expenses" button: auto-create expense entry when marking souvenir as bought

## Acceptance
- Members can add souvenir requests with full details
- Status updates work smoothly with photo proof at each stage
- Shopping checklist groups items by location
- Bought souvenirs automatically create expense entries