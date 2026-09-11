---
title: "FAQ"
source: "https://developers.google.com/my-business/content/faq"
final_url: "https://developers.google.com/my-business/content/faq"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "5e4b27beda3fd07fbba6d2051ad0f59033e3ad378cb211334969b04993743352"
---

# Frequently Asked Questions Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The Google Business Profile (GBP) APIs allow developers to build applications that manage business data across Google, requiring access approval based on legitimate business needs.
- Access to the GBP APIs is granted at the Google Cloud project level and does not automatically permit querying all business data; users must have specific access to individual GBP profiles.
- Various GBP APIs are available, such as Account Management, Business Information, and Lodging APIs, each offering specific functionalities like managing location access, updating business information, and handling lodging data.
- Third-party partners managing business listings should register for a GBP Organization account, utilize user and business groups, and understand authorization methods like OAuth and manager access.
- While there are quota limits for API usage, developers can request increases based on their needs and usage patterns, with the understanding that fake or test listings are not permitted in production environments.

Find answers to common questions about Google Business Profile APIs.

## What are GBP APIs?

The Business Profile APIs are programming interfaces that let developers write
applications to manage their Business Profile account and location data. The
APIs let merchants or their representatives to manage how their data is
presented across Google and control who co-manages their data. User-created
data, such as photos, posts, and reviews, can also be managed through the APIs.

The Business Profile APIs offer almost the same features as the Business
Profile user interface with some additional features specific to the APIs. Users
of the APIs can expect Google updates to occur just as they do for users of the
user interface.

## Who can get access to GBP APIs?

GBP APIs aren't open to the public. Users have to request access to GBP APIs to
use them. Any individual or company who can demonstrate legal business reason to
access GBP APIs are approved for access. A few recommendations to demonstrate
legality as a business are:

- Use a valid business email address that is tied to your business domain.
- Ensure that the business website is updated and live.

## Does having access to GBP APIs allow a user to query any Google Business Profile data?

No. Even if you get access to GBP APIs, you can't query a Google Business
Profile data unless you have [access to that particular Google Business Profile](https://support.google.com/business/answer/3403100).

## What are the relevant policies for GBP API users?

Partners need to be compliant with [Google Business Profile policies](https://support.google.com/business/answer/7667250)
along with all API
[policies](/my-business/content/policies)
and [terms and conditions](/my-business/content/terms).

## How do users get access to GBP API?

To successfully create your first client application, you must complete the
following prerequisites:

1. [Get a Google Account](/my-business/content/prereqs#get-account).
2. [Try out Business Profile](/my-business/content/prereqs#try-out).
3. [Create a project in the Google Cloud console](/my-business/content/prereqs#create-project).
4. [Request access to the API](/my-business/content/prereqs#request-access):
   Requests are reviewed within 14 days.

## How do users get access to a certain API within GBP API?

There are seven APIs associated with Business Profile that must be enabled in
the Google Cloud console:

- Google My Business API 4.9, that includes the following important feature API calls:
  - `FoodMenus`
  - `Media`
  - `Reviews`
  - `LocalPosts`
- My Business Account Management API
- My Business Lodging API
- My Business Place Actions API
- My Business Notifications API
- My Business Verifications API
- My Business Business Information API
- Business Profile Performance API

If a user's application to request access is approved, they are granted with a
standard default quota for all seven APIs.

## How does access to GBP API work?

GBP API access is granted on a Google Cloud project level. If a user A
has applied for Google Business Profile API access for project # - 12345678,
then access is granted to the project # - 12345678. As such any user including
user A with access to the Google Cloud project can make calls to the
Google Business Profile APIs. Partners must control access to the Google Cloud
project on a need to access basis to avoid abuse.

## Do you have a summary of the APIs and example capabilities?

Refer to the following table to know about different APIs and their
capabilities.

| **API** | **Reference documentation** | **Example capabilities** |
| --- | --- | --- |
| **Account Management API** | [Documentation](/my-business/reference/accountmanagement/rest) | - Manage access to a location. - Creates an account with the specified name and type under the given parent. - Lists all of the accounts for the authenticated user. - Lists pending invitations for the specified account. - Moves a location from an account that the user owns to another account. - Updates the administrator for the specified location. |
| **Business Information API** | [Documentation](/my-business/reference/businessinformation/rest) | - The Business Information API allows to manage profile lifecycle and add or manage business information on the GBP. - Allows merchants to get, create, update, or delete Google business profiles. - Allows merchants to get or update profile attributes. - Allows merchants to get or search for chains, profile categories. |
| **Lodging API** | [Documentation](/my-business/reference/lodging/rest) | - Allows management of lodging data, for example, property amenities, and policies for businesses on Google. The API is specific to businesses that provide lodging services, such as hotels. Lodging API allows developers to update lodging attributes of a Google Business Profile. |
| **Place Actions API** | [Documentation](/my-business/reference/placeactions/rest) | - Allows management of place action links on businesses. - Redirect users to perform actions such as book an appointment, make a table reservation, and order food delivery. |
| **Notifications API** | [Documentation](/my-business/reference/notifications/rest) | - Enables management of notification settings for specified accounts. |
| **Verifications API** | [Documentation](/my-business/reference/verifications/rest) | - Starts the verification process for a location. - Reports all eligible verification options for a location in a specific language. |
| **Business Profile Performance API** | [Documentation](/my-business/reference/performance/rest) | - Allows merchants to fetch performance insights about their business listing on Google. - Insights include business impressions, direction requests, call clicks, website clicks, bookings, food orders, menu interactions, and more. |
| **Media API** | [Documentation](/my-business/reference/rest/v4/accounts.locations.media) | - Allows API developers to upload photos and videos for a business profile. |
| **Reviews API** | [Documentation](/my-business/reference/rest/v4/accounts.locations.reviews) | - Allows merchants to get reviews and reply to reviews on a business profile. |
| **Local Posts API** | [Documentation](/my-business/reference/rest/v4/accounts.locations.localPosts) | - Allows merchants to get, create, or update local posts. |
| **FoodMenus API** | [Documentation](/my-business/reference/rest/v4/FoodMenus) | - Allows merchants to get, create, or update food menus for a business profile. |

For any questions about the data available to you or how to access the data,
fill this [form](//support.google.com/business/contact/dma_data_request).

## How can partners set up their account structure to use GBP APIs?

If you are a third-party partner who performs listing management for businesses:

- Register for a [GBP Organization account](https://support.google.com/business/answer/7353903) as an agency.
- Familiarize yourself with the concepts of [user groups](https://support.google.com/business/answer/7655731) and [business groups](https://support.google.com/business/answer/6085300).
- Refer to this [guide](/my-business/content/locations-setup)
  to understand how to manage locations on behalf of businesses.

## How do businesses give authorization to a GBP API partner to manage their business listing?

Businesses grant access to a 3P partner in two ways:

- **OAuth setup:** [Refer to this guide](/my-business/content/oauth-setup) 
  to understand how 3P partner platforms use merchant credentials to edit and
  access Google Business Profile data on behalf of the merchant or business.
- **Owner or manager access:** If a 3P partner is added as a manager of the
  Google Business Profile by the merchant, who should be the primary owner of the
  GBP, then the 3P partner need not use merchant credentials to use GBP APIs to
  edit and access GBP data.

  **Note:** We strongly recommend that 3P partners don't add themselves as
  owner of the GBP but only add themselves as manager.

## If a business has 10+ locations, is there a way to bulk verify?

Yes. You can [request bulk verification](https://support.google.com/business/answer/4490296)
for 10+ profiles. After verification, published chain locations can be managed
with the Business Profile APIs in the same manner as other locations are
managed, with some exceptions. For example, site managers are treated
differently, and they can add themselves to franchise locations.

## What are the quota limits for the various APIs?

The standard quota limits are listed in the [Usage limits](/my-business/content/limits).
If you need higher limits, you can submit a [standard quota request](https://docs.google.com/forms/d/e/1FAIpQLSenhlfSv_Gms-g5wtqcXHbGEXzI_08140cWwwSAtqtoUnm1ig/viewform).

## How much quota can I request?

Quota is a limited resource. GBP API support team determines your quota increase
request eligibility by confirming your past quota usage. If your average quota
usage is less than 70% of your current quota limits, you might be denied any
further increase in your quota limits.

## Can GBP API partners create a test account for prod?

No. Unfortunately, there's no direct way to create a fake GBP listing
in prod either through GBP UI or API and test against it.

Most of the fake listings that are created get flagged by our moderation and
suspended.
The advice is to either use a client listing and work with it after hours
(provided you don't change any primary information of the listing, such as
name, address, category) or you create a listing for your company headquarters.
If you want to test an API response to verify a listing or any other action that
requires a prod listing, then you can use [mock API responses](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mocking-with-examples/).
