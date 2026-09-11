---
title: "Blog: Page Insights API updates (Aug 2025)"
source: "https://developers.facebook.com/blog/post/2025/08/15/page-insights-api-updates/"
final_url: "https://developers.facebook.com/blog/post/2025/08/15/page-insights-api-updates/"
platform: "facebook-pages"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "453b172dc47cd75e4cd82558872a14bdab29906750ee250b66d93f9aff83543c"
---

# Page Insights API Updates

#### By Li-Fu Lin

Beginning November 15, 2025, we’re deprecating the ‘impressions’ and ‘page fans’ metrics from the Page Insights API. This is in line with our continued efforts to align the functionality of the Page Insights API with that of the Facebook app and Meta Business Suite.

See below for details that are relevant to the developer community. These changes include notifications on deprecations that we believe are relevant to your application(s)’ integration with our platform.

For a complete list of all changes and their details, please visit our [changelog](https://developers.facebook.com/docs/pages-api/changelog/).

## Deprecations & Breaking Changes

### Page Insights API changes - metrics deprecation

To continue to align the functionality of the Page Insights API with the Facebook app and Meta Business Suite, we’re deprecating the `impressions` metric. This metric will be replaced by the `views` metric on all API versions.

Additionally, with the migration of all Facebook Pages to the new Pages experience, the Page Insights tab for classic Pages has been fully deprecated as of November 1, 2023. As part of this deprecation, we are deprecating the `page fans` metrics.

We are providing a 90-day notice to developers that these deprecations will be implemented on November 15, 2025, to give ample time to make any changes that are needed in preparation for this update. Once they are deprecated, the API will return an invalid metric error when calling any of these metrics. To avoid disruption to your business, please review the list of deprecated metrics to ensure your business transitions from using these.

For more comprehensive information and detailed implementation guidelines, please refer to our [developer documentation](https://developers.facebook.com/docs/graph-api/reference/v23.0/insights).

TAGS

[Business Tools](https://developers.facebook.com/blog/business_tools/)[Developer Tools](https://developers.facebook.com/blog/dev_tools/)[Pages API](https://developers.facebook.com/blog/pages_api/)

### Explore more

[December 3, 2025

#### Simplify business onboarding with Embedded signup v4](https://developers.facebook.com/blog/post/2025/12/03/simplify-business-onboarding-with-embedded-signup-v4/)[November 8, 2022

#### Get Started with the Page Insights API](https://developers.facebook.com/blog/post/2022/11/08/getting-started-with-page-insights-api/)[July 29, 2026

#### Introducing Graph API v26.0 and Marketing API v26.0](https://developers.facebook.com/blog/post/2026/07/29/introducing-graph-api-v26-and-marketing-api-v26/)

### Get our newsletter

Sign up for monthly updates from Meta for Developers.

[Sign up](/m/signup/)
