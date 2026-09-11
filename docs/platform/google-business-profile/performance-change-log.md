---
title: "Performance API change log"
source: "https://developers.google.com/my-business/content/performance/change-log"
final_url: "https://developers.google.com/my-business/content/performance/change-log"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "50d561d528e87469ba808fdfe23bd50b90a24fd55c8f180634d49193e643ef07"
---

# Business Performance API Stay organized with collections Save and categorize content based on your preferences.

## Change log

### v1

#### API Access

The Business Performance API will need to be enabled from the
[GCP Console](https://console.developers.google.com/apis/library/businessprofileperformance.googleapis.com).
The OAuth scope remains the same.

#### Endpoint URLs

Endpoints are accessible at https://businessprofileperformance.googleapis.com/v1/ instead of https://mybusiness.googleapis.com/v4/

- `accounts.locations.reportInsights` has been replaced by `locations.fetchMultiDailyMetricsTimeSeries` that returns `DailyMetric` for specified metrics.
- Introduction of new `locations.searchkeywords.impressions.monthly.list` that returns monthly breakdown of search keywords

#### Deprecated endpoints and Objects

- Removal of batch calls for multiple listings using `locationNames` in request body
- Removal of `accounts.locations.localPosts.reportInsights` endpoint
- Removal of [Metric](/my-business/reference/rest/v4/Metric) and [MetricOption](/my-business/reference/rest/v4/MetricOption) along with aggregated and breakdown options
