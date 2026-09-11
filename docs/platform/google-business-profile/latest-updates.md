---
title: "Latest updates"
source: "https://developers.google.com/my-business/content/latest-updates"
final_url: "https://developers.google.com/my-business/content/latest-updates"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b3350874f113c9496b3d36410e87e4a6c8dcba6db61c535e78129557b1486592"
---

# Latest updates Stay organized with collections Save and categorize content based on your preferences.

The following updates are available to all partners through the Google Business Profile APIs.

#### 2026-07-24

**review\_reply\_url:** The [reviewReplyUrl](/my-business/reference/rest/v4/accounts.locations.reviews#Review) can now be
retrieved as part of reviews using the following methods:

- [accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get)
- [accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list)
and- [accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews)

#### 2026-07-01

**Policy Violation:** [PolicyViolation](/my-business/reference/rest/v4/accounts.locations.reviews#PolicyViolation)
can now be retrieved as part of reviews.
PolicyViolation can be retrieved using the following methods:

- [accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get)
- [accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list)
- [accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews)

It provides more visibility into the policy violation status of your submitted review replies.

#### 2026-05-12

**Invitation Place ID:** The location's place ID can now be retrieved in pending invitations.
The place ID is available in [TargetLocation](/my-business/reference/accountmanagement/rest/v1/accounts.invitations/list#TargetLocation) under [Invitation](/my-business/reference/accountmanagement/rest/v1/accounts.invitations/list#Invitation).
Review pending invitations and retrieve their place IDs using the following method:

- [accounts.invitations.list](/my-business/reference/accountmanagement/rest/v1/accounts.invitations/list)

#### 2026-04-20

**Review Media Items:** [ReviewMediaItem](/my-business/reference/rest/v4/accounts.locations.reviews#Review)
can now be retrieved as part of reviews.
ReviewMediaItems (thumbnail image and video urls) can be retrieved using the following methods:

- [accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get)
- [accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list)
- [accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews)

#### 2026-04-07

**Recurrence Info:** You can now schedule recurring posts by setting [RecurrenceInfo](/my-business/reference/rest/v4/accounts.locations.localPosts#RecurrenceInfo)
when creating a [LocalPost](/my-business/reference/rest/v4/accounts.locations.localPosts#resource:-localpost).

#### 2026-04-01

**Review Reply:** [ReviewReplyState](/my-business/reference/rest/v4/accounts.locations.reviews#ReviewReply)
can now be retrieved as part of reviews.
ReviewReplyState can be retrieved using the following methods:

- [accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get)
- [accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list)
- [accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews)

It provides more visibility into the moderation status of your submitted review replies.
