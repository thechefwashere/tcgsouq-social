---
title: "marketingActivityUpsertExternal"
source: "https://shopify.dev/docs/api/admin-graphql/2026-07/mutations/marketingActivityUpsertExternal"
final_url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/marketingActivityUpsertExternal"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "af2853d20ad986ca9d5d6db73291b393a35edb267debb3c22240736073bc11d2"
---

Choose a version:

unstable 2026-10 release candidate2026-07 latest2026-04 2026-01 2025-10 

2026-07latest

Requires `write_marketing_events` access scope.

Creates a new external marketing activity or updates an existing one. When
optional fields are absent or null, associated information will be removed
from an existing marketing activity.

- input (MarketingActivityUpsertExternalInput!)

[Anchor to input](/docs/api/admin-graphql/latest/mutations/marketingActivityUpsertExternal#arguments-input)input •[MarketingActivityUpsertExternalInput!](/docs/api/admin-graphql/latest/input-objects/MarketingActivityUpsertExternalInput) required
:   The input field for creating or updating an external marketing activity.

    Show input fields

---

Was this section helpful?

## [Anchor to MarketingActivityUpsertExternalPayload returns](/docs/api/admin-graphql/latest/mutations/marketingActivityUpsertExternal#returns)MarketingActivityUpsertExternalPayload returns

- marketingActivity (MarketingActivity)
- userErrors ([MarketingActivityUserError!]!)

[Anchor to marketingActivity](/docs/api/admin-graphql/latest/mutations/marketingActivityUpsertExternal#returns-marketingActivity)marketingActivity •[MarketingActivity](/docs/api/admin-graphql/latest/objects/MarketingActivity)
:   The external marketing activity that was created or updated.

    Show fields

[Anchor to userErrors](/docs/api/admin-graphql/latest/mutations/marketingActivityUpsertExternal#returns-userErrors)userErrors •[[MarketingActivityUserError!]!](/docs/api/admin-graphql/latest/objects/MarketingActivityUserError) non-null
:   The list of errors that occurred from executing the mutation.

    Show fields

---

Was this section helpful?
