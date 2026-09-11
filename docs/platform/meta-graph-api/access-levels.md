---
title: "Access levels (standard vs advanced)"
source: "https://developers.facebook.com/docs/graph-api/overview/access-levels"
final_url: "https://developers.facebook.com/docs/graph-api/overview/access-levels"
platform: "meta-graph-api"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "1c1f3e569b540b3c4ca5c07d8d2b291096a80c0865a1a2756f3e36ccf51f39f8"
---

# Access Levels

This document is only applicable to apps created using an App Type.

**[Advanced Access](https://developers.facebook.com/docs/graph-api/overview/access-levels/#advanced-access) now requires Business Verification**

As of February 1, 2023 apps requesting [advanced access](https://developers.facebook.com/docs/graph-api/overview/access-levels/#advanced-access) for permissions may have to be connected to a verified business. [See this blog post for more information.](https://developers.facebook.com/blog/post/2023/02/01/developer-platform-requiring-business-verification-for-advanced-access/)

Access levels are an additional layer of Graph API authorization that apply to [permissions](/docs/permissions/reference) and [features](/docs/apps/features-reference) for [Business](/docs/development/create-an-app/app-dashboard/app-types#business), [Consumer](/docs/development/create-an-app/app-dashboard/app-types#consumer), and [Gaming](/docs/development/create-an-app/app-dashboard/app-types#gaming-services) apps.

There are two access levels: [Standard](#standard-access) and [Advanced](#advanced-access). Apps can request permissions with Advanced Access from any app user, and features with Advanced Access are active for all app users. Permissions with Standard Access, however, can only be requested from app users who have a role on the requesting app, and features with Standard Access are only active for app users who have a role on the app.

If your app will only be used by people who have a role on it, the permissions and features your app requires will only need Standard Access. If your app will be used by people who do not have a role on it, the permissions and features that your app requires will need Advanced Access.

All Business, Consumer, and Gaming apps are automatically approved for Standard Access for all permissions and features. Advanced Access, however, must be approved on an individual permission and feature basis through the [App Review](/docs/app-review) process.

## Standard Access

[Permissions](/docs/permissions/reference) with Standard Access can only be requested from app users who have a [role](/docs/development/build-and-test/app-roles) on the requesting app. Similarly, [features](/docs/apps/features-reference) with Standard Access are only active for app users who have a role on the app.

[Business](/docs/development/create-an-app/app-dashboard/app-types#business), [Consumer](/docs/development/create-an-app/app-dashboard/app-types#consumer), and [Gaming](/docs/development/create-an-app/app-dashboard/app-types#gaming-services) apps are automatically approved for Standard Access for all permissions and features available to their app type.

Standard Access is intended for apps that will only be used by people who have roles on them, or used during app development, when testing API endpoints that the calling app has not been approved for.

## Advanced Access

[Permissions](/docs/permissions/reference) with Advanced Access can be requested from any app user, and [features](/docs/apps/features-reference) with Advanced Access are active for all app users. However, [Business Verification](https://developers.facebook.com/docs/development/release/business-verification) is required to get Advanced Access. In some cases additional [App Review](/docs/app-review) on an individual permission and feature basis might be required.

### Automatic Approval

Business and Gaming apps created before February 16, 2021 were automatically approved for Advanced Access for the [email](/docs/permissions/reference/email) and [public\_profile](/docs/permissions/reference/public_profile) permissions, as well as any permissions or features that were already approved through App Review, if they were using them.

All newly created Consumer apps are automatically approved for Advanced Access for the email and public\_profile permissions. However, both permissions are set to Standard Access by default and must be manually switched to Advanced Access. In addition, consumer apps must be in Live mode before they can request permissions with Advanced Access from non-role app users, and before features with Advanced Access will be active for non-role users.

## Data Use Checkup

Apps that have Advanced Access for a permission or feature must complete [Data Use Checkup](/docs/development/maintaining-data-access/data-use-checkup/), which is an annual process to certify that the app accesses Facebook APIs, products, and data in compliance with our [Platform Terms](/terms) and [Developer Policies](/devpolicy).

## Remove Access

If you want to signify that your app does not need a specific permission or feature, you can remove it by clicking the trash can icon alongside the permission or feature in the **App Review** > **Permissions and Features** panel. You can restore access to a removed permission or feature by searching for it again in the same panel and clicking its **Get Standard Access** button or **Get Advanced Access** button. Restoring Advanced Access to previously approved permissions or features does not require re-review.

All permissions and features can be removed except for [public\_profile](/docs/permissions/reference/public_profile).

## Changing Access Levels

App administrators can change access levels for individual permissions and features. Restoring Advanced Access to permissions and features does not require [re-review](/docs/app-review), but changing from Advanced to Standard will invalidate/deactivate any permission/feature for any app users who do not have a role on your app.
