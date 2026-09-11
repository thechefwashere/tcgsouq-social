---
title: "Quota and compliance audits"
source: "https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits"
final_url: "https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits"
platform: "youtube"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b8c54d6d26fe215a3c5f19c549d081ae71812d77902f2640499cc3fa46ca509f"
---

# Quota and Compliance Audits Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The YouTube Data API uses a quota system to maintain service quality and prevent abuse, with a default allocation of 10,000 units per day.
- To request quota beyond the default, an audit demonstrating compliance with the YouTube API Services Terms of Service is required.
- Several forms are available for different situations, such as requesting an audit and quota extension, making a quota appeal, periodic audits, and change of control of a project.
- You can check your current quota usage on the Quotas page in the API console.
- Developers must fill out a Change of Control Form in the event of any change in control of an API project that is accessing the YouTube API services.

The YouTube Data API uses a [quota system](/youtube/v3/determine_quota_cost) to ensure that developers use the service as intended and that they don't create API clients which unfairly reduce service quality or limit access for others.

Projects that enable the YouTube Data API have a default quota allocation of 100 `search.list` calls, 100 `videos.insert` calls, and 10,000 units per day combined for all other endpoints. You can see your quota usage on [Quotas](https://console.cloud.google.com/iam-admin/quotas)  page in the Google API Console.

If you would like to request additional quota beyond the default allocation, you must first complete an audit to show that your project is in compliance with the [YouTube API Services Terms of Service](https://developers.google.com/youtube/terms/developer-policies). This gives YouTube visibility into the intended use cases of large projects and ensures that YouTube's API services are being used in a manner that is free from abuse. Visit  [this link](https://developers.google.com/youtube/terms/developer-policies-guide) for additional details on complying with YouTube's Developer Policies.

### Begin an audit

To begin an audit of your project, fill out and submit the [YouTube API Services - Audit and Quota Extension Form](https://support.google.com/youtube/contact/yt_api_form). A member of YouTube's API Services team will contact you as soon as possible.

### Request an additional quota extension

If you have completed an API Compliance Audit within the last 12 months but require an additional quota extension, fill out and submit the [Audit and Quota Extension Form](https://support.google.com/youtube/contact/yt_api_form).

### Appeal a failed audit

If you have recently failed an API Compliance Audit and would like to appeal that decision, fill out and submit the [Appeals Form](https://support.google.com/youtube/contact/yt_api_appeals).

### Periodic audit

We conduct periodic audits to ensure quality, improve our products and services, and verify your compliance with the YouTube API Services Terms of Service. If you have been contacted by us to complete your periodic audit, fill out the [Periodic Audit Form](https://support.google.com/youtube/contact/yt_api_form).

### Change of control

Developers, or any party operating an API client on a developer's behalf, who experience a change of control (for example, through a stock purchase or sale, merger or other form of corporate transaction) associated with an API project accessing YouTube's API Services must fill out and submit the [Change of Control Form](https://support.google.com/youtube/contact/yt_api_change_of_control_form).
