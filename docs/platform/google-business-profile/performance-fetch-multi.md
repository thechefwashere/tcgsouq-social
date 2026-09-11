---
title: "fetchMultiDailyMetricsTimeSeries"
source: "https://developers.google.com/my-business/reference/performance/rest/v1/locations/fetchMultiDailyMetricsTimeSeries"
final_url: "https://developers.google.com/my-business/reference/performance/rest/v1/locations/fetchMultiDailyMetricsTimeSeries"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "ceefc136e0751e2994a0d10357e53223524de3f70f332729754d819cb3b66e5d"
---

# Method: locations.fetchMultiDailyMetricsTimeSeries Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Fetches daily metrics time series data for a specified location within a given date range.
- Allows retrieval of specific daily metrics, such as website clicks and call clicks.
- Returns data organized by daily metric and optionally broken down by sub-entity types.
- Requires authorization with the `https://www.googleapis.com/auth/business.manage` scope.
- Data is presented as a list of time series, each containing date-value pairs for the corresponding metric.

- [HTTP request](#body.HTTP_TEMPLATE)
- [Path parameters](#body.PATH_PARAMETERS)
- [Query parameters](#body.QUERY_PARAMETERS)
- [Request body](#body.request_body)
- [Response body](#body.response_body)
  - [JSON representation](#body.FetchMultiDailyMetricsTimeSeriesResponse.SCHEMA_REPRESENTATION)
- [Authorization scopes](#body.aspect)
- [MultiDailyMetricTimeSeries](#MultiDailyMetricTimeSeries)
  - [JSON representation](#MultiDailyMetricTimeSeries.SCHEMA_REPRESENTATION)
- [DailyMetricTimeSeries](#DailyMetricTimeSeries)
  - [JSON representation](#DailyMetricTimeSeries.SCHEMA_REPRESENTATION)

Returns the values for each date from a given time range and optionally the sub entity type, where applicable, that are associated with the specific daily metrics.

Example request: `GET
https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries?dailyMetrics=WEBSITE_CLICKS&dailyMetrics=CALL_CLICKS&dailyRange.start_date.year=2022&dailyRange.start_date.month=1&dailyRange.start_date.day=1&dailyRange.end_date.year=2022&dailyRange.end_date.month=3&dailyRange.end_date.day=31`

### HTTP request

`GET https://businessprofileperformance.googleapis.com/v1/{location=locations/*}:fetchMultiDailyMetricsTimeSeries`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters | |
| --- | --- |
| `location` | `string`  Required. The location for which the time series should be fetched. Format: locations/{locationId} where locationId is an unobfuscated listing id. |

### Query parameters

| Parameters | |
| --- | --- |
| `dailyMetrics[]` | `enum (DailyMetric)`  Required. The metrics to retrieve time series for. |
| `dailyRange` | `object (DailyRange)`  Required. The timerange for which the time series will be fetched. |

### Request body

The request body must be empty.

### Response body

Represents the response for locations.fetchMultiDailyMetricsTimeSeries.

If successful, the response body contains data with the following structure:

| JSON representation |
| --- |
| ``` {   "multiDailyMetricTimeSeries": [     {       object (MultiDailyMetricTimeSeries)     }   ] } ``` |

| Fields | |
| --- | --- |
| `multiDailyMetricTimeSeries[]` | `object (MultiDailyMetricTimeSeries)`  DailyMetrics and their corresponding time series. |

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/business.manage`

For more information, see the [OAuth 2.0 Overview](https://developers.google.com/identity/protocols/OAuth2).

## MultiDailyMetricTimeSeries

Represents a list of tuples of DailyMetric-DailySubEntityType-TimeSeries.

| JSON representation |
| --- |
| ``` {   "dailyMetricTimeSeries": [     {       object (DailyMetricTimeSeries)     }   ] } ``` |

| Fields | |
| --- | --- |
| `dailyMetricTimeSeries[]` | `object (DailyMetricTimeSeries)`  List of DailyMetric-TimeSeries pairs. |

## DailyMetricTimeSeries

Represents a single datapoint, where each datapoint is a DailyMetric-DailySubEntityType-TimeSeries tuple.

| JSON representation |
| --- |
| ``` {   "dailyMetric": enum (DailyMetric),   "dailySubEntityType": {     object (DailySubEntityType)   },   "timeSeries": {     object (TimeSeries)   } } ``` |

| Fields | |
| --- | --- |
| `dailyMetric` | `enum (DailyMetric)`  The DailyMetric that the TimeSeries represents. |
| `dailySubEntityType` | `object (DailySubEntityType)`  The DailySubEntityType that the TimeSeries represents. Will not be present when breakdown does not exist. |
| `timeSeries` | `object (TimeSeries)`  List of datapoints where each datapoint is a date-value pair. |
