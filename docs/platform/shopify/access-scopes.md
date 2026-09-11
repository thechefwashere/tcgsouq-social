---
title: "Access scopes"
source: "https://shopify.dev/docs/api/usage/access-scopes"
final_url: "https://shopify.dev/docs/api/usage/access-scopes"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "de1f7c79ade235bf60182e5c30f08e0fa2a7902d27321bcefcb9cd0cee6e1784"
---

All apps need to request access to specific store data during the app authorization process. This guide provides a list of available access scopes for the GraphQL Admin, Storefront, Payment Apps APIs, and Customer Account APIs.

---

## [Anchor to How it works](/docs/api/usage/access-scopes#how-it-works)How it works

Tip

For more information on how to configure your access scopes, refer to [app configuration](/docs/apps/build/cli-for-apps/app-configuration) and [manage access scopes](/docs/apps/build/authentication-authorization/manage-access-scopes).

**Tip:**

For more information on how to configure your access scopes, refer to [app configuration](/docs/apps/build/cli-for-apps/app-configuration) and [manage access scopes](/docs/apps/build/authentication-authorization/manage-access-scopes).

After you've [generated API credentials](/docs/apps/build/authentication-authorization/manage-credentials), your app needs to [be authorized to access store data](/docs/apps/build/authentication-authorization).

Authorization is the process of giving permissions to apps. Users can authorize Shopify apps to access data in a store. For example, an app might be authorized to access orders and product data in a store.

An app can request authenticated or unauthenticated access scopes. Any permission to write a resource includes permission to read it, so request the write scope only when your app needs both.

| Scope type | Description | Example use cases |
| --- | --- | --- |
| [Authenticated](#authenticated-access-scopes) | Controls access to resources in the [GraphQL Admin API](/docs/api/admin-graphql), [Web Pixel API](/docs/api/web-pixels-api), and [Payments Apps API](/docs/api/payments-apps).   Authenticated access is intended for interacting with a store on behalf of a user. | - Creating products - Managing discount codes |
| [Unauthenticated](#unauthenticated-access-scopes) | Controls an app's access to [Storefront API](/docs/api/storefront) objects.   Unauthenticated access is intended for interacting with a store on behalf of a customer. | - Viewing products - Initiating a checkout |
| [Customer](#customer-access-scopes) | Controls an app's access to [Customer Account API](/docs/api/customer) objects.   Customer access is intended for interacting with data that belongs to a customer. | - Viewing orders - Updating customer details |

---

## [Anchor to Authenticated access scopes](/docs/api/usage/access-scopes#authenticated-access-scopes)Authenticated access scopes

This section describes the authenticated access scopes that your app can request. In the table, access to some resources are marked with **permissions required**. In these cases, you must [request specific permission](#requesting-specific-permissions) to access data from the user in your Partner Dashboard.

Info

To assign scopes to an existing admin-created custom app, see [access scopes for admin-created custom apps](/docs/apps/build/authentication-authorization/legacy/admin-custom-apps#permissions-required-to-assign-scopes). For a new app, [declare the scopes it needs](/docs/apps/build/authentication-authorization/cli-app-authentication#customize-your-access-scopes) and deploy your app. Merchants approve the scopes when they install it.

**Info:**

To assign scopes to an existing admin-created custom app, see [access scopes for admin-created custom apps](/docs/apps/build/authentication-authorization/legacy/admin-custom-apps#permissions-required-to-assign-scopes). For a new app, [declare the scopes it needs](/docs/apps/build/authentication-authorization/cli-app-authentication#customize-your-access-scopes) and deploy your app. Merchants approve the scopes when they install it.

Authenticated access scopes

| Scope | Access |
| --- | --- |
| `read_all_orders` | All relevant [orders](/docs/api/admin-graphql/latest/objects/Order) rather than the default window of orders created within the last 60 dayspermissions required  This access scope is used in conjunction with existing order scopes, for example `read_orders` or `write_orders`.  You need to [request permission for this access scope](#orders-permissions) from your Partner Dashboard before adding it to your app. |
| `read_analytics_annotations`,  `write_analytics_annotations` | `AnalyticsAnnotation`  Available as of API version `2026-10`. |
| `write_app_proxy` | Allows your app to use [app proxies](/docs/apps/build/online-store/display-dynamic-data). |
| `read_assigned_fulfillment_orders`,  `write_assigned_fulfillment_orders`,  `read_merchant_managed_fulfillment_orders`,  `write_merchant_managed_fulfillment_orders`,  `read_third_party_fulfillment_orders`,  `write_third_party_fulfillment_orders`,  `read_marketplace_fulfillment_orders` | `FulfillmentOrder`  As of API version 2024-10, `write_third_party_fulfillment_orders` will no longer allow [order management apps](/docs/apps/build/orders-fulfillment/order-management-apps) to create fulfillments for fulfillment orders that have been assigned to a different fulfillment service app. |
| `read_cart_transforms`,  `write_cart_transforms` | `CartTransform` |
| `read_checkout_branding_settings`,  `write_checkout_branding_settings` | `CheckoutBranding` |
| `read_checkout_and_accounts_configurations`,  `write_checkout_and_accounts_configurations` | `CheckoutAndAccountsConfiguration` |
| `read_content`,  `write_content`,  `read_online_store_pages` | `Article`, `Blog`, `Comment`, `Page` |
| `read_customer_events`,  `write_pixels` | [Web Pixels API](/docs/api/web-pixels-api) |
| `read_customer_merge`,  `write_customer_merge` | `CustomerMergePreview`, `CustomerMergeRequest` |
| `read_customer_payment_methods` | `CustomerPaymentMethod`permissions required  You need to [request permission for this access scope](#subscription-apis-permissions) from your Partner Dashboard before adding it to your app. |
| `read_customers`,  `write_customers` | `Customer`, `Segment`, `Company`, `CompanyLocation` |
| `read_delivery_customizations`,  `write_delivery_customizations` | `DeliveryCustomization` |
| `read_discounts`,  `write_discounts` | [Discounts features](/docs/apps/build/discounts) |
| `read_draft_orders`,  `write_draft_orders` | `DraftOrder` |
| `read_files`,  `write_files` | `GenericFile` |
| `read_fulfillments`,  `write_fulfillments` | `FulfillmentService` |
| `read_gift_cards`,  `write_gift_cards` | `GiftCard` |
| `read_inventory`,  `write_inventory` | `InventoryLevel`, `InventoryItem` |
| `read_inventory_shipments`,  `write_inventory_shipments` | `InventoryShipment`, `InventoryShipmentLineItem`, `InventoryShipmentTracking` |
| `read_inventory_shipments_received_items`,  `write_inventory_shipments_received_items` | Received items on an `InventoryShipment`. `write_inventory_shipments_received_items` authorizes the [`inventoryShipmentReceive`](/docs/api/admin-graphql/latest/mutations/inventoryShipmentReceive) mutation. Received quantities are returned on `InventoryShipment` and `InventoryShipmentLineItem`, which `read_inventory_shipments` grants access to. |
| `read_inventory_transfers`,  `write_inventory_transfers` | `InventoryTransfer`, `InventoryTransferLineItem` |
| `read_legal_policies` | `ShopPolicy` |
| `read_locales`,  `write_locales` | `ShopLocale` |
| `read_locations`,  `write_locations` | `Location` |
| `read_markets`,  `write_markets` | `Market` |
| `read_marketing_events`,  `write_marketing_events` | `MarketingEvent`, `MarketingActivity` |
| `read_merchant_approval_signals` | `MerchantApprovalSignals` |
| `read_metaobject_definitions`,  `write_metaobject_definitions` | `MetaobjectDefinition` |
| `read_metaobjects`,  `write_metaobjects` | `Metaobject` |
| `read_online_store_navigation`  `write_online_store_navigation` | `UrlRedirect` |
| `read_order_edits`,  `write_order_edits` | `CalculatedOrder`, `DeliveryCarrierService` |
| `read_orders`,  `write_orders` | `AbandonedCheckout`, `Fulfillment`, `Order`, `OrderTransaction`, `DeliveryCarrierService` |
| `read_own_subscription_contracts`,  `write_own_subscription_contracts` | GraphQL Admin API `SubscriptionContract`permissions requiredCustomer Account API `SubscriptionContract`permissions required  You need to [request permission for these access scopes](#subscription-apis-permissions) from your Partner Dashboard before adding them to your app. |
| `read_payment_customizations`,  `write_payment_customizations` | `PaymentCustomization` |
| `read_payment_gateways`,  `write_payment_gateways` | Payments Apps API `PaymentsAppConfiguration` |
| `read_payment_mandate`,  `write_payment_mandate` | `PaymentMandate` |
| `write_payment_sessions` | Payments Apps API `PaymentSession`, `CaptureSession`, `RefundSession`, `VoidSession` |
| `read_payment_terms`,  `write_payment_terms` | `PaymentSchedule`, `PaymentTerms` |
| `read_price_rules`,  `write_price_rules` | `PriceRule` |
| `write_privacy_settings`,  `read_privacy_settings` | `CookieBanner`, `PrivacySettings` |
| `read_products`,  `write_products` | `Product`, `ProductVariant`, `Collection`, `ResourceFeedback`,  `SellingPlan` (also requires `read_purchase_options` or `read_own_subscription_contracts` for queries, and `write_purchase_options` or `write_own_subscription_contracts` for mutations) |
| `read_reports`,  `write_reports` | `shopifyqlQuery`, `AnalyticsTarget`  `AnalyticsTarget` is available as of API version `2026-10`. |
| `read_returns`,  `write_returns` | `Return` |
| `read_script_tags`,  `write_script_tags` | `ScriptTag` |
| `read_shipping`,  `write_shipping` | `DeliveryCarrierService` |
| `read_shopify_payments_disputes` | `ShopifyPaymentsDispute` |
| `read_shopify_payments_dispute_evidences`,  `write_shopify_payments_dispute_evidences` | `ShopifyPaymentsDisputeEvidence`, `ShopifyPaymentsDisputeFileUpload`permissions required  You need to [request permission for these access scopes](#shopify-payments-dispute-evidence-permissions) from Shopify before adding them to your app. |
| `read_shopify_payments_dispute_file_uploads`,  `write_shopify_payments_dispute_file_uploads` | Dispute file upload endpoints of the REST Admin API permissions required  You need to [request permission for these access scopes](#shopify-payments-dispute-evidence-permissions) from Shopify before adding them to your app. |
| `read_shopify_payments_payouts` | `ShopifyPaymentsPayout`, `ShopifyPaymentsBalanceTransaction` |
| `read_store_credit_accounts` | `StoreCreditAccount` |
| `read_store_credit_account_transactions`,  `write_store_credit_account_transactions` | `StoreCreditAccountDebitTransaction`, `StoreCreditAccountCreditTransaction` |
| `read_themes`,  `write_themes` | `OnlineStoreTheme` |
| `read_translations`,  `write_translations` | `TranslatableResource`, `Translation` |
| `read_users` | `StaffMember`shopify plus |
| `read_validations`,  `write_validations` | `Validation` |

### [Anchor to Requesting specific permissions](/docs/api/usage/access-scopes#requesting-specific-permissions)Requesting specific permissions

Follow the procedures below to request specific permissions for access scopes. Most permissions are requested in the Partner Dashboard, but some require contacting Shopify Support.

#### [Anchor to Orders permissions](/docs/api/usage/access-scopes#orders-permissions)Orders permissions

By default, you have access to the last 60 days' worth of orders for a store. To access all the orders, you need to request access to the `read_all_orders` scope from the user:

1. From the Partner Dashboard, go to [**Apps**](https://partners.shopify.com/current/apps).
2. Click the name of your app.
3. Click **API access**.
4. In the **Access requests** section, on the **Read all orders scope** card, click **Request access**.
5. On the **Orders** page that opens, describe your app and why you're applying for access.
6. Click **Request access**.

If Shopify approves your request, then you can add the `read_all_orders` scope to your app along with `read_orders` or `write_orders`.

#### [Anchor to Subscription APIs permissions](/docs/api/usage/access-scopes#subscription-apis-permissions)Subscription APIs permissions

Subscription apps let users sell subscription products that generate multiple orders on a specific billing frequency.

With subscription products, the app user isn't required to get customer approval for each subsequent order after the initial subscription purchase. As a result, your app needs to request the required protected access scopes to use Subscription APIs from the app user:

1. From the Partner Dashboard, go to [**Apps**](https://partners.shopify.com/current/apps).
2. Click the name of your app.
3. Click **API access**.
4. In the **Access requests** section, on the **Access Subscriptions APIs** card, click **Request access**.
5. On the **Subscriptions** page that opens, describe why you're applying for access.
6. Click **Request access**.

If Shopify approves your request, then you can add the `read_customer_payment_methods` and `write_own_subscription_contracts` scopes to your app. If you're using the Customer Account API, you can add the `customer_read_own_subscription_contracts` or `customer_write_own_subscription_contracts` scopes.

#### [Anchor to Shopify Payments dispute evidence permissions](/docs/api/usage/access-scopes#shopify-payments-dispute-evidence-permissions)Shopify Payments dispute evidence permissions

The `read_shopify_payments_dispute_evidences`, `write_shopify_payments_dispute_evidences`, `read_shopify_payments_dispute_file_uploads`, and `write_shopify_payments_dispute_file_uploads` scopes are restricted. Shopify grants these scopes to individual apps. To be eligible:

- Your app must use [public distribution](/docs/apps/launch/distribution/select-distribution-method)
- Dispute or chargeback management must be a core part of what your app does. Apps outside the dispute space aren't granted these scopes

You can't add these scopes to your app configuration until Shopify approves your app for them. If you declare one before approval, then creating an app version fails with an `app_access` validation error on `scopes`.

To request access, [contact Shopify Support](https://partners.shopify.com/current/support/) and describe your app and why it needs to read or submit dispute evidence.

#### [Anchor to Protected customer data permissions](/docs/api/usage/access-scopes#protected-customer-data-permissions)Protected customer data permissions

By default, apps don't have access to any protected customer data. To access protected customer data, you must meet our [protected customer data requirements](/docs/apps/launch/protected-customer-data#requirements). You can add the relevant scopes to your app, but the API won't return data from non-development stores until your app is configured and approved for protected customer data use.

---

## [Anchor to Unauthenticated access scopes](/docs/api/usage/access-scopes#unauthenticated-access-scopes)Unauthenticated access scopes

Unauthenticated access scopes provide apps with read-only access to the [Storefront API](/docs/api/storefront). Unauthenticated access is intended for interacting with a store on behalf of a customer. For example, an app might need to do one or more of following tasks:

- Read products and collections
- Create customers and update customer accounts
- Query international prices for products and orders
- Interact with a cart during a customer's session
- Initiate a checkout

### [Anchor to Request scopes](/docs/api/usage/access-scopes#request-scopes)Request scopes

To request unauthenticated access scopes for an app, select them when you [generate API credentials](/docs/apps/build/authentication-authorization/manage-credentials) or [change granted access scopes](/docs/apps/build/authentication-authorization/manage-access-scopes).

To request access scopes or permissions for the Headless channel, refer to [managing the Headless channel](/docs/storefronts/headless/building-with-the-storefront-api/manage-headless-channels#request-storefront-permissions).

You can request the following unauthenticated access scopes:

Unauthenticated access scopes

| Scope | Access |
| --- | --- |
| `unauthenticated_read_checkouts`, `unauthenticated_write_checkouts` | [Cart](/docs/api/storefront/latest/objects/cart) object |
| `unauthenticated_read_customers`, `unauthenticated_write_customers` | [Customer](/docs/api/storefront/latest/objects/customer) object |
| `unauthenticated_read_customer_tags` | `tags` field on the [Customer](/docs/api/storefront/latest/objects/customer) object |
| `unauthenticated_read_content` | Storefront content, such as [Article](/docs/api/storefront/latest/objects/article), [Blog](/docs/api/storefront/latest/objects/blog), and [Comment](/docs/api/storefront/latest/objects/comment) objects |
| `unauthenticated_read_metaobjects` | View metaobjects, such as [Metaobject](/docs/api/storefront/latest/objects/metaobject) |
| `unauthenticated_read_product_inventory` | `quantityAvailable` field on the [ProductVariant](/docs/api/storefront/latest/objects/productvariant) object and `totalAvailable` field on the [Product](/docs/api/storefront/latest/objects/product) object |
| `unauthenticated_read_product_listings` | [Product](/docs/api/storefront/latest/objects/product) and [Collection](/docs/api/storefront/latest/objects/collection) objects |
| `unauthenticated_read_product_pickup_locations` | [Location](/docs/api/storefront/latest/objects/location) and [StoreAvailability](/docs/api/storefront/latest/objects/storeavailability) objects |
| `unauthenticated_read_product_tags` | `tags` field on the [Product](/docs/api/storefront/latest/objects/product) object |
| `unauthenticated_read_selling_plans` | Selling plan content on the [Product](/docs/api/storefront/latest/objects/product) object |

---

## [Anchor to Customer access scopes](/docs/api/usage/access-scopes#customer-access-scopes)Customer access scopes

Customer access scopes provide apps with read and write access to the [Customer Account API](/docs/api/customer). Customer access is intended for interacting with data that belongs to a customer. For example, an app might need to do one or more of following tasks:

- Read customers orders
- Update customer accounts
- Create and update customer addresses
- Read shop, customer or order metafields

### [Anchor to Request scopes](/docs/api/usage/access-scopes#request-scopes)Request scopes

To request access scopes or permissions for the Headless or Hydrogen channel, refer to [managing permissions](/docs/storefronts/headless/building-with-the-customer-account-api/getting-started#step-2-configure-customer-account-api-access).

You can request the following customer access scopes:

Customer access scopes

| Scope | Access |
| --- | --- |
| `customer_read_customers`, `customer_write_customers` | [Customer](/docs/api/customer/latest/objects/Customer) object |
| `customer_read_orders`, `customer_write_orders` | [Order](/docs/api/customer/latest/objects/Order) object |
| `customer_read_draft_orders` | [Draft Order](/docs/api/customer/latest/objects/DraftOrder) object |
| `customer_read_markets` | [Market](/docs/api/customer/latest/objects/Market) object |
| `customer_read_metaobjects` | [Metaobject](/docs/api/customer/unstable/objects/metaobject) object |
| `customer_read_store_credit_accounts` | [Store Credit Account](/docs/api/customer/latest/objects/StoreCreditAccount) object |
| `customer_read_own_subscription_contracts`, `customer_write_own_subscription_contracts` | [Subscription Contract](/docs/api/customer/latest/objects/SubscriptionContract) object for records that belong to your app |
| `customer_write_subscription_contracts` | [Subscription Contract](/docs/api/customer/latest/objects/SubscriptionContract) object for all records. Only available for Hydrogen and Headless storefronts |
| `customer_read_companies`, `customer_write_companies` | [Company](/docs/api/customer/latest/objects/Company) object |
| `customer_read_locations`, `customer_write_locations` | [Company Location](/docs/api/customer/latest/objects/CompanyLocation) object |

---

## [Anchor to Checking granted access scopes](/docs/api/usage/access-scopes#checking-granted-access-scopes)Checking granted access scopes

You can check your app's granted access scopes using the [`appInstallation`](/docs/api/admin-graphql/latest/queries/appInstallation?example=Get+the+access+scopes+associated+with+the+app+installation) query in the GraphQL Admin API.

---

## [Anchor to Limitations](/docs/api/usage/access-scopes#limitations)Limitations

- Apps should request only the minimum amount of data that's necessary for an app to function when using a Shopify API. Shopify restricts access to scopes for apps that don't require legitimate use of the associated data.
- Only [public or custom apps](/docs/apps/launch/distribution) are granted access scopes. Legacy app types, such as private or unpublished, won't be granted new access scopes.

---

Was this page helpful?
