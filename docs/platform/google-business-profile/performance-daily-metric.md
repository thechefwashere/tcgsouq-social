---
title: "DailyMetric enum"
source: "https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric"
final_url: "https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b900baf9e233d955f5b8d1a3d6621c936c1103b2d1ea2c2ae766dc4e7365cbf2"
---

# DailyMetric Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Enums represent various daily performance metrics for a business, including impressions, conversations, direction requests, and website/call clicks.
- Metrics cover interactions across Google Search and Maps, on both desktop and mobile devices.
- Impressions are counted uniquely per user per day, regardless of the number of times the business is displayed.
- The data includes business-specific actions like bookings, food orders, and menu interactions.
- `DAILY_METRIC_UNKNOWN` serves as a default value for uncategorized or undefined metrics.

Represents all available daily metrics for a business.

| Enums | |
| --- | --- |
| `DAILY_METRIC_UNKNOWN` | Represents the default unknown value. |
| `BUSINESS_IMPRESSIONS_DESKTOP_MAPS` | Business impressions on Google Maps on Desktop devices. Multiple impressions by a unique user within a single day are counted as a single impression. |
| `BUSINESS_IMPRESSIONS_DESKTOP_SEARCH` | Business impressions on Google Search on Desktop devices. Multiple impressions by a unique user within a single day are counted as a single impression. |
| `BUSINESS_IMPRESSIONS_MOBILE_MAPS` | Business impressions on Google Maps on Mobile devices. Multiple impressions by a unique user within a single day are counted as a single impression. |
| `BUSINESS_IMPRESSIONS_MOBILE_SEARCH` | Business impressions on Google Search on Mobile devices. Multiple impressions by a unique user within a single day are counted as a single impression. |
| `BUSINESS_CONVERSATIONS` | The number of message conversations received on the business profile. |
| `BUSINESS_DIRECTION_REQUESTS` | The number of times a direction request was requested to the business location. |
| `CALL_CLICKS` | The number of times the business profile call button was clicked. |
| `WEBSITE_CLICKS` | The number of times the business profile website was clicked. |
| `BUSINESS_BOOKINGS` | The number of bookings made from the business profile via Reserve with Google. |
| `BUSINESS_FOOD_ORDERS` | The number of food orders received from the business profile. |
| `BUSINESS_FOOD_MENU_CLICKS` | The number of clicks to view or interact with the menu content on the business profile. Multiple clicks by a unique user within a single day are counted as 1. |
