---
title: "Deprecation schedule"
source: "https://developers.google.com/my-business/content/sunset-dates"
final_url: "https://developers.google.com/my-business/content/sunset-dates"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b66b19f217fc6cb5f7959afb0b05ff5decff918988182f2dfbf248b14cf5e376"
---

# Deprecation schedule Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Google launched new Business Profile APIs in 2021 for enhanced management and faster updates.
- Developers must migrate from the deprecated Business Profile Performance API to the new `locations.fetchMultiDailyMetricsTimeSeries` method.
- The My Business Business Calls API and certain Business Information API methods have been deprecated and require action to avoid disruptions.
- `accounts.locations.InsuranceNetworks` and `accounts.locations.HealthProviderAttributes` methods will be deprecated on June 17, 2024.
- Refer to the deprecation schedule for details on specific API resources, their replacements, and support timelines.

## What do I need to know?

Over the course of **2021**, we launched a new set of APIs to help you manage your **Business Profile**. Our new set of APIs provide you greater API consumption flexibility, and help us to release new product updates faster.
Check the following sections for the current list and past list of deprecated resources and their replacements if applicable.

## What do I need to do?

 **Business Profile Performance API**

Update to the new [Business Profile Performance API](https://developers.google.com/my-business/reference/performance/rest) to continue getting insights on your business profile.
Explore the new `locations.fetchMultiDailyMetricsTimeSeries` API method that allows fetching of multiple `DailyMetrics`
objects with a single API request.

 **My Business Business Calls API**

In addition, the [My Business Business Calls API](https://developers.google.com/my-business/reference/businesscalls/rest)
was deprecated on **May 30, 2023**. If you are using the My Business Business Calls API, follow these steps:

1. Disable call history using the Google Business Profile UI in Google Maps or Google Search.
2. Discontinue using the My Business Business calls API method to avoid disruption.

 **My Business Business Information API** 

We have deprecated `locations.associate` and `locations.clearLocationAssociation` API methods which are part of the
[My Business Business Information API](https://developers.google.com/my-business/reference/businessinformation/rest) on **May 30, 2023**.

 **InsuranceNetworks and HealthProviderAttributes**

We have deprecated `accounts.locations.InsuranceNetworks` and `accounts.locations.HealthProviderAttributes` API methods which are part of the
[Google My Business v4.9 API](https://developers.google.com/my-business/reference/rest) on **June 17, 2024**.

 **My Business Q&A API**

The [My Business Q&A API](https://developers.google.com/my-business/content/qanda/change-log)
was discontinued on **November 3, 2025**. Discontinue using the My Business Q&A API methods and Q&A notification types (`NEW_QUESTION`, `NEW_ANSWER`, `UPDATED_QUESTION`, `UPDATED_ANSWER`).

## API versions

- **Support Ended** indicates that the version of the API will continue to function as expected, but may not be updated with new features or bug fixes. Support will be limited.
- **Discontinuation** indicates that the version of the API will always return errors and will soon be shut down.

## Past Deprecation Schedule

| Deprecated Resource | Type | Replacement Resource | Support Ended | Discontinuation Date |
| --- | --- | --- | --- | --- |
| *My Business Q&A API deprecation* | | | | |
| [My Business Q&A API](https://developers.google.com/my-business/content/qanda/change-log) | API | None | 2025-09-15 | 2025-11-03 |
| *getHealthProviderAttributes* | | | | |
| [accounts.locations.getHealthProviderAttributes](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/getHealthProviderAttributes) | Method | None | 2024-06-17 | 2024-07-01 |
| *updateHealthProviderAttributes* | | | | |
| [accounts.locations.updateHealthProviderAttributes](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/updateHealthProviderAttributes) | Method | None | 2024-06-17 | 2024-07-01 |
| *InsuranceNetworks* | | | | |
| [accounts.locations.insuranceNetworks](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.insuranceNetworks) | API | None | 2024-06-17 | 2024-07-01 |
| *My Business Calls API deprecation* | | | | |
| [My Business Business Calls API](https://developers.google.com/my-business/reference/businesscalls/rest) | API | None | 2023-02-21 | 2023-05-30 |
| *locations.associate and locations.clearLocationAssociation deprecation* | | | | |
| [locations.associate](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations/associate) (My Business Business Information API v1) | Method | None | 2023-02-21 | 2023-05-30 |
| [locations.clearLocationAssociation](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations/clearLocationAssociation) (My Business Business Information API v1) | Method | None | 2023-02-21 | 2023-05-30 |
| *Business Profile Performance API Migration* | | | | |
| [accounts.locations.reportInsights](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/reportInsights) (Google My Business v4.9) | Method | [locations.fetchMultiDailyMetricsTimeSeries](https://developers.google.com/my-business/reference/performance/rest/v1/locations/fetchMultiDailyMetricsTimeSeries) (Google Business Profile Performance API v1) | 2022-11-21 | 2023-03-30 |
| [accounts.locations.localPosts.reportInsights](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts/reportInsights) (Google My Business v4.9) | Method | None | 2022-11-21 | 2023-02-20 |
| [DrivingDirectionMetricsRequest](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/reportInsights#drivingdirectionmetricsrequest) and [LocationDrivingDirectionMetrics](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/reportInsights#locationdrivingdirectionmetrics) (accounts.locations.reportInsights v4.9 Object) | Object | None | 2022-11-21 | 2023-03-30 |
| [ALL](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-03-30 |
| [QUERIES\_DIRECT](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-03-30 |
| [QUERIES\_INDIRECT](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-03-30 |
| [QUERIES\_CHAIN](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-03-30 |
| [VIEWS\_MAPS](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | BUSINESS\_IMPRESSIONS\_DESKTOP\_MAPS and   BUSINESS\_IMPRESSIONS\_MOBILE\_MAPS  (Google Business Profile Performance API v1) | 2022-11-21 | 2023-03-30 |
| [VIEWS\_SEARCH](https://developers.google.com/my-business/reference/rest/v4/Metric)  (accounts.locations.reportInsights v4.9 Metric) | Metric | BUSINESS\_IMPRESSIONS\_DESKTOP\_SEARCH and  BUSINESS\_IMPRESSIONS\_MOBILE\_SEARCH  (Google Business Profile Performance API v1) | 2022-11-21 | 2023-03-30 |
| [ACTIONS\_WEBSITE](https://developers.google.com/my-business/reference/rest/v4/Metric)  (accounts.locations.reportInsights v4.9 Metric) | Metric | WEBSITE\_CLICKS  (Google Business Profile Performance API v1) | 2022-11-21 | 2023-03-30 |
| [ACTIONS\_PHONE](https://developers.google.com/my-business/reference/rest/v4/Metric)  (accounts.locations.reportInsights v4.9 Metric) | Metric | CALL\_CLICKS  (Google Business Profile Performance API v1) | 2022-11-21 | 2023-03-30 |
| [ACTIONS\_DRIVING\_DIRECTIONS](https://developers.google.com/my-business/reference/rest/v4/Metric)  (accounts.locations.reportInsights v4.9 Metric) | Metric | BUSINESS\_DIRECTION\_REQUESTS  (Google Business Profile Performance API v1) | 2022-11-21 | 2023-03-30 |
| [PHOTOS\_VIEWS\_MERCHANT](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-02-20 |
| [PHOTOS\_VIEWS\_CUSTOMERS](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-02-20 |
| [PHOTOS\_COUNT\_MERCHANT](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-02-20 |
| [PHOTOS\_COUNT\_CUSTOMERS](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-02-20 |
| [LOCAL\_POST\_VIEWS\_SEARCH](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-02-20 |
| [LOCAL\_POST\_ACTIONS\_CALL\_TO\_ACTION](https://developers.google.com/my-business/reference/rest/v4/Metric) (accounts.locations.reportInsights v4.9 Metric) | Metric | None | 2022-11-21 | 2023-02-20 |
| [MediaInsights](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media#MediaItem.MediaInsights) (accounts.locations.media v4.9 Object) | Object | None | 2022-11-21 | 2023-02-20 |
