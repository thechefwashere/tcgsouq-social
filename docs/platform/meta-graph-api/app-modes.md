---
title: "App modes (development vs live)"
source: "https://developers.facebook.com/docs/development/build-and-test/app-modes"
final_url: "https://developers.facebook.com/documentation/development/build-and-test/app-modes"
platform: "meta-graph-api"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "fa26f579e2968d28ab01c504a9eceea3b02f457589e5b4df0abca70c60c136a1"
---

# App Modes



An app&#039;s mode determines who can use the app. App users can be broadly split into two groups: users who have a [role](https://developers.facebook.com/documentation/development/build-and-test/app-roles) on the app itself (**role users**) and those who do not (**non-role users**).

## Development Mode

Apps in Development mode can only request [permissions](https://developers.facebook.com/docs/permissions/reference) from [role](https://developers.facebook.com/documentation/development/build-and-test/app-roles) users, and only permissions with standard or advanced [access levels](https://developers.facebook.com/docs/graph-api/overview/access-levels). Similarly, [features](https://developers.facebook.com/docs/apps/features-reference) will only be active for role users, and only features with standard or advanced access levels.

Apps in Development mode cannot be searched for by the public through our tools and APIs, and if your app is eligible to be listed in the [App Center](https://developers.facebook.com/apps), it will be hidden.

Any data generated while an app is in Development mode, such as test posts, can only be seen by role users. However, that data will be visible to non-role users once the app is switched to [Live](#live-mode) mode.

All newly created apps start out in Development mode and should not be switched to Live mode until app development is complete.

## Live Mode

Apps in Live mode can request [permissions](https://developers.facebook.com/docs/permissions/reference) from anyone, but only permissions approved through [App Review](https://developers.facebook.com/docs/app-review). Similarly, only [features](https://developers.facebook.com/docs/apps/features-reference) approved through App Review are active for app users.

[Consumer](https://developers.facebook.com/documentation/development/create-an-app/app-dashboard/app-types) apps behave a little differently since they also rely on [access levels](https://developers.facebook.com/docs/graph-api/overview/access-levels). Consumer apps in Live mode can request permissions with Advanced Access from anyone, but permissions with Standard Access can only be requested from role users. Similarly, Advanced Access features are active for everyone, but Standard Access features are only active for [role](https://developers.facebook.com/documentation/development/build-and-test/app-roles) users.

Apps in Live mode can be searched for by anyone using our tools and APIs, and if eligible, can be listed in the [App Center](https://developers.facebook.com/apps).

You should only switch it to Live mode after you have completed app development and have completed App Review. Note that, data generated while in [Development](#development-mode) mode such as test posts will become visible to all app users once you switch.

## Switching Modes

App administrators can use the app mode toggle in the App Dashboard toolbar to switch between modes.

## See Also

* [Access Levels](https://developers.facebook.com/docs/graph-api/overview/access-levels)
* [Marketing API Access Levels Guide](https://developers.facebook.com/documentation/ads-commerce/marketing-api/get-started/authorization#access-levels)
