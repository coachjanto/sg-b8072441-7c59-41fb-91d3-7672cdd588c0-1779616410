---
title: Google Drive and Media Upload System
status: todo
priority: medium
type: feature
tags:
  - uploads
  - google-drive
  - gps
---
## Notes
Allows users to upload documents, photos, and videos directly to a connected Google Drive account in structured folders (/OsakaTrip2026/Dokumen/, etc.). Captures GPS metadata during media uploads.

## Checklist
- [ ] Build an upload button and modal accessible from any active thread.
- [ ] Integrate the browser Geolocation API to optionally capture GPS coordinates when a photo or video is selected.
- [ ] Build the form for users to select a destination folder and add an optional caption or note before uploading.
- [ ] Integrate with Google Drive API to route files to their respective `/OsakaTrip2026/[FolderName]/` directories.
- [ ] Display recently uploaded files within the chat as glass cards showing metadata (uploader, time, location, caption).