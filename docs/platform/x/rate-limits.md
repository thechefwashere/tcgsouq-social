---
title: "Rate limits"
source: "https://docs.x.com/x-api/fundamentals/rate-limits"
final_url: "https://docs.x.com/x-api/fundamentals/rate-limits"
platform: "x"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "2a78087fb11643cd38f7b83b066b39fad0b5921174aee8cea3a2213667c444cc"
---

Rate limits control the number of requests you can make to each endpoint. Exceeding limits results in a 429 error until the window resets.

---

## [​](#how-rate-limits-work) How rate limits work

| Concept | Description |
| --- | --- |
| **Time window** | Usually 15 minutes or 24 hours |
| **Per-user limits** | Apply with OAuth 1.0a or OAuth 2.0 user tokens |
| **Per-app limits** | Apply with Bearer Token (app-only) |
| **Per-endpoint** | Each endpoint has its own limits |

---

## [​](#checking-your-limits) Checking your limits

Response headers show your current rate limit status:

```
x-rate-limit-limit: 900
x-rate-limit-remaining: 847
x-rate-limit-reset: 1705420800
```

| Header | Description |
| --- | --- |
| `x-rate-limit-limit` | Maximum requests allowed |
| `x-rate-limit-remaining` | Requests remaining in window |
| `x-rate-limit-reset` | Unix timestamp when window resets |

---

## [​](#rate-limit-tables) Rate limit tables

View the rate limit for each endpoint below. You can also see these limits in the [Developer Console](https://console.x.com).

Limits are shown per 15 minutes unless otherwise noted (e.g., “/24hrs” or “/sec”).

### [​](#posts-25-endpoints) Posts (25 endpoints)

#### [​](#tweets-lookup) Tweets lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/tweets` | 3,500/15min | 5,000/15min |
| GET | `/2/tweets/:id` | 450/15min | 900/15min |

#### [​](#recent-search) Recent search

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/tweets/search/recent` | 450/15min | 300/15min | 10 default, 100 max results; 512 query length |

#### [​](#full-archive-search) Full-archive search

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/tweets/search/all` | 1/sec, 300/15min | 1/sec | 10 default, 500 max results; 1024 query length |

#### [​](#post-counts) Post counts

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/tweets/counts/recent` | 300/15min | — | 512 query length |
| GET | `/2/tweets/counts/all` | 300/15min | — | 1024 query length |

#### [​](#filtered-stream) Filtered stream

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/tweets/search/stream` | 50/15min | — | 1 connection; 1000 rules; 1024 rule length; 250 posts/sec |
| GET | `/2/tweets/search/stream/rules` | 450/15min | — | 1 connection; 1000 rules; 1024 rule length |
| POST | `/2/tweets/search/stream/rules` | 100/15min | — | 1 connection; 1000 rules; 1024 rule length |

#### [​](#manage-posts) Manage posts

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/tweets` | 10,000/24hrs | 100/15min |
| DELETE | `/2/tweets/:id` | — | 50/15min |

#### [​](#timelines) Timelines

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/:id/tweets` | 10,000/15min | 900/15min |
| GET | `/2/users/:id/mentions` | 450/15min | 300/15min |
| GET | `/2/users/:id/timelines/reverse_chronological` | — | 180/15min |

#### [​](#likes-lookup) Likes lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/tweets/:id/liking_users` | 75/15min | 75/15min |
| GET | `/2/users/:id/liked_tweets` | 75/15min | 75/15min |

#### [​](#manage-likes) Manage likes

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/users/:id/likes` | — | 50/15min, 1,000/24hrs |
| DELETE | `/2/users/:id/likes/:tweet_id` | — | 50/15min, 1,000/24hrs |

#### [​](#retweets-lookup) Retweets lookup

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/tweets/:id/retweeted_by` | 75/15min | 75/15min | — |
| GET | `/2/tweets/:id/quote_tweets` | 75/15min | 75/15min | — |
| GET | `/2/users/reposts_of_me` | — | 75/15min | 100 max results |

#### [​](#manage-retweets) Manage retweets

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/users/:id/retweets` | — | 50/15min |
| DELETE | `/2/users/:id/retweets/:tweet_id` | — | 50/15min |

#### [​](#hide-replies) Hide replies

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| PUT | `/2/tweets/:tweet_id/hidden` | — | 50/15min |

---

### [​](#users-14-endpoints) Users (14 endpoints)

#### [​](#users-lookup) Users lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users` | 300/15min | 900/15min |
| GET | `/2/users/:id` | 300/15min | 900/15min |
| GET | `/2/users/by` | 300/15min | 900/15min |
| GET | `/2/users/by/username/:username` | 300/15min | 900/15min |
| GET | `/2/users/me` | — | 75/15min |

#### [​](#search-users) Search users

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/search` | 300/15min | 900/15min |

#### [​](#follows-lookup) Follows lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/:id/following` | 300/15min | 300/15min |
| GET | `/2/users/:id/followers` | 300/15min | 300/15min |

#### [​](#manage-follows) Manage follows

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/users/:id/following` | — | 50/15min |
| DELETE | `/2/users/:source_user_id/following/:target_user_id` | — | 50/15min |

#### [​](#blocks-lookup) Blocks lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/:id/blocking` | — | 15/15min |

#### [​](#mutes-lookup) Mutes lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/:id/muting` | — | 15/15min |

#### [​](#manage-mutes) Manage mutes

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/users/:id/muting` | — | 50/15min |
| DELETE | `/2/users/:source_user_id/muting/:target_user_id` | — | 50/15min |

---

### [​](#spaces-6-endpoints) Spaces (6 endpoints)

#### [​](#spaces-lookup) Spaces lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/spaces/:id` | 300/15min | 300/15min |
| GET | `/2/spaces` | 300/15min | 300/15min |
| GET | `/2/spaces/:id/tweets` | 300/15min | 300/15min |
| GET | `/2/spaces/by/creator_ids` | 300/15min, 1/sec | 300/15min, 1/sec |
| GET | `/2/spaces/:id/buyers` | 300/15min | 300/15min |

#### [​](#search-spaces) Search Spaces

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/spaces/search` | 300/15min | 300/15min |

---

### [​](#direct-messages-8-endpoints) Direct Messages (8 endpoints)

#### [​](#direct-messages-lookup) Direct Messages lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/dm_events` | — | 15/15min |
| GET | `/2/dm_events/:id` | — | 15/15min |
| GET | `/2/dm_conversations/:dm_conversation_id/dm_events` | — | 15/15min |
| GET | `/2/dm_conversations/with/:participant_id/dm_events` | — | 15/15min |

#### [​](#manage-direct-messages) Manage Direct Messages

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/dm_conversations` | 1,440/24hrs | 15/15min, 1,440/24hrs |
| POST | `/2/dm_conversations/with/:participant_id/messages` | 1,440/24hrs | 15/15min, 1,440/24hrs |
| POST | `/2/dm_conversations/:dm_conversation_id/messages` | 1,440/24hrs | 15/15min, 1,440/24hrs |
| DELETE | `/2/dm_events/:id` | 4,000/24hrs | 300/15min, 1,500/24hrs |

---

### [​](#lists-14-endpoints) Lists (14 endpoints)

#### [​](#lists-lookup) Lists lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/lists/:id` | 75/15min | 75/15min |
| GET | `/2/users/:id/owned_lists` | 15/15min | 15/15min |

#### [​](#list-tweets-lookup) List Tweets lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/lists/:id/tweets` | 900/15min | 900/15min |

#### [​](#list-member-lookup) List member lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/lists/:id/members` | 900/15min | 900/15min |
| GET | `/2/users/:id/list_memberships` | 75/15min | 75/15min |

#### [​](#manage-lists) Manage Lists

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/lists` | — | 300/15min |
| DELETE | `/2/lists/:id` | — | 300/15min |
| PUT | `/2/lists/:id` | — | 300/15min |

#### [​](#manage-list-members) Manage List members

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/lists/:id/members` | — | 300/15min |
| DELETE | `/2/lists/:id/members/:user_id` | — | 300/15min |

#### [​](#manage-list-follows) Manage List follows

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/users/:id/followed_lists` | — | 50/15min |
| DELETE | `/2/users/:id/followed_lists/:list_id` | — | 50/15min |

#### [​](#pinned-lists) Pinned Lists

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/:id/pinned_lists` | 15/15min | 15/15min |
| POST | `/2/users/:id/pinned_lists` | — | 50/15min |
| DELETE | `/2/users/:id/pinned_lists/:list_id` | — | 50/15min |

---

### [​](#bookmarks-5-endpoints) Bookmarks (5 endpoints)

#### [​](#bookmarks-lookup) Bookmarks lookup

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/:id/bookmarks` | — | 180/15min |
| GET | `/2/users/:id/bookmarks/folders` | 50/15min | 50/15min |
| GET | `/2/users/:id/bookmarks/folders/:folder_id` | 50/15min | 50/15min |

#### [​](#manage-bookmarks) Manage Bookmarks

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/users/:id/bookmarks` | — | 50/15min |
| DELETE | `/2/users/:id/bookmarks/:tweet_id` | — | 50/15min |

---

### [​](#compliance-3-endpoints) Compliance (3 endpoints)

#### [​](#batch-compliance) Batch compliance

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/compliance/jobs` | 150/15min | — |
| GET | `/2/compliance/jobs/:job_id` | 150/15min | — |
| GET | `/2/compliance/jobs` | 150/15min | — |

---

### [​](#usage-1-endpoint) Usage (1 endpoint)

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/usage/tweets` | 50/15min | — |

---

### [​](#trends-2-endpoints) Trends (2 endpoints)

#### [​](#personalized-trends) Personalized Trends

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/users/personalized_trends` | 200/24hrs, 200/15min | 100/24hrs, 10/15min |

#### [​](#trends-by-woeid) Trends by WOEID

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/trends/by/woeid/:id` | 75/15min | — |

---

### [​](#communities-2-endpoints) Communities (2 endpoints)

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/communities/:id` | 300/15min | 300/15min | — |
| GET | `/2/communities/search` | 300/15min | 300/15min | 100 max results |

---

### [​](#analytics-1-endpoint) Analytics (1 endpoint)

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/tweets/analytics` | 300/15min | 300/15min |

---

### [​](#media-8-endpoints) Media (8 endpoints)

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| POST | `/2/media/upload` | 50,000/24hrs | 500/15min |
| GET | `/2/media/upload` | 100,000/24hrs | 1,000/15min |
| POST | `/2/media/upload/initialize` | 180,000/24hrs | 1,875/15min |
| POST | `/2/media/upload/:id/append` | 180,000/24hrs | 1,875/15min |
| POST | `/2/media/upload/:id/finalize` | 180,000/24hrs | 1,875/15min |
| POST | `/2/media/metadata` | 50,000/24hrs | 500/15min |
| POST | `/2/media/subtitles` | 10,000/24hrs | 100/15min |
| DELETE | `/2/media/subtitles` | 10,000/24hrs | 100/15min |

---

### [​](#activity-&-webhooks) Activity & Webhooks

| Method | Endpoint | Per App | Per User | Notes |
| --- | --- | --- | --- | --- |
| GET | `/2/activity/stream` | 450/15min | — | 2 connections; 250 posts/sec |
| POST | `/2/activity/subscriptions` | 500/15min | — | — |
| GET | `/2/activity/subscriptions` | 500/15min | — | — |
| PUT | `/2/activity/subscriptions/:subscription_id` | 500/15min | — | — |
| DELETE | `/2/activity/subscriptions/:subscription_id` | 500/15min | — | — |
| POST | `/2/webhooks` | 450/15min | — | — |
| GET | `/2/webhooks` | 450/15min | — | — |
| PUT | `/2/webhooks/:webhook_id` | 450/15min | — | — |
| DELETE | `/2/webhooks/:webhook_id` | 450/15min | — | — |
| POST | `/2/webhooks/replay` | 100/15min | — | — |

---

### [​](#other-endpoints) Other endpoints

| Method | Endpoint | Per App | Per User |
| --- | --- | --- | --- |
| GET | `/2/tweets/sample10/stream` | 100/15min | — |
| GET | `/2/news/:id` | 200/15min | — |
| GET | `/2/news/search` | 200/15min | 200/15min |
| POST | `/2/users/:id/dm/block` | 25/15min, 1,000/24hrs | 10/15min, 400/24hrs |
| POST | `/2/users/:id/dm/unblock` | 25/15min, 1,000/24hrs | 10/15min, 400/24hrs |
| GET | `/2/users/by/username/:username/tweets` | 1,500/15min | 900/15min |
| GET | `/2/users/by/username/:username/mentions` | 450/15min | 180/15min |
| GET | `/2/users/:id/following/spaces` | 300/15min | 300/15min |
| GET | `/2/tweets/:id/retweets` | 75/15min | 75/15min |
| DELETE | `/2/connections/all` | 25/15min | 25/15min |

---

## [​](#handling-rate-limits) Handling rate limits

When you hit a rate limit, you’ll receive a 429 response:

```
{
  "errors": [{
    "code": 88,
    "message": "Rate limit exceeded"
  }]
}
```

### [​](#recovery-strategy) Recovery strategy

1. Check `x-rate-limit-reset` for when the window resets
2. Wait until that time before retrying
3. Use exponential backoff if needed

Example

```
import time

def make_request_with_backoff(url, headers):
    response = requests.get(url, headers=headers)
    
    if response.status_code == 429:
        reset_time = int(response.headers.get('x-rate-limit-reset', 0))
        wait_time = max(reset_time - time.time(), 60)
        time.sleep(wait_time)
        return make_request_with_backoff(url, headers)
    
    return response
```

---

## [​](#best-practices) Best practices

## Cache responses

Store results locally to reduce repeated requests.

## Use streaming

For real-time data, use filtered stream instead of polling.

## Monitor headers

Track remaining requests to avoid hitting limits.

## Spread requests

Distribute requests across the time window.

---

## [​](#rate-limits-vs-billing) Rate limits vs. billing

Rate limits and billing are separate:

| Concept | Purpose |
| --- | --- |
| **Rate limits** | Control request frequency for system stability |
| **Usage billing** | Charge for data retrieved (pay-per-usage) |

You can be within rate limits but still incur usage costs, or hit rate limits without additional cost.

---

## [​](#enterprise-rate-limits) Enterprise rate limits

Enterprise customers have custom rate limits. Contact your account manager or [apply for Enterprise access](/enterprise/forms/enterprise-api-interest).

---

## [​](#next-steps) Next steps

## Error handling

Handle 429 and other errors.

## Getting started

Learn about access levels and features.

⌘I
