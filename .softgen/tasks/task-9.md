---
title: Document Vault with PIN-Protected Sensitive Data
status: todo
priority: high
type: feature
tags:
  - documents
  - security
  - sensitive-data
created_by: agent
created_at: 2026-05-24
position: 9
---
## Notes
Centralized document storage for all trip documents (flights, passports, Airbnb, insurance, tickets). Sensitive data (passport numbers, booking codes, credit card info) is PIN-protected using the admin-set security code. Quick recall format for easy access during travel.

## Checklist
- [ ] Create document categories: Flights, Passports, Accommodation, Insurance, Tickets, Visas, Transportation, Emergency Contacts
- [ ] Build document upload interface: file upload (PDF/images), category selector, document name, issue date, expiry date, notes
- [ ] Implement sensitive data field marking: checkbox to mark specific fields as "Sensitive" (requires PIN to view)
- [ ] Create PIN entry modal: appears when user tries to view sensitive data, validates against admin-set PIN, 3 attempts before lockout
- [ ] Build document detail view: display all non-sensitive info immediately, blur/mask sensitive fields until PIN verified
- [ ] Add quick recall cards: important info displayed as glass cards (flight numbers, check-in times, confirmation codes) - sensitive parts hidden by default
- [ ] Create timeline view: chronological display of documents by relevance date (upcoming flights first, expired docs at bottom)
- [ ] Implement OCR for uploaded documents: auto-extract key info (passport number, flight number, booking code) and suggest field population
- [ ] Add document sharing selector: mark specific documents as "Guest-visible" or "Members-only"
- [ ] Build emergency info page: quick access to passport numbers, insurance hotlines, embassy contacts (all PIN-protected)

## Acceptance
- Documents upload and categorize correctly
- PIN protection blocks sensitive data viewing without correct code
- Quick recall cards show upcoming flight/accommodation info with sensitive parts masked
- OCR successfully extracts key data from uploaded passport/ticket images