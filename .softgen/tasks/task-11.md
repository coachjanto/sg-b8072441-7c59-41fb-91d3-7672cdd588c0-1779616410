---
title: Smart Itinerary Flex with Route Optimization
status: todo
priority: high
type: feature
tags:
  - itinerary
  - ai-optimization
  - transport
  - route-planning
created_by: agent
created_at: 2026-05-24
position: 11
---
## Notes
Separate itinerary planning page with smart AI-powered suggestions for activities, nearby attractions, transport calculations (train/taxi/walking), and meal recommendations. System automatically optimizes routes and suggests changes with admin approval workflow. Premium glassmorphism table UI showing multiple locations per day with date/day columns.

## Checklist
- [ ] Create dedicated Itinerary page accessible from bottom nav with map icon 🗺️
- [ ] Design premium glassmorphism table layout: columns for Time, Location, Activities, Transport, Meals, Budget, Date/Day (rightmost)
- [ ] Build location input system: user types destination → Google Places autocomplete → adds to itinerary
- [ ] Integrate Claude API for smart location analysis: when user adds location, AI returns:
  * Top 3-5 activities available at that location
  * Operating hours, ticket prices
  * Estimated time needed (2-3 hours, half day, full day)
  * Best time to visit (morning/afternoon/evening)
- [ ] Implement smart nearby suggestions: For each location added, AI suggests 2-3 nearby attractions within walking/short transit distance
- [ ] Build transport calculator that shows for each route segment:
  * Walking option (if <1km): distance, estimated time, calories
  * Train option: line name, fare per person, total for group, travel time, closest stations
  * Taxi option: estimated fare, time, economical for X+ people threshold
  * Recommendation badge: "🚶 Recommended: Walking (500m, 7 min)" or "🚇 Best: Keihan Line (¥230/person, 12 min)"
- [ ] Create meals recommendation engine: based on location + time + budget category (asal kenyang/kuliner trial/fancy), suggest 2-3 nearby restaurants with:
  * Cuisine type, average price per person
  * Distance from current location
  * Rating and popular dishes
  * Budget category badge
- [ ] Implement route optimization algorithm: when user adds/removes/reorders locations, system calculates:
  * Current route: total distance, time, cost
  * Optimized route: reordered sequence with savings
  * Visual comparison: "💡 Rute ini bisa dioptimasi: hemat ¥1,200 & 45 menit"
- [ ] Build route change proposal UI: shows side-by-side comparison (current vs optimized) with:
  * Map visualization of both routes
  * Detailed breakdown of changes
  * Total savings (time, money, distance)
  * "Request Change" button for members
- [ ] Create admin approval workflow for route changes:
  * Member submits optimization → notification to Admin
  * Admin views proposal with full details
  * Admin can approve (updates itinerary immediately) or reject (with reason)
  * All members notified of approved changes
- [ ] Add multi-location per day support: table allows multiple rows with same date, auto-groups visually
- [ ] Implement drag-and-drop reordering within same day and across days
- [ ] Add export options: PDF itinerary, Google Calendar events, share link
- [ ] Create timeline view toggle: switch between table view and visual timeline/gantt chart
- [ ] Add weather forecast integration: show predicted weather for each day with clothing recommendations

## Acceptance
- Itinerary table displays beautifully with glassmorphism styling
- Adding location triggers AI analysis with activities, nearby suggestions, and transport options
- Transport calculator correctly shows walking/train/taxi with accurate costs for group size
- Meal recommendations appear based on location, time, and budget category
- Route optimization suggests improvements with clear savings visualization
- Admin approval flow works smoothly for route changes
- Drag-and-drop reordering updates transport calculations in real-time