---
title: Expense Tracker & Financial Reports
status: todo
priority: high
type: feature
tags:
  - expenses
  - finance
  - reports
created_by: agent
created_at: 2026-05-24
position: 7
---
## Notes
Comprehensive expense tracking system where each member logs spending with receipt photos. Auto-converts JPY to IDR, categorizes expenses, generates financial reports with shared expense splitting, budget comparison, and optional per-pax invoicing. Exports as PDF.

## Checklist
- [ ] Create expense input form: category dropdown (Meals/Transport/Tickets/Souvenir/Other), amount in JPY, receipt photo upload, date picker, GPS location capture, notes field
- [ ] Implement real-time JPY→IDR conversion using live exchange rate API (fallback: manual rate set by admin)
- [ ] Build expense list view showing all logged expenses with filters (by member, category, date range)
- [ ] Create financial dashboard showing: total spent per member, breakdown by category, visual charts (pie chart categories, bar chart members)
- [ ] Implement shared expense logic: calculate equal splits, track who paid for shared items (e.g., dinner for 4), show balance owed/owed-to
- [ ] Build budget vs actual comparison view with progress bars and alerts when approaching limits
- [ ] Add "Mark as shared" toggle on expenses with member split selector (split equally, custom amounts, or percentage)
- [ ] Create PDF report generator: itemized expenses per member, category breakdown, shared expense settlement, currency conversion summary, receipt image gallery
- [ ] Implement per-pax billing report (when admin toggle enabled): individual invoices showing personal + shared split amounts
- [ ] Add export options: PDF report, CSV data, Excel spreadsheet with all transaction details

## Acceptance
- Any member can log expenses with photos and GPS
- JPY amounts auto-convert to IDR in real-time
- Financial report accurately calculates shared expenses and shows who owes whom
- PDF export includes all expense details, charts, and receipt images