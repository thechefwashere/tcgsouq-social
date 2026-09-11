---
title: "App distribution types"
source: "https://shopify.dev/docs/apps/launch/distribution"
final_url: "https://shopify.dev/docs/apps/launch/distribution"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "c1c21cf031907fab2d2076682bbff21531f2a96304e89a7f9a4693d93ca729bd"
---

After you've added features to your app, you need to decide how to distribute it to merchants.

The way you choose to distribute your app depends on its purpose and your audience. You can't change the distribution method after you select it, so make sure that you understand the different capabilities and requirements of each type.

---

## [Anchor to Capabilities and requirements](/docs/apps/launch/distribution#capabilities-and-requirements)Capabilities and requirements

The following table shows the capabilities and requirements that are associated with each distribution method:

| Distribution model | Number of stores | App type | Authorization or authentication method | Approval required | Limitations |
| --- | --- | --- | --- | --- | --- |
| [Public distribution](/docs/apps/launch/app-store-review) | Can be installed on multiple Shopify stores | Public | - If embedded, [token exchange](/docs/apps/build/authentication-authorization/cli-app-authentication) - If not embedded, the [authorization code grant](/docs/apps/build/authentication-authorization/authenticate-standalone-apps) - See [choosing an approach](/docs/apps/build/authentication-authorization#choosing-an-approach) for all options | [Yes](/docs/apps/launch/shopify-app-store/best-practices) | Must [sync certain data](https://www.shopify.com/legal/api-terms) with Shopify |
| [Custom distribution](/docs/apps/launch/distribution/select-distribution-method#install-a-custom-app-on-multiple-stores) | Installed on a single Shopify store, on multiple stores that belong to the same Plus organization, or on [transfer-disabled development stores](/docs/apps/build/stores/development-stores#limitations) | Custom | - If your app is embedded, then use [token exchange](/docs/apps/build/authentication-authorization/cli-app-authentication) - If your app isn't embedded, then use [authorization code grant](/docs/apps/build/authentication-authorization/authenticate-standalone-apps) - See [choosing an approach](/docs/apps/build/authentication-authorization#choosing-an-approach) for all options | No | Can't charge merchants through [Shopify's app billing system](/docs/apps/launch/billing) |
| Shopify admin (no longer available for new apps) | Installed on a single Shopify store | Custom | [Pre-generated Admin API access token](/docs/apps/build/authentication-authorization/legacy/admin-custom-apps) | No | - Can't be created anymore, though existing apps keep working - Can't use [Shopify App Bridge](/docs/api/app-home) to display in the Shopify admin - Can't use [app extensions](/docs/apps/build/app-extensions) - Can't charge merchants through [Shopify's app billing system](/docs/apps/launch/billing) |

Note

Checkout apps and extensions have [design requirements](/docs/apps/launch/app-requirements-checklist#design-requirements-for-checkout-apps) that apply to custom apps as well as public apps. Be sure that your app meets [all requirements](/docs/apps/launch/app-requirements-checklist) for its functionality and distribution type.

**Note:**

Checkout apps and extensions have [design requirements](/docs/apps/launch/app-requirements-checklist#design-requirements-for-checkout-apps) that apply to custom apps as well as public apps. Be sure that your app meets [all requirements](/docs/apps/launch/app-requirements-checklist) for its functionality and distribution type.

### [Anchor to Requesting a content size limit exception](/docs/apps/launch/distribution#requesting-a-content-size-limit-exception)Requesting a content size limit exception

Theme app extensions are subject to [file and content size limits](/docs/apps/build/online-store/theme-app-extensions/configuration#file-and-content-size-limits). If your app uses [custom distribution](/docs/apps/launch/distribution/select-distribution-method), or your app has been granted [Built for Shopify](/docs/apps/launch/built-for-shopify) status in the Shopify App Store, then you can request an exception to the 100 KB Liquid size limit for a theme app extension. File an exemption request [using this form](https://forms.gle/rTvBRBPHjxdNFSbHA).

Increasing your app's Liquid size could potentially impact its performance. Regular monitoring and optimization is advised.

---

## [Anchor to Deprecated app types](/docs/apps/launch/distribution#deprecated-app-types)Deprecated app types

The following app types can no longer be created:

- **Private apps**: Deprecated as of January 2022. A private app was a type of app that one merchant could install directly on their store. If you want to create an app specifically for one merchant's store, then you can create a custom app instead. As of January 20, 2023, all private apps have been automatically migrated and converted to custom apps.
- **Unpublished apps**: Deprecated as of December 9, 2019. An unpublished app was a type of public app that one or many merchants could install and had all the same functionality as other public apps. However, the app didn't require any approval from Shopify.

---

## [Anchor to Next steps](/docs/apps/launch/distribution#next-steps)Next steps

[Learn how to select a distribution method](/docs/apps/launch/distribution/select-distribution-method).

---

Was this page helpful?
