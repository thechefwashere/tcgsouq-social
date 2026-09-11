---
title: "API rate limits"
source: "https://shopify.dev/docs/api/usage/limits"
final_url: "https://shopify.dev/docs/api/usage/limits"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "db7dea5c789539fe1c6c93cb4445ff4278888848bcba69a80f599e711a709934"
---

To ensure our platform remains performant, stable and fair for everyone, some Shopify APIs are limited in accepted inputs or rate-limited. Below you can find more information about those limits.

---

## [Anchor to Input limits](/docs/api/usage/limits#input-limits)Input limits

Input arguments that accept an array have a maximum size of 250 for all APIs. Requests return an error if an input array exceeds 250 items.

---

## [Anchor to Pagination limits](/docs/api/usage/limits#pagination-limits)Pagination limits

Shopify limits pagination of arrays of objects to 25,000 objects. Pagination deep into large arrays is resource intensive and can slow down other requests. To keep all requests performant a limit of 25,000 was put in place that balances performance with practical use-cases.

If you need to paginate more than 25,000 items, you should consider adding filters to help buyers narrow their search to a manageable number of items before paging through all results. [See how you can add filters to your store](https://help.shopify.com/en/manual/online-store/search-and-discovery/filters).

This limit is also enforced on count queries. Counts are accurate up to 25,000 items. For arrays with more items, 25,001 is returned as the count, signaling that there are more than 25,000 items in the array.

---

## [Anchor to Rate Limits](/docs/api/usage/limits#rate-limits)Rate Limits

To ensure our platform remains stable and fair for everyone, some Shopify APIs are rate-limited. We use a variety of strategies to enforce rate limits. We ask developers to use [industry standard techniques](#avoiding-rate-limit-errors) for limiting calls, caching results, and re-trying requests responsibly.

### [Anchor to Compare rate limits by API](/docs/api/usage/limits#compare-rate-limits-by-api)Compare rate limits by API

Shopify APIs use several different [rate-limiting methods](#rate-limiting-methods). They're described in more detail below, but these are the key figures in brief:

| API | [Rate-limiting method](#rate-limiting-methods) | Standard limit | Advanced Shopify limit | Shopify Plus limit | Shopify for enterprise (Commerce Components) |
| --- | --- | --- | --- | --- | --- |
| [GraphQL Admin API](/docs/api/admin-graphql) | Calculated query cost | 100 points/second | 200 points/second | 1000 points/second | 2000 points/second |
| [Storefront API](/docs/api/storefront) | None | None | None | None | None |
| [Payments Apps API](/docs/api/payments-apps/) ([GraphQL](/docs/api/payments-apps)) | Calculated query cost | 27300 points/second | 27300 points/second | 54600 points/second | 109200 points/second |
| [Customer Account API](/docs/api/customer) | Calculated query cost | 100 points/second | 200 points/second | 200 points/second | 400 points/second |

Shopify may temporarily reduce API rate limits to protect platform stability. We will strive to keep these instances brief and rare. However, your application should be built to handle limits gracefully.

### [Anchor to The leaky bucket algorithm](/docs/api/usage/limits#the-leaky-bucket-algorithm)The leaky bucket algorithm

All Shopify APIs use a [leaky bucket algorithm](https://en.wikipedia.org/wiki/Leaky_bucket) to manage requests. The main points to understand about the leaky bucket metaphor are as follows:

- Each app has access to a bucket. It can hold, say, 60 "marbles".
- Each API request tosses [some number](#rate-limiting-methods) of marbles into the bucket.
- Each second, a marble is removed from the bucket (if there are any). This restores capacity for more marbles.
- If the bucket gets full, you get a throttle error and have to wait for more bucket capacity to become available.

This model ensures that apps that manage API calls responsibly can maintain capacity to make bursts of requests when needed. For example, if you average 20 requests ("marbles") per second but suddenly need to make 30 requests all at once, you can still do so without hitting your rate limit.

The basic principles of the leaky bucket algorithm apply to all our rate limits, regardless of the specific [methods](#rate-limiting-methods) used to apply them.

### [Anchor to Rate limiting methods](/docs/api/usage/limits#rate-limiting-methods)Rate limiting methods

Shopify's GraphQL APIs use a calculated query cost method. The exception is the the Storefront API, which has no rate limits applied on the number of requests. [Learn more](#storefront-api-rate-limits).

Apps can make requests that cost a maximum number of **points** each minute. For example, 1000 points within 60 seconds. More complex requests cost more points, and therefore take up a proportionally larger share of the limit.

### [Anchor to GraphQL Admin API rate limits](/docs/api/usage/limits#graphql-admin-api-rate-limits)GraphQL Admin API rate limits

Calls to the GraphQL Admin API are limited based on [calculated query costs](#rate-limiting-methods), which means you should consider the cost of requests over time, rather than the number of requests.

GraphQL Admin API rate limits are based on the combination of the app and store. This means that calls from one app don't affect the rate limits of another app, even on the same store. Similarly, calls to one store don't affect the rate limits of another store, even from the same app.

Each combination of app and store is given a bucket size and restore rate based on [API and plan tier](#compare-rate-limits-by-api). By making simpler, lower-cost queries, you can maximize your throughput and make more queries over time.

#### [Anchor to Cost calculation](/docs/api/usage/limits#cost-calculation)Cost calculation

Every field in the schema has an integer cost value assigned to it. The cost of a query is the maximum of possible fields selected. Running a query is the best way to find out its true cost.

By default, a field's cost is based on what the field returns:

| Field returns | Cost value |
| --- | --- |
| Scalar | 0 |
| Enum | 0 |
| Object | 1 |
| Interface | Maximum of possible selections |
| Union | Maximum of possible selections |
| Connection | Sized by `first` and `last` arguments |
| Mutation | 10 |

Although these default costs are in place, Shopify also reserves the right to set manual costs on fields.

#### [Anchor to Requested and actual cost](/docs/api/usage/limits#requested-and-actual-cost)Requested and actual cost

Shopify calculates the cost of a query both before and after execution.

- The **requested cost** is based on the composition of fields selected in the request.
- The **actual cost** is based on the query results, and may be lower than requested cost due to the actual objects returned or connections that return fewer edges than requested.

Rate limits use a combination of the requested and actual query cost. Before execution begins, an app's bucket must have enough capacity for the requested cost of a query. When execution is complete, the bucket is refunded the difference between the requested cost and the actual cost of the query.

#### [Anchor to Single query limit](/docs/api/usage/limits#single-query-limit)Single query limit

A single query may not exceed a cost of 1,000 points, regardless of plan limits. This limit is enforced before a query is executed based on the query's requested cost.

#### [Anchor to Maximum input array size limit](/docs/api/usage/limits#maximum-input-array-size-limit)Maximum input array size limit

Input arguments that accept an array have a maximum size of 250. Queries and mutations return an error if an input array exceeds 250 items.

#### [Anchor to GraphQL response](/docs/api/usage/limits#graphql-response)GraphQL response

The response includes information about the cost of the request and the state of the throttle. This data is returned under the `extensions` key:

1

2

3

4

5

6

7

8

9

10

11

"extensions": {

"cost": {

"requestedQueryCost": 101,

"actualQueryCost": 46,

"throttleStatus": {

"maximumAvailable": 1000,

"currentlyAvailable": 954,

"restoreRate": 50

}

}

}

To get a detailed breakdown of how each field contributes to the requested cost, you can include the header `Shopify-GraphQL-Cost-Debug=1` in your request.

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

"extensions": {

"cost": {

"requestedQueryCost": 101,

"actualQueryCost": 46,

"throttleStatus": ...,

"fields": [

{

"path": [

"shop"

],

"definedCost": 1,

"requestedTotalCost": 101,

"requestedChildrenCost": 100

},

...

]

}

}

#### [Anchor to Bulk operations](/docs/api/usage/limits#bulk-operations)Bulk operations

To query and fetch large amounts of data, you should use [bulk operations](/docs/api/usage/bulk-operations/queries) instead of single queries. Bulk operations are designed for handling large amounts of data, and they don't have the max cost limits or rate limits that single queries have.

### [Anchor to Storefront API rate limits](/docs/api/usage/limits#storefront-api-rate-limits)Storefront API rate limits

The Storefront API is designed to support businesses of all sizes, and scales to support surges in buyer traffic or your largest flash sale. Requests from real buyers aren't subject to a fixed request-per-minute limit.

To keep the platform fast and fair, Shopify rate-limits automated traffic — such as bots and crawlers — that accesses the Storefront API and Shopify-hosted online store pages. Unsigned, anonymous bots receive the strictest limits. Bot operators that need higher limits should identify themselves by signing their requests with [Web Bot Auth](#identifying-bots-with-web-bot-auth).

The Storefront API also protects against malicious traffic. If a request appears to be malicious, Shopify responds with a `430 Shopify Security Rejection` [error code](/docs/api/usage/response-codes) to indicate potential security concerns. Ensure requests to the Storefront API include the correct [Buyer IP header](/docs/api/storefront#make-server-side-requests-with-a-private-access-token).

#### [Anchor to Identifying bots with Web Bot Auth](/docs/api/usage/limits#identifying-bots-with-web-bot-auth)Identifying bots with Web Bot Auth

Bot operators that crawl the Storefront API or Shopify-hosted online store pages can request higher rate limits by signing their requests with [Web Bot Auth](https://datatracker.ietf.org/doc/draft-meunier-web-bot-auth-architecture/). Signed traffic is subject to higher rate limits than anonymous traffic.

For background and a signing example, see Cloudflare's [Web Bot Auth implementation guide](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/web-bot-auth/). Shopify references this guide for context only — you don't need to enroll in any Cloudflare program.

Bot operators that need higher rate limits than signed traffic provides can [apply through this form](https://forms.gle/V88RD31uAVirqE4e9).

Merchants who want to [crawl their own stores](https://help.shopify.com/en/manual/promoting-marketing/seo/crawling-your-store) can find ready-to-use Web Bot Auth signatures in the Shopify admin.

#### [Anchor to Checkout-level throttle](/docs/api/usage/limits#checkout-level-throttle)Checkout-level throttle

Shopify limits the amount of checkouts that can be created on the Storefront API per minute. If an API client exceeds this throttle, then a `200 Throttled` error response is returned. Shopify recommends designing your app to be resilient to this scenario. For example, you could implement a request queue with an exponential backoff algorithm.

#### [Anchor to Maximum input array size limit](/docs/api/usage/limits#maximum-input-array-size-limit)Maximum input array size limit

Input arguments that accept an array have a maximum size of 250. Queries and mutations return an error if an input array exceeds 250 items.

### [Anchor to Resource-based rate limits](/docs/api/usage/limits#resource-based-rate-limits)Resource-based rate limits

The following GraphQL Admin API types have an additional throttle that takes effect when a store has 500,000 product variants. After this threshold is reached, no more than 10,000 new variants can be created per day.

- [productCreate](/docs/api/admin-graphql/latest/mutations/productcreate)
- [productUpdate](/docs/api/admin-graphql/latest/mutations/productupdate)
- [productVariantCreate](/docs/api/admin-graphql/latest/mutations/productvariantcreate)

If an app reaches API rate limits for a specific resource, then it receives a `429 Too Many Requests` response, and a message that a throttle has been applied.

In certain cases, Shopify needs to enforce rate limiting in order to prevent abuse of the platform. Therefore, your app should be prepared to handle rate limiting on all endpoints, rather than just those listed here.

Plus

These additional limits don't apply to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

**Plus:**

These additional limits don't apply to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

### [Anchor to Avoiding rate limit errors](/docs/api/usage/limits#avoiding-rate-limit-errors)Avoiding rate limit errors

Designing your app with best practices in mind is the best way to avoid throttling errors. For example, you can stagger API requests in a queue and do other processing tasks while waiting for the next queued job to run. Consider the following best practices when designing your app:

- Optimize your code to only get the data that your app requires.
- Use caching for data that your app uses often.
- Regulate the rate of your requests for smoother distribution.
- Include code that catches errors. If you ignore these errors and keep trying to make requests, then your app won't be able to gracefully recover.
- Use metadata about your app's API usage, included with all API responses, to manage your app's behavior dynamically.
- Your code should stop making additional API requests until enough time has passed to retry. The recommended backoff time is one second.
- If your app is a bot or crawler accessing the Storefront API or Shopify-hosted online store pages, [sign your requests with Web Bot Auth](#identifying-bots-with-web-bot-auth) to qualify for higher rate limits.

---

Was this page helpful?
