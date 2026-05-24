---
title: Shared Chat and Claudia Yang AI Integrations
status: todo
priority: high
type: feature
tags:
  - ai
  - chat
  - claude
---
## Notes
The core chat interface where family members interact with Claudia Yang. Claudia uses Claude API, knows the family context, trip dates (29 June – 13 July 2026), and responds in Bahasa Indonesia. Conversations are shared among all members.

## Checklist
- [ ] Build the chat interface displaying message bubbles with glass styles, user avatars, and timestamps.
- [ ] Implement micro-interactions: smooth horizontal slide animations for switching threads and slide-up fade-in for new messages.
- [ ] Create the AI backend integration to communicate with the Claude API.
- [ ] Add the system prompt context so Claudia knows the 4 users, the Osaka trip dates, and Janto's business coaching persona.
- [ ] Ensure the chat feed is shared and visible to all users (via Supabase Realtime), with Claudia addressing the current active user by name.