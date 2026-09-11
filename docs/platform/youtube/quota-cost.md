---
title: "Quota costs"
source: "https://developers.google.com/youtube/v3/determine_quota_cost"
final_url: "https://developers.google.com/youtube/v3/determine_quota_cost"
platform: "youtube"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b0c8b6ab09806cb9d88c69a5fdb8f82b918f6e754342a7eed454afbe68e142c2"
---

# Quota Calculator Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Every API request, even if invalid, will cost at least one quota point.
- Retrieving multiple pages of results from a single method call, like `search.list`, incurs the quota cost for each additional page request.
- Methods from the YouTube Live Streaming API, being part of the YouTube Data API, will incur the same quota costs as other methods.
- The table shows that methods like `videos.insert` have the highest cost of 1600 points, while several methods, such as `activities.list`, have the minimal cost of 1 point.
- There are numerous methods that cost 50 points such as `captions.delete`, `channels.update`, `comment.delete` and others.

The following table shows the quota cost for calling each API method. All API requests, including invalid requests, incur a quota cost of at least one point.

Projects that enable the YouTube Data API have a default quota allocation of 100 `search.list` calls, 100 `videos.insert` calls, and 10,000 units per day combined for all other endpoints. You can see your quota usage on [Quotas](https://console.cloud.google.com/iam-admin/quotas)  page in the Google API Console. Daily quotas reset at midnight Pacific Time (PT).

The following points are worth calling out as they both affect your quota usage:

- The `search.list` and `videos.insert` methods have their own quota buckets. Each of these methods has a default daily limit of 100 per day. The quota cost is 1 per call.
- If your application calls a method, such as `search.list`, that returns multiple
  pages of results, each request to retrieve an additional page of results incurs the estimated
  quota cost.
- [YouTube Live Streaming API](/youtube/v3/live) methods are, technically, part of the YouTube Data API, and calls to
  those methods also incur quota costs. As such, API methods for live streaming are also listed in
  the table.

| Quota costs | | |
| --- | --- | --- |
| resource | method | cost |
| activities | list | 1 |
| captions | list | 50 |
|  | insert | 400 |
|  | update | 450 |
|  | delete | 50 |
| channelBanners | insert | 50 |
| channels | list | 1 |
|  | update | 50 |
| channelSections | list | 1 |
|  | insert | 50 |
|  | update | 50 |
|  | delete | 50 |
| comments | list | 1 |
|  | insert | 50 |
|  | update | 50 |
|  | setModerationStatus | 50 |
|  | delete | 50 |
| commentThreads | list | 1 |
|  | insert | 50 |
|  | update | 50 |
| guideCategories | list | 1 |
| i18nLanguages | list | 1 |
| i18nRegions | list | 1 |
| members | list | 1 |
| membershipsLevels | list | 1 |
| playlistItems | list | 1 |
|  | insert | 50 |
|  | update | 50 |
|  | delete | 50 |
| playlists | list | 1 |
|  | insert | 50 |
|  | update | 50 |
|  | delete | 50 |
| search | list | 100 quota per day. Each call costs 1 quota. |
| subscriptions | list | 1 |
|  | insert | 50 |
|  | delete | 50 |
| thumbnails | set | 50 |
| videoAbuseReportReasons | list | 1 |
| videoCategories | list | 1 |
| videos | list | 1 |
|  | insert | 100 quota per day. Each call costs 1 quota. |
|  | update | 50 |
|  | rate | 50 |
|  | getRating | 1 |
|  | reportAbuse | 50 |
|  | delete | 50 |
| watermarks | set | 50 |
|  | unset | 50 |
