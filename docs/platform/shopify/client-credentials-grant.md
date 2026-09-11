---
title: "Client credentials grant"
source: "https://shopify.dev/docs/apps/build/authentication-authorization/client-credentials-grant"
final_url: "https://shopify.dev/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "d0b300bf2f0e9e0cebde06b4ad9ae14adbfda90b79ed50f40cad6f3fad6f12a8"
---

This tutorial shows how to use the [client credentials grant](/docs/apps/build/authentication-authorization/access-tokens#client-credentials-grant) to get access tokens for a server-side app acting on stores in your own Shopify organization. Of the three grants, it takes the least setup: your app exchanges its own client ID and secret for a token, with no redirect flow to implement.

With a client credentials grant, you won't see a token in the Shopify admin. Instead, you request tokens programmatically when you need them.

Info

If you're building apps for other merchants, use [Shopify CLI](/docs/apps/build/cli-for-apps), which handles authentication automatically. To learn how authentication works for other common approaches, see [About app authentication](/docs/apps/build/authentication-authorization).

**Info:**

If you're building apps for other merchants, use [Shopify CLI](/docs/apps/build/cli-for-apps), which handles authentication automatically. To learn how authentication works for other common approaches, see [About app authentication](/docs/apps/build/authentication-authorization).

## [Anchor to What you'll learn](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#what-youll-learn)What you'll learn

In this tutorial, you'll learn how to do the following tasks:

- Find your app credentials in the Dev Dashboard
- Exchange credentials for an access token programmatically
- Use the access token to call Shopify APIs

## Requirements

[Dev Dashboard app](/docs/apps/build/dev-dashboard/create-apps-using-dev-dashboard)

You've created an app in the Dev Dashboard.

[Access scopes](/docs/apps/build/dev-dashboard/create-apps-using-dev-dashboard#step-2-create-a-version)

You've selected the access scopes your app needs on your app's version in the Dev Dashboard.

[Installed app](/docs/apps/build/dev-dashboard/create-apps-using-dev-dashboard#step-3-install-your-app)

You've installed your app on your store.

## Project

Language:

Node.js Python cURL 

Node.js

[View on GitHub](https://github.com/Shopify/example-auth--client-credentials-grant)

## [Anchor to Get your credentials](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#get-your-credentials)Get your credentials

Find your **Client ID** and **Client secret** in the Dev Dashboard. These credentials identify your app when requesting access tokens.

Caution

Keep your Client secret secure. Set it as an environment variable rather than putting it in a file you might commit, and never commit secrets to version control. In production, read it from your platform's environment configuration or a secret manager.

**Caution:**

Keep your Client secret secure. Set it as an environment variable rather than putting it in a file you might commit, and never commit secrets to version control. In production, read it from your platform's environment configuration or a secret manager.

### [Anchor to Locate your credentials](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#locate-your-credentials)Locate your credentials

1. Open your app in the [Dev Dashboard](https://dev.shopify.com/dashboard/).
2. Go to **Settings**.
3. Copy your **Client ID** and **Client secret**.

[About the Dev Dashboard](/docs/apps/build/dev-dashboard)

[About the Dev Dashboard](/docs/apps/build/dev-dashboard)

## [Anchor to Set your credentials as environment variables](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#set-your-credentials-as-environment-variables)Set your credentials as environment variables

Keep your credentials out of your code so that you can't commit them and can use different values per environment.

### [Anchor to Add your credentials](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#add-your-credentials)Add your credentials

The example code reads three variables from the environment. `SHOPIFY_SHOP` is your store's `myshopify.com` subdomain, without `.myshopify.com`:

1

2

3

export SHOPIFY\_SHOP=your-store

export SHOPIFY\_CLIENT\_ID=your-client-id

export SHOPIFY\_CLIENT\_SECRET=your-client-secret

The examples also read a `.env` file when one is present, and environment variables take precedence over it. If you use a `.env` file, add it to your `.gitignore`.

## [Anchor to Request an access token](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#request-an-access-token)Request an access token

Use your credentials to make a programmatic request to Shopify's token endpoint.

### [Anchor to Exchange credentials for a token](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#exchange-credentials-for-a-token)Exchange credentials for a token

The code reads your credentials from the environment and exchanges them for an access token. Tokens expire after 24 hours, so the example caches the token and refreshes it before expiry rather than requesting a new one per call.

---

Token response format

1

2

3

4

5

{

"access\_token": "f85632530bf277ec9ac6f649fc327f17",

"scope": "read\_products",

"expires\_in": 86399

}

- `access_token`: The token to include in API requests. Store this securely.
- `scope`: The [access scopes](/docs/api/usage/access-scopes) granted to your app. The token request doesn't ask for scopes, so this is a readback of what you selected on your app's version in the Dev Dashboard. If a scope you need is missing, [release a new version](/docs/apps/build/dev-dashboard/create-apps-using-dev-dashboard#step-2-create-a-version) with it and approve the change on the store.
- `expires_in`: Seconds until expiration. Always 86399 (24 hours).

---

Troubleshooting

##### [Anchor to [object Object], error](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#shop_not_permitted-error)`shop_not_permitted` error

**Problem:** You receive the error `Oauth error shop_not_permitted: Client credentials cannot be performed on this shop.`

**Solution:** The client credentials grant only works when the app and the store belong to the same Shopify organization. "Same organization" means both appear under the same org in the Dev Dashboard. Owning a store or having it installed doesn't automatically place it in your org.

To verify:

1. Open the [Dev Dashboard](https://dev.shopify.com/dashboard/) and click **Apps**. Confirm your app is listed.
2. Click **Dev stores** in the sidebar and confirm your target store appears in the list. If the store isn't listed, it's not in this organization.
3. Check that your `SHOPIFY_SHOP` value matches the store's `*.myshopify.com` subdomain exactly (without `.myshopify.com`).

Common causes:

- **Dev store created outside the Dev Dashboard:** If you created a dev store from the Shopify admin rather than from the Dev Dashboard, it won't be in your org. Create a new dev store from the **Dev stores** page in the Dev Dashboard instead.
- **Multiple organizations:** If you have access to more than one organization, the app and store might be in different ones. Check the organization ID in the URL (`dev.shopify.com/dashboard/<org-id>`) and verify both the app and store are under the same one.
- **Acting on another organization's stores:** Client credentials can't reach a store outside your organization, including a client's store. Distribute your app to that store with [custom distribution](/docs/apps/launch/distribution/select-distribution-method) so that a merchant installs it, then use [token exchange](/docs/apps/build/authentication-authorization/implement-token-exchange) if your app runs inside the Shopify admin, or the [authorization code grant](/docs/apps/build/authentication-authorization/authenticate-standalone-apps) if it runs outside. [Shopify CLI](/docs/apps/build/cli-for-apps) handles OAuth for you.

##### [Anchor to External tool asks you to "copy a token"](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#external-tool-asks-you-to-copy-a-token)External tool asks you to "copy a token"

**Problem:** Some external tools ask you to copy a token or provide a "Shopify API key." These tools expect the older authentication flow.

**Solution:** Contact the tool vendor about updating their integration to use OAuth.

##### [Anchor to "Invalid API key or access token" error](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#invalid-api-key-or-access-token-error)"Invalid API key or access token" error

**Problem:** You're sending your `client_id` or `client_secret` directly to the GraphQL Admin API.

**Solution:** First exchange your credentials for an `access_token` using the token endpoint, then use that token in your API requests.

## [Anchor to Make API requests](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#make-api-requests)Make API requests

Include the `access_token` in the `X-Shopify-Access-Token` header when calling Shopify APIs.

### [Anchor to Query the GraphQL Admin API](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#query-the-graphql-admin-api)Query the GraphQL Admin API

Use the access token to authenticate requests to any Shopify API. This example queries products using the GraphQL Admin API.

[GraphQL Admin API](/docs/api/admin-graphql)[Access scopes](/docs/api/usage/access-scopes)

[GraphQL Admin API](/docs/api/admin-graphql) [Access scopes](/docs/api/usage/access-scopes)

## [Anchor to Tutorial complete!](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#tutorial-complete)Tutorial complete!

You've successfully authenticated your Dev Dashboard app using the client credentials grant and made API requests.

### [Anchor to Next steps](/docs/apps/build/authentication-authorization/client-credentials-grant?lang=node#next-steps)Next steps

[Manage your credentials

Find your client ID and secret, secure them, and rotate your client secret.

Manage your credentials

Find your client ID and secret, secure them, and rotate your client secret.](/docs/apps/build/authentication-authorization/manage-credentials)

[Manage your credentials  
  

Find your client ID and secret, secure them, and rotate your client secret.](/docs/apps/build/authentication-authorization/manage-credentials)

[Manage access scopes

Find the scopes that common resources need, and where to declare them for a Dev Dashboard app.

Manage access scopes

Find the scopes that common resources need, and where to declare them for a Dev Dashboard app.](/docs/apps/build/authentication-authorization/manage-access-scopes)

[Manage access scopes  
  

Find the scopes that common resources need, and where to declare them for a Dev Dashboard app.](/docs/apps/build/authentication-authorization/manage-access-scopes)

[GraphQL Admin API

Start building with the GraphQL Admin API.

GraphQL Admin API

Start building with the GraphQL Admin API.](/docs/api/admin-graphql)

[GraphQL Admin API  
  

Start building with the GraphQL Admin API.](/docs/api/admin-graphql)

[Monitor app performance

Access logs and metrics to understand and optimize your app's performance.

Monitor app performance

Access logs and metrics to understand and optimize your app's performance.](/docs/apps/build/dev-dashboard/monitoring-and-logs)

[Monitor app performance  
  

Access logs and metrics to understand and optimize your app's performance.](/docs/apps/build/dev-dashboard/monitoring-and-logs)

Was this page helpful?
