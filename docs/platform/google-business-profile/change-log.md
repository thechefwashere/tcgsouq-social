---
title: "Change log"
source: "https://developers.google.com/my-business/content/change-log"
final_url: "https://developers.google.com/my-business/content/change-log"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "45055513732f0a89123c7137df1e54c63e941b4713ed8caba1205b7e62226f1b"
---

# Change Log Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Google My Business API v4.9 introduces MoreHours for business listings and allows retrieval of MoreHourTypes for each category.
- v4.8 enables retrieval and update of lodging and health provider attributes, as well as listing insurance networks accepted by locations.
- v4.7 introduces retrieval and update capabilities for food menus.
- With v4.6, you can manage service lists, including retrieving, updating, and accessing predefined service types for categories.
- Google My Business API v4 includes major features like Posts on Google, direct photo uploads, notifications filtering, and support for user groups.

## v4.9

### New Features

**2026-07-24**

`review_reply_url`: The [reviewReplyUrl](/my-business/reference/rest/v4/accounts.locations.reviews#Review)
can now be retrieved using
[accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get),
[accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list),
and
[accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews).

**2026-07-01**

`Policy Violation`: The [PolicyViolation](/my-business/reference/rest/v4/accounts.locations.reviews#PolicyViolation)
field is now included in
[ReviewReply](/my-business/reference/rest/v4/accounts.locations.reviews#ReviewReply)
for reviews.
`PolicyViolation` can be
retrieved using
[accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get),
[accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list),
and
[accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews).
It provides more visibility into why a review reply was rejected during
moderation.

**2026-04-20**

`Review Media Items`:
[ReviewMediaItems](/my-business/reference/rest/v4/reviews#reviewmediaitems) can
now be retrieved as part of reviews.
`ReviewMediaItems` can be retrieved using
[accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get),
[accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list),
and
[accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews).

**2026-04-07**

`Recurrence Info`: You can now schedule recurring posts by setting [RecurrenceInfo](/my-business/reference/rest/v4/accounts.locations.localPosts#RecurrenceInfo)
when creating a [LocalPost](/my-business/reference/rest/v4/accounts.locations.localPosts#resource:-localpost)

`Food Menus`: You can now manage up to 200 dish photos in your Food Menus
using [accounts.locations.updateFoodMenus](/my-business/reference/rest/v4/accounts.locations/updateFoodMenus)

**2026-04-01**

`Review Reply State`: [ReviewReplyState](/my-business/reference/rest/v4/accounts.locations.reviews#ReviewReply)
can now be retrieved as part of reviews.
`ReviewReplyState` can be
retrieved using
[accounts.locations.reviews.get](/my-business/reference/rest/v4/accounts.locations.reviews/get),
[accounts.locations.reviews.list](/my-business/reference/rest/v4/accounts.locations.reviews/list),
and
[accounts.locations.batchGetReviews](/my-business/reference/rest/v4/accounts.locations/batchGetReviews).
It provides more visibility into the moderation status of your submitted
review replies.

**2021-02-24**

`MoreHours`
:
[MoreHours](/my-business/reference/rest/v4/accounts.locations#morehours) can
now be set as part of the business listing.
: `MoreHourTypes` can be
retrieved for each
[category](/my-business/reference/rest/v4/categories#resource:-category)
using
[categories.batchGet](/my-business/reference/rest/v4/categories/batchGet).

### Behavioral Changes

v4.x Accounts Deprecation
:   [accounts](/my-business/reference/rest/v4/accounts),
    [accounts.admins](/my-business/reference/rest/v4/accounts.admins),
    [accounts.invitations](/my-business/reference/rest/v4/accounts.invitations),
    and [accounts.locations.admins](/my-business/reference/rest/v4/accounts.locations.admins)
    are now deprecated in the Google My Business API. See the [deprecation change
    log](/my-business/content/sunset-dates) for more info.

CallToAction Posts
:   In Q2 2021, `CallToAction` Posts with the

    [GET\_OFFER](/my-business/reference/rest/v4/accounts.locations.localPosts#actiontype)
    `ActionType` will no longer be valid.

## v4.8

### New Features

Lodging Amenities
:
[Retrieval](/my-business/reference/rest/v4/accounts.locations/getLodging)
and
[update](/my-business/reference/rest/v4/accounts.locations/updateLodging) of
Lodging Amenities. [More Info](/my-business/reference/rest/v4/Lodging)
:
Addition of
[GetGoogleUpdated](/my-business/reference/rest/v4/accounts.locations.lodging/getGoogleUpdated)
endpoint for Lodging.
: Addition of `canOperateLodgingData` boolean value in
[LocationState](/my-business/reference/rest/v4/accounts.locations#locationstate)

Health Provider Attributes
:
[Retrieval](/my-business/reference/rest/v4/accounts.locations/getHealthProviderAttributes)
and
[update](/my-business/reference/rest/v4/accounts.locations/updateHealthProviderAttributes)
of HealthProviderAttributes. [More
Info](/my-business/reference/rest/v4/HealthProviderAttributes)
: Addition of
`canOperateHealthData` boolean value in
[LocationState](/my-business/reference/rest/v4/accounts.locations#locationstate)

Insurance Networks
:
[List](/my-business/reference/rest/v4/accounts.locations.insuranceNetworks/list)
insurance networks accepted by locations. [More
Info](/my-business/reference/rest/v4/InsuranceNetwork)

### Behavioral Changes

Review IDs
:   Review IDs have migrated to a new format. This new ID will now be
    returned in all applicable API responses. For a short period of time, old
    review IDs will still resolve when used to call the API, but it is critical
    to refresh all review IDs stored on your system within 30 days as required
    by our [policies](/my-business/content/policies#content-storage) by calling
    the
    [listReviews](/my-business/reference/rest/v4/accounts.locations.reviews/list)
    endpoint.

Service Area Business
:   In Q1 2021, `Address` will no longer be returned in the

    [Location](/my-business/reference/rest/v4/accounts.locations#resource:-location)
    object for
    [`CUSTOMER_LOCATION_ONLY`](/my-business/reference/rest/v4/accounts.locations#Location.BusinessType)
    businesses.

## v4.7

### New Features

Food Menus
:
[Retrieval](/my-business/reference/rest/v4/accounts.locations/getFoodMenus)
and
[update](/my-business/reference/rest/v4/accounts.locations/updateFoodMenus)
of FoodMenus. [More Info](/my-business/reference/rest/v4/FoodMenus)

## v4.6

### New Features

Service Lists
:   You can now

    [retrieve](/my-business/preview/reference/rest/v4/accounts.locations/getServiceList)
    and
    [update](/my-business/reference/rest/v4/accounts.locations/updateServiceList)
    the services a business offers. [More
    Info](/my-business/reference/rest/v4/ServiceList)

Addition of `canModifyServiceList` boolean value in LocationState
:   Indicates
    whether a location is eligible to modify service lists [More
    Info](/my-business/reference/rest/v4/ServiceList)

Predefined `ServiceTypes` for Categories
:   Predefined service types are now
    included as in the categories object. [More
    Info](/my-business/reference/rest/v4/categories#Category.ServiceType)

CategoryView
:   Ability to specify a `BASIC` or `FULL` view for categories. The
    `FULL` view will return additional details such as service types. [More
    Info](/my-business/reference/rest/v4/CategoryView)

Categories.BatchGet Method
:   This new method lets you input a list of
    categories and returns information on only those categories. [More
    Info](/my-business/reference/rest/v4/categories/batchGet)

## v4.5 COVID-19 Update 2

### New Features

COVID-19 Alert Post Type
:   You can now create a `COVID_19` post using the API.

    [More
    Info](/my-business/reference/rest/v4/accounts.locations.localPosts#alerttype).

## v4.5 COVID-19 Update 1

### New Features

Temporarily Closed
:   You can now set a business to `CLOSED_TEMPORARILY` using the
    API. [More
    Info](/my-business/reference/rest/v4/accounts.locations#openforbusiness).

## v4.5

### New Features

Pub/Sub for Q&A
:   You can now receive Google Cloud Pub/Sub notifications for
    new or updated questions and answers on a location. [More
    Info](/my-business/reference/rest/v4/Notifications#NotificationType).

Pub/Sub for listing state
:   You can now receive Google Cloud Pub/Sub
    notifications for a change in listing state. [More
    Info](/my-business/reference/rest/v4/Notifications#NotificationType).

## v4.4

### New Features

Verifications of Local Service Businesses
:   Local service businesses can now be
    verified by the API. [More
    Info](/my-business/reference/rest/v4/accounts.locations/fetchVerificationOptions).

Follower Count
:   You can now retrieve metadata about followers.

    [More Info](/my-business/reference/rest/v4/accounts.locations.followers).

User Groups and Location Groups
:   User groups and location groups can now be
    created through the API. [More
    Info](/my-business/reference/rest/v4/accounts/create)

Addition of `hasPendingEdits` field in LocationState
:   Indicates whether a
    Location's properties are in the edit pending state. [More
    Info](/my-business/reference/rest/v4/accounts.locations#Location.LocationState)

### Behavior Changes

Open Date
:   You can now set an opening date in the future for a listing.

`PointRadius`
:
[PointRadius](/my-business/reference/rest/v4/accounts.locations#Location.PointRadius)
is now read-only. Edits or creation of local service businesses will require
using [Places](/my-business/reference/rest/v4/accounts.locations#places).

## v4.3

### New features

Questions and Answers APIs
:   Retrieve questions, post answers, and provide
    frequently asked questions on your business locations. [More
    Info](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.questions).

Bulk-Read Reviews
:   Retrieve reviews for multiple locations in a single call.

    [More
    Info](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/batchGetReviews).

Recommended GoogleLocations
:   See unclaimed locations that Google thinks might
    be owned by you. [More
    Info](https://developers.google.com/my-business/reference/rest/v4/accounts/listRecommendGoogleLocations).

Report GoogleLocation Issues
:   Report issues with either
    `RecommendedGoogleLocations` or `GoogleLocations` results. [More
    Info](https://developers.google.com/my-business/reference/rest/v4/googleLocations/report).

Service Enum for `PriceList` sections
:   Identify a `PriceList` section as either
    containing FOOD items or SERVICES provided. [More
    Info](https://developers.google.com/my-business/reference/rest/v4/accounts.locations#Location.SectionType).

Media Description
:   Provide a caption when uploading new media.

    [More
    Info](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media).

`CHAINS_QUERIES` Insights
:   Retrieve the number of times a location was shown as
    a result of a search for the chain it belongs to. [More
    Info](https://developers.google.com/my-business/reference/rest/v4/Metric).

### Behaviour Changes

Notifications for Organization Accounts and Location Groups
:   Accounts
    configured for Pub/Sub notifications will now also receive those
    notifications for any listings contained in an Organization Account or
    Location Groups they are an administrator of.

`ListLocations` for Org Account and Location Groups
:   `accounts.locations.list`
    called with a User Group or Organization account now displays all locations
    that are accessible by that account.

## v4.2

### New features

Verification APIs
:   List and trigger available verification methods for
    unverified locations. [More
    Info](/my-business/reference/rest/v4/accounts.locations.verifications).

GoogleLocations API
:   Search for existing locations on Google to claim, or
    retrieve a link to request access claimed locations. [More
    Info](/my-business/reference/rest/v4/googleLocations).

Expanded Location Filters
:   Additional options for limiting the results returned
    from a
    [Locations.List](/my-business/reference/rest/v4/accounts.locations/list)
    call. [More
    Info](/my-business/content/location-data#filter_results_when_listing_locations).

Chain Membership
:   Indicate membership of a location as part of a chain (e.g.
    Walmart, Target, etc.). [More Info](/my-business/reference/rest/v4/chains).

Organization Information
:   Information for [Organization
    Accounts](https://www.google.com/business/partners/) will now display as
    part of Account objects. [More
    Info](/my-business/reference/rest/v4/accounts#Account.OrganizationInfo).

Reviewer Profile Photo
:   URLs for profile photos of reviewers are now included
    in the review object. [More
    Info](/my-business/reference/rest/v4/accounts.locations.reviews#Reviewer).

## v4.1

### New features

Customer Provided Media
:   You can now retrieve and view insights for user
    generated photos and video for locations you own and manage. [More
    Info](/my-business/reference/rest/v4/accounts.locations.media.customers).

Admin Management APIs
:   You can now list, accept, and decline account and
    location related invitations for your account. [More
    Info](/my-business/reference/rest/v4/accounts.invitations).

`Profile` (Merchant Provided Description)
:   Describe your business in your own
    voice and share with users the unique story of your business and offerings.
    [More Info](/my-business/reference/rest/v4/accounts.locations#profile).

`openingDate` Field
:   Provide the date that your location opened for business.

    [More Info](/my-business/reference/rest/v4/accounts.locations#openinfo).

Offer Type Posts
:   A new type of Post on Google, helping users find deals
    available at your locations. [More
    Info](/my-business/reference/rest/v4/accounts.locations.localPosts#localpostoffer).

## v4

### New features

Posts on Google
:   You can now create Posts on Google directly through the API.

Photo Upload
:   Photos can now be uploaded directly using the API in addition to
    the existing URL upload.

Notifications Filtering/Opt-in
:   You can now filter which notifications are sent
    to pubsub topics. Future notifications will use this mechanism to be opt-in
    rather than being sent to all users.

`UPDATED_REVIEW` Notifications
:   You can now subscribe to real-time
    notifications for updates to customer reviews.

Support for User Groups
:   Google My Business API now supports User Group type accounts.

### Backward-incompatible changes

- Photos, previously a field of `location` objects, are now a resource under
  location
  (`accounts/<var>account_ID</var>/locations/<var>location_ID</var>/photos`).
- Address field `Country` is now `region_code` and `sub_locality` is now
  `sublocality`.
- Previously deprecated `Ownership` field removed.
- Previously co-owners of accounts and locations were indistinguishable from
  primary owners through the API (all appeared as `OWNER`). Now primary owners
  will be given the `OWNER` role and other owners will be given the `CO_OWNER`
  role.
- `AccountType.BUSINESS` is now named `AccountType.LOCATION_GROUP`.
- When using a field mask for updating locations, provide `update_mask` in
  place of the existing `field_mask`.
- The category message used for `primary_category` and `additional_categories`
  no longer contains the human-readable form. Users should use the categories
  service of the Google My Business API to get translated, human-readable category
  names.

## v3.3

### New features

Structured Menus
:   You can now add, update, or delete:

    - Multiple menus on a given location
    - Include multiple menu sections within a menu
    - List menu items with name, description, price, and photos

## v3.2

### New features

Insights
:   You can now retrieve location insights and driving metrics through
    the API.

Notifications
:   You can now subscribe to real-time notifications for new Google
    Updates.

### Backward-incompatible changes

- The previously unused `languageCodes` and `platforms` fields of
  `UrlAttributeValue` have been removed.
- `SAME` in the deprecated Ownership enum now only applies if the location
  that this duplicates has the same primary owner. Previously, the behavior
  was based on a more complex ownership calculation.

## v3.1

### New features

Notifications
:   You can now subscribe to real-time notifications for new
    reviews.

Maps URLs
:   Google Maps URLs are included in location responses allowing users
    to link to Google Maps.

Location States
:   Additional Location States indicating when the listing is
    published, disabled, pending verification.

Reopen Flag
:   `canReopen` flag indicates permanently closed locations that can
    be reopened versus those that cannot.

Attributes
:   Support for URL and Enum attributes.

Category Endpoint
:   Get a list of supported categories by country and language
    (replaces CSV files).

## v3

### New features

Reviews
:   You can now retrieve and respond to business reviews through the API.

Attributes
:   Provide additional, category-specific information about locations.

Find Matching Location
:   Find and manually associate existing maps locations
    with your business location.

Transfer Location
:   New action on `Location :transfer`. Allows transferring a
    location from one account (business or personal) to another.

Preferred Photo
:   Indicate which photo you'd prefer to show up first in Google
    Maps and Search.

New Search Filters
:   New search filters include `any_google_updates`,
    `is_suspended`, and `is_duplicate`.

New Location States
:   Location states now also include `is_verified` and
    `needs_reverification`.

Photo URL Improvements
:   The API now accepts photo URLs without an image format
    suffix.

### Backward-incompatible changes

- You must now specify a `request_id` in [CreateLocation](/my-business/reference/rest/v4/accounts.locations/create)
  calls. This ID must be unique for each location; it helps prevent duplicate
  locations being created in your account. Attempts to create a location where
  the request ID matches a previously created location returns the
  existing location, and avoids creating a duplicate in your account.
- `business_hours` in [Location](/my-business/reference/rest/v4/accounts.locations#locationstate)
  has been renamed to `regular_hours`.
