---
title: Alarm and Reminder System
status: todo
priority: medium
type: feature
tags:
  - notifications
  - alarms
---
## Notes
Allows Claudia Yang or Janto to set time-based reminders that trigger audio alarms and in-app alerts (e.g., flight boarding, hotel checkout, daily briefings).

## Checklist
- [ ] Build a UI for the Admin (Janto) to schedule specific date/time reminders for the group.
- [ ] Implement an in-app alert dialog that appears immediately when a reminder triggers.
- [ ] Add an audible alarm sound (HTML5 Audio) that loops or plays when the reminder alert is active.
- [ ] Integrate standard browser Push Notifications for reminders that trigger while the app is backgrounded (requires user permission).
- [ ] Show a chronological list of upcoming active reminders in a dedicated glass card section.