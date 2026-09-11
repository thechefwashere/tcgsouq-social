---
title: "Usage limits"
source: "https://developers.google.com/my-business/content/limits"
final_url: "https://developers.google.com/my-business/content/limits"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b72b297ca9f9a79edcfb356ea6c3270491caed526171d53f2e3c264f881451f4"
---

# Quota limits

To ensure fair usage and protect system stability, the Google Business Profile (GBP) APIs enforce
quotas on API requests. If your request exceeds a quota limit, the API responds with a
`429 Too Many Requests` HTTP status code (or `RESOURCE_EXHAUSTED` for gRPC).

## Default quota limits

The following table lists the standard quota limits for the Google Business Profile APIs. Limits
are defined across two dimensions:

- **Queries Per Minute (QPM):** Protects backend stability by capping short-term burst traffic.
- **Queries Per Day (QPD):** Manages overall daily platform usage.

| API | Limits |
| --- | --- |
| Business Information API | - **Default requests:** 300 QPM - **Create Location requests:** 300 QPD - **SearchGoogleLocation requests:** 300 QPD - **Update Location requests:** 10000 QPD - **Edits:** 10 per minute per Google Business Profile (cannot be increased) |
| Account Management API | 300 QPM |
| Performance API | 300 QPM |
| Verifications API | 300 QPM |
| Lodging API | 300 QPM |
| Place Actions API | 300 QPM |
| Notifications API | 300 QPM |

## Best practices for avoiding quota errors

Spreading your requests continuously and evenly throughout the day prevents the vast majority of
quota errors. Follow these best practices to ensure your application synchronizes data reliably.

### Pace your requests evenly

Instead of sending a large batch of requests at the same time, distribute your requests across a
longer period. For example, a limit of 300 QPM translates to an average of 5 requests per second.
Introducing a short delay between requests prevents sudden traffic spikes.

```
Traffic distribution patterns:

Spiky traffic (Discouraged): High burst of requests followed by an idle period
Requests |   |||                 |||
         |   |||                 |||
         +---------------------------------
           Time ──>

Even traffic (Recommended): Consistent rate of requests over time
Requests |  |  |  |  |  |  |  |  |  |
         |  |  |  |  |  |  |  |  |  |
         +---------------------------------
           Time ──>
```

```
import time

# Pace requests to stay within the 300 QPM limit (5 requests/sec)
for request in batch_requests:
    send_request(request)
    time.sleep(0.2)  # 200ms delay ensures a smooth distribution
```

### Implement exponential backoff with jitter

When you receive a `429 Too Many Requests` error, use
**exponential backoff with jitter** to retry the request automatically. This standard practice
involves waiting a short, randomized period before retrying, and gradually increasing the delay
for subsequent retries.

```
import random
import time
from googleapiclient.errors import HttpError

def call_api_with_retry(api_method, max_retries=5):
    base_delay = 1.0
    for attempt in range(max_retries):
        try:
            return api_method.execute()
        except HttpError as e:
            if e.resp.status == 429:
                if attempt == max_retries - 1:
                    raise e
                # Retry with exponential backoff and jitter
                sleep_time = random.uniform(0, base_delay * (2 ** attempt))
                time.sleep(sleep_time)
            else:
                raise e
```

### Optimize data access

- **Cache static data:** Store infrequently changing data locally rather than querying the API
  repeatedly.
- **Use Pub/Sub notifications:** Subscribe to Pub/Sub notifications to keep your databases
  updated in real time without polling the API.
- **Process read-heavy endpoints sequentially:** Avoid executing multiple concurrent requests
  to read-heavy endpoints like `SearchListings`. Instead, process tasks sequentially
  using pagination tokens.

## Request a quota increase

Before requesting a quota increase, verify your usage patterns in the
[Google Cloud Console](https://console.cloud.google.com/apis/dashboard) to ensure your
request volume is not unnecessarily clustered.

The Google Business Profile team monitors your average quota usage to ensure you are utilizing
your current limits efficiently. Quota increase requests are typically denied if:

- Your application doesn't consistently reach the current QPM limit.
- Your average usage is less than 50% of your current QPM limit.
- Your application exhibits a highly spiky request pattern rather than a smooth distribution.

### Submit a request

If you have implemented these best practices and still require more quota, submit a
[Quota Increase Request](https://support.google.com/business/contact/api_default).

1. Select **Quota Increase Request** from the drop-down menu.
2. Provide your **Company name**, **Contact email**, and **Project number**.

After you submit the form, the Google Business Profile team will review your request and determine
whether the quota increase is appropriate. If the request is approved, the quota will be
increased. If the request is denied, you will receive a reason for the denial.
