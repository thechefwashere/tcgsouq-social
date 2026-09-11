---
title: "Cloud: manage OAuth app audience (testing vs production)"
source: "https://support.google.com/cloud/answer/15549945?hl=en"
final_url: "https://support.google.com/cloud/answer/15549945?hl=en"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "ca956312d6ccb958af75af2ffe48a8216ca7c1e892121242dd307bbcd47d2f03"
---

# Manage App Audience

The [audience setting](https://console.developers.google.com/auth/audience) is used to manage user groups that are allowed to authorize your application to access their data.

## User Type

The user type setting determines the target audience for your app

External

Projects configured with a user type of **External** are available to any user with a Google Account.

A user's ability to authorize your app's requested scopes are impacted by your project's [publishing status](#publishing-status).

Internal

Projects associated with [a Google Cloud Organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) can configure **Internal** users to limit authorization requests to members of the organization. For more information about migrating a project into a Google Cloud Organization resource, see [Migrating projects into an organization](https://cloud.google.com/resource-manager/docs/migrating-projects-billing).

User authorization of scopes associated with restricted Google Workspace services, including high-risk Gmail and Drive scopes, might require additional configuration by your organization's administrators. For more information, see the [Let Internal apps access restricted Google Workspace APIs](https://support.google.com/a/answer/7281227#homegrown) section of the **Control which third-party and internal apps access Google Workspace data** article.

An `org_internal` authorization error is displayed when authorization is requested from users outside the Google Cloud project's parent.

## Publishing status

The publishing status determines if your application is in test or production mode.

Testing

Projects configured with a publishing status of **Testing** are limited to up to 100 test users listed in the OAuth consent screen. A test user consumes a project's test user quota once added to the project.

Google will display a warning message before allowing a specified test user to authorize scopes requested by your project's OAuth clients. The warning message confirms the user has test access to your project but should consider the risks associated with granting access to their data to an unverified app.

Authorizations by a test user will expire seven days from the time of consent. If your OAuth client requests [an `offline` access type](https://developers.google.com/identity/protocols/oauth2/web-server#offline) and receives a refresh token, that token will also expire.

A [Brand Account](https://support.google.com/accounts/answer/7001996) may authorize scopes requested by your project's OAuth clients if a specified test user manages the Brand Account.

**The only exception to this behavior** is if your app requests a subset of the following: name, email address, and user profile (through the `userinfo.email, userinfo.profile, openid` scopes or their [OpenID Connect equivalents](https://developers.google.com/identity/protocols/oauth2/scopes#openid-connect)). For such requests, your users do not need to be in the trusted user list, they will not see a warning message, and their authorizations will not expire after 7 days. If your app uses Sign in with Google to authenticate users then this exception also applies. If your app requests any other OAuth scopes, then this exception does not apply.

A test user may be unable to authorize scopes requested by your project's OAuth clients due to the availability of Google Services for the account or configured restrictions. A [Google Workspace may control which third-party apps access its data](https://support.google.com/a/answer/7281227) or an account enrolled in [Advanced Protection may block most non-Google apps](https://support.google.com/accounts/answer/7539956#non-goog_apps).

In Production

Projects configured with a publishing status of **In production** are available to any user with a Google Account. A project's publishing status is considered **In production** after selecting the **Publish app** button. Your project's configuration may be subject to verification before its name and logo are displayed on an authorization screen or before it may request authorization of sensitive or restricted scopes.

Projects configured with a publishing status of **In production** should complete the verification process, including defining scopes actively requested by your project's OAuth clients, if it meets one or more of the OAuth verification criteria, as described in [Verification status](#verification-status).

Google will display an [Unverified apps](https://support.google.com/cloud/answer/7454865) warning message if your project's OAuth clients request authorization of scopes considered sensitive or restricted before your project has completed verification for those scopes.

## OAuth user cap

To protect users and Google systems from abuse, apps that use OAuth and Cloud Identity have certain quota restrictions based on the risk level of the OAuth scopes an app uses.

The user cap limits the number of users that can grant permission to your app when requesting unapproved sensitive or restricted scopes. The user cap applies over the entire lifetime of the project, and it cannot be reset or changed. Verified apps will still display the user cap on this page, but the user cap does not apply if you are requesting only approved sensitive or restricted scopes. If your users are seeing the ["unverified app" screen](https://support.google.com/cloud/answer/7454865)  , it is because your OAuth request includes additional scopes that haven't been approved.

The OAuth user quotas are summarized in the following table. These might be adjusted for specific apps based on the app history, developer reputation, and riskiness.

|  | Applicable apps | Quota | Appeal |
| --- | --- | --- | --- |
| New user cap | Apps that present the [unverified app screen](https://support.google.com/cloud/answer/7454865) to users | 100 new users in total, after the app presents the unverified app screen | [Request verification for your app](#verification) |

For more information, see the [OAuth Application Rate Limits](https://support.google.com/cloud/answer/9028764) page.

## Was this helpful?

How can we improve it?
