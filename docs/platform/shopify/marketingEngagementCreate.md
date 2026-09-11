---
title: "marketingEngagementCreate"
source: "https://shopify.dev/docs/api/admin-graphql/2026-07/mutations/marketingEngagementCreate"
final_url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "29822cd4f5b6cdc46933943f6d99be341a026c4b3591fb51520c19e76fa52bae"
---

Choose a version:

unstable 2026-10 release candidate2026-07 latest2026-04 2026-01 2025-10 

2026-07latest

Requires `write_marketing_events` access scope.

Creates a new marketing engagement for a marketing activity or a marketing channel.

- channelHandle (String)
- marketingActivityId (ID)
- marketingEngagement (MarketingEngagementInput!)
- remoteId (String)

[Anchor to channelHandle](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#arguments-channelHandle)channelHandle •[String](/docs/api/admin-graphql/latest/scalars/String)
:   The unique string identifier of the channel to which the engagement metrics
    are being provided. This should be set when and only when providing
    channel-level engagements. This should be nil when providing activity-level
    engagements. For the correct handle for your channel, contact your partner manager.

[Anchor to marketingActivityId](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#arguments-marketingActivityId)marketingActivityId •[ID](/docs/api/admin-graphql/latest/scalars/ID)
:   The identifier of the marketing activity for which the engagement metrics
    are being provided. This or the remoteId should be set when and only when
    providing activity-level engagements. This should be nil when providing
    channel-level engagements.

[Anchor to marketingEngagement](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#arguments-marketingEngagement)marketingEngagement •[MarketingEngagementInput!](/docs/api/admin-graphql/latest/input-objects/MarketingEngagementInput) required
:   The marketing engagement's attributes.

    Show input fields

[Anchor to remoteId](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#arguments-remoteId)remoteId •[String](/docs/api/admin-graphql/latest/scalars/String)
:   A custom unique identifier for the marketing activity, which can be used to
    manage the activity and send engagement metrics without having to store our
    marketing activity ID in your systems. This or the marketingActivityId
    should be set when and only when providing activity-level engagements. This
    should be nil when providing channel-level engagements.

---

Was this section helpful?

## [Anchor to MarketingEngagementCreatePayload returns](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#returns)MarketingEngagementCreatePayload returns

- marketingEngagement (MarketingEngagement)
- userErrors ([MarketingActivityUserError!]!)

[Anchor to marketingEngagement](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#returns-marketingEngagement)marketingEngagement •[MarketingEngagement](/docs/api/admin-graphql/latest/objects/MarketingEngagement)
:   The marketing engagement that was created. This represents customer activity
    taken on a marketing activity or a marketing channel.

    Show fields

[Anchor to userErrors](/docs/api/admin-graphql/latest/mutations/marketingEngagementCreate#returns-userErrors)userErrors •[[MarketingActivityUserError!]!](/docs/api/admin-graphql/latest/objects/MarketingActivityUserError) non-null
:   The list of errors that occurred from executing the mutation.

    Show fields

---

Was this section helpful?
