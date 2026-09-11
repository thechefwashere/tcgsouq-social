---
title: "Performance API reference"
source: "https://developers.google.com/my-business/reference/performance/rest"
final_url: "https://developers.google.com/my-business/reference/performance/rest"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "9dc4c0bc83f3d1d61f99ef6bbcf67ef0eae23849a0bb40d534e507cfc0dd6942"
---

# Business Profile Performance API Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The Business Profile Performance API lets merchants access performance data for their Google Business Profile.
- Use the API to retrieve daily and monthly metrics, such as search keyword impressions.
- You can access the API through Google-provided client libraries or by using the service endpoint and discovery document.
- Merchants with a quota of 0 after enabling the API need to request access to the GBP API.

The Business Profile Performance API allows merchants to fetch performance reports about their business profile on Google.  
  
Note - If you have a quota of 0 after enabling the API, please [request](https://developers.google.com/my-business/content/prereqs#request-access) for GBP API access.

- [REST Resource: v1.locations](#v1.locations)
- [REST Resource: v1.locations.searchkeywords.impressions.monthly](#v1.locations.searchkeywords.impressions.monthly)

## Service: businessprofileperformance.googleapis.com

To call this service, we recommend that you use the Google-provided [client libraries](https://cloud.google.com/apis/docs/client-libraries-explained). If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

### Discovery document

A [Discovery Document](https://developers.google.com/discovery/v1/reference/apis) is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery document:

- <https://businessprofileperformance.googleapis.com/$discovery/rest?version=v1>

### Service endpoint

A [service endpoint](https://cloud.google.com/apis/design/glossary#api_service_endpoint) is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:

- `https://businessprofileperformance.googleapis.com`

## REST Resource: [v1.locations](/my-business/reference/performance/rest/v1/locations)

| Methods | |
| --- | --- |
| `fetchMultiDailyMetricsTimeSeries` | `GET /v1/{location=locations/*}:fetchMultiDailyMetricsTimeSeries`   Returns the values for each date from a given time range and optionally the sub entity type, where applicable, that are associated with the specific daily metrics. |
| `getDailyMetricsTimeSeries` | `GET /v1/{name=locations/*}:getDailyMetricsTimeSeries`   Returns the values for each date from a given time range that are associated with the specific daily metric. |

## REST Resource: [v1.locations.searchkeywords.impressions.monthly](/my-business/reference/performance/rest/v1/locations.searchkeywords.impressions.monthly)

| Methods | |
| --- | --- |
| `list` | `GET /v1/{parent=locations/*}/searchkeywords/impressions/monthly`   Returns the search keywords used to find a business in search or maps. |
