---
created_by: softgen
---
## Vision
A mobile-first, glassmorphism travel companion app for the Djojo family's 2026 Osaka trip, evolving into a white-label SaaS platform for group travel management. Features AI consultant Claudia Yang (powered by Claude) to manage itineraries, content strategies, expenses, and document coordination in a shared family workspace with guest access capabilities.

## Design
- `--background: 225 50% 8% (Deep navy #0a0f1e)` / Light: `210 40% 98%`
- `--foreground: 224 100% 97% (Off-white #f0f4ff)` / Light: `225 50% 12%`
- `--primary: 47 78% 59% (Gold #e8c547)`
- `--secondary: 199 91% 64% (Ice blue #4fc3f7)`
- `--accent: 340 100% 71% (Sakura pink #ff6b9d)`
- `--muted: 225 30% 20% (Dark glass border/panels)` / Light: `210 30% 96%`
- **Fonts**: Noto Serif JP (Display), DM Sans (Body), JetBrains Mono (Data)
- **Style**: Glassmorphism Modern Japanese. Animated gradient mesh background. Cards use glass style (blur 20px, semi-transparent backgrounds and borders). Subtle sakura petal particles and torii gate silhouette (3% opacity). Mobile-first 9:16 adaptive layout. Light/dark theme toggle.

## Features
- **User Roles**: 4 specific accounts (Janto as Admin, Yina, Pauline, Clement)
- **AI Consultant**: Claudia Yang powered by Claude API, responds in Bahasa Indonesia, aware of all trip contexts
- **Shared Chat Threads**: Topic-based chat tabs (Itinerary, Kuliner, Konten, etc.) with Admin approval for new threads
- **Admin Dashboard**: API key management, background upload, PIN setup, member management, thread approval, budget configuration
- **Expense Tracker**: Multi-currency logging (JPY→IDR), receipt photos, GPS tracking, category breakdown, shared expense splitting
- **Financial Reports**: Per-member spending analysis, budget vs actual, optional per-pax billing, PDF/Excel export
- **Souvenir Wishlist**: Request tracking with status updates (pending/bought/delivered), price comparison, proof photos
- **Document Vault**: Centralized storage for passports, flights, bookings with PIN-protected sensitive data
- **Guest Mode**: Invite-only read-only access for extended family/friends, can view photos and comment, restricted from finances/sensitive data
- **Media Gallery**: Google Drive integration with GPS metadata for photos and documents
- **Alarms & Reminders**: In-app audio alerts and push notifications for trip milestones

**Future**: White-label SaaS platform with customizable branding, AI persona, currency settings, and billing configurations for other travel groups.

**Tech Requirements**: Supabase (auth, realtime, storage), Claude API key, Google Drive API credentials, exchange rate API for currency conversion.