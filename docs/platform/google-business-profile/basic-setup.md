---
title: "Basic setup"
source: "https://developers.google.com/my-business/content/basic-setup"
final_url: "https://developers.google.com/my-business/content/basic-setup"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "ac756398f57c076b4ee731c3ac0f68021fa337aecfe6c676f23f3a3d8d472558"
---

# Basic setup Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Before using Business Profile APIs, ensure project approval and enable the eight associated APIs in the Google API Console.
- Obtain an OAuth 2.0 client ID for your application to authorize access to location data.
- Understand REST basics and JSON format to interact with the APIs via HTTP requests and responses.
- Utilize the OAuth Playground for experimenting with API calls, and consider using client libraries for simplified interaction.
- There is no sandbox environment for testing API calls; use `validateOnly` parameter for request validation without data modification.

To proceed, make sure you've completed the steps in
[Prerequisites](/my-business/content/prereqs) and that we've approved your project for Business Profile
APIs access.

## Enable the APIs

There are seven APIs associated with Business Profile that must be enabled in the Google Cloud
console:

- Google My Business API
- My Business Account Management API
- My Business Lodging API
- My Business Place Actions API
- My Business Notifications API
- My Business Verifications API
- My Business Business Information API

### Enable an API

If you've completed all of the
[Prerequisites](/my-business/content/prereqs) and have been granted access to the API, but are still unable
to use the provided shortcut, you can enable the API manually with the following steps.

To enable an API for your project, do the following:

1. [Open the API Library](https://console.cloud.google.com/apis/library) in the Google API Console. If prompted, select a
   project or create a new one. The API Library lists all available
   APIs, grouped by product family and popularity.
2. If the API you want to enable isn't visible in the list, use search to
   find it.
3. Select the API you want to enable, then click the **Enable**
   button.
4. If prompted, enable billing.
5. If prompted, accept the API's Terms of Service.

If you are a **Google workspace user**, confirm that [Google Business Profile is turned on for your account](https://support.google.com/a/answer/10623799) in your Google workspace organization. You will get `error 403 - PERMISSION DENIED` when using the GBP APIs if Google Business Profile is turned off for your account in your Google workspace organization.

## Request an OAuth 2.0 client ID

Because your app accesses protected, non-public data, you need an
[OAuth 2.0](/identity/protocols/OAuth2) client ID. This lets your app request
authorization to access your organization's location data on behalf of your app's users.

Your application must send an OAuth 2.0 token with any Business Profile APIs request
that accesses private user data.

If you haven't done so already, go to the "Credentials" section of
[the Google Cloud console](https://console.developers.google.com/apis/credentials) and click
**Create credentials > OAuth client ID** to create your OAuth 2.0 credentials. After you've
created the credentials, you can see your client ID on the **Credentials** page. Click the
client ID for details, such as client secret, redirect URIs, JavaScript origins address, and email
address.

## Learn REST basics

There are two ways to invoke the APIs:

- Send an HTTP request and parse the responses.
- Use [client libraries](/my-business/samples).

If you decide not to use client libraries, you need to understand the basics of REST.

REST is a style of software architecture that provides a convenient and consistent approach to
request and modify data.

The term REST is short for
"[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)" (Representational State Transfer). In the context of Google APIs, it refers
to the use of HTTP verbs to retrieve and modify representations of data stored by Google.

A RESTful system stores resources in a datastore. A client sends a request for the
server to perform a particular action, such as to create, retrieve, update, or delete a resource,
and the server performs the action and sends a response. That response is often in the form of a
representation of the specified resource.

In Google's RESTful APIs, the client specifies an action with an HTTP verb, such as
`GET`, `POST`, `PUT`, or `DELETE`. The client specifies
a resource by a globally unique uniform resource identifier (URI) of the following form:

```
https://apiName.googleapis.com/apiVersion/resourcePath?parameters
```

Because all API resources have unique HTTP-accessible URIs, REST enables data caching and is
optimized to work with the web's distributed infrastructure.

You might find the
[method definitions](https://tools.ietf.org/html/rfc7231#section-4.3) in the HTTP 1.1 standards documentation
useful. They include specifications for `GET`, `POST`, `PUT`, and
`DELETE`.

## REST in the Business Profile APIs

The Business Profile APIs operations map directly to REST HTTP verbs.

The specific format for the Business Profile APIs is shown in the following URI:

```
https://apiName.googleapis.com/apiVersion/resourcePath?parameters
```

The full set of URIs used for each supported operation in the APIs appears in the Business Profile APIs
[Reference](/my-business/reference/rest) documentation.

Resource paths vary based on the endpoint.

For example, the resource path to an account appears as in the following example:

```
accounts/accountId
```

The resource path for a location appears in the following form:

```
locations/locationId
```

## Learn JSON basics

The Business Profile APIs return data in JSON format.

JavaScript Object Notation ([JSON](http://en.wikipedia.org/wiki/JSON)) is a common, language-independent data format that
provides a text representation of arbitrary data structures. For more information, see
[json.org](http://www.json.org/).

## Use OAuth 2.0 Playground to make an HTTP request

You can use the
[OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
to experiment with the Business Profile APIs. Because the Business Profile APIs
aren't public APIs, there are a few extra steps you need to take to use it in the Playground. You
need a client ID for a web application to proceed.

1. Go to the [Google API Console](https://console.developers.google.com/apis/credentials)
   and open your project. If you don't have an OAuth client ID for web applications, create one
   now:

1. From the *Create credentials* drop-down list, select **OAuth client ID**.
2. For *Application type*, click **Web Application**.
3. Add the following as a valid redirect URI:

   ```
    https://developers.google.com/oauthplayground
   ```
4. Click **Create**.

2. Copy the client ID to the clipboard.
3. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
4. Click the gear icon to open the configuration options and make the following changes:

1. Set *OAuth flow* to **Client-side**.
2. Select **Use your own OAuth credentials**.
3. Paste in your OAuth client ID.

5. Close the configuration options.
6. Under "Step 1 - Select & authorize APIs," paste the following scope for the
   Business Profile APIs into the *Input your own scopes* field:

   ```
   https://www.googleapis.com/auth/business.manage
   ```
7. Click **Authorize APIs**.
8. Click **Accept** when prompted.
9. Under "Step 2 - Configure request to API," paste the following URI into the
   *Request URI* field:

   ```
   https://mybusinessaccountmanagement.googleapis.com/v1/accounts
   ```
10. Click **Send the request**. The response should show a status of `200 OK`.

For more information about how to make various types of requests, see
the [Business Profile APIs Reference](/my-business/reference/rest).

## Client libraries

The Business Profile APIs client libraries support the functionality of the Business Profile APIs. They provide
functionality common to all Google APIs, such as HTTP transport, error handling, authentication,
and JSON parsing.

To download client libraries, see [Libraries](/my-business/samples).
