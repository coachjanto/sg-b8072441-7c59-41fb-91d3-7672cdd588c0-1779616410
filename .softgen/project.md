---
created_by: softgen
---
## Vision
A mobile-first, glassmorphism travel companion app for the Djojo family's 2026 Osaka trip. It features an AI consultant, Claudia Yang, powered by Claude, to manage itineraries, content strategies, uploads, and reminders in a shared family workspace.

## Design
- `--background: 225 50% 8% (Deep navy #0a0f1e)`
- `--foreground: 224 100% 97% (Off-white #f0f4ff)`
- `--primary: 47 77% 59% (Gold #e8c547)`
- `--secondary: 199 90% 64% (Ice blue #4fc3f7)`
- `--accent: 340 100% 71% (Sakura pink #ff6b9d)`
- `--muted: 225 30% 20% (Dark glass border/panels)`
- **Fonts**: Noto Serif JP (Display), DM Sans (Body), JetBrains Mono (Data)
- **Style**: Glassmorphism Modern Japanese. Dark base with subtle animated gradient mesh. Cards use glass style (blur 20px, semi-transparent backgrounds and borders). Subtle sakura petal particles and torii gate silhouette (3% opacity) in the background. Mobile-first 9:16 adaptive layout.

## Features
- **User Roles**: 4 specific user accounts (Janto as Admin, Yina, Pauline, Clement).
- **AI Consultant**: Claudia Yang powered by Claude API, aware of all trip contexts and responding in Bahasa Indonesia.
- **Shared Threads**: Topic-based chat tabs (Itinerary, Kuliner, Konten, dll.) with Admin approval for new threads.
- **Media Uploads**: Google Drive integration with GPS metadata for photos and documents.
- **Alarms**: In-app audio alerts and push notifications for reminders.

**Note**: Supabase must be connected to enable real-time shared threads and authentication. Claude API and Google Drive API keys will be required in environment variables.