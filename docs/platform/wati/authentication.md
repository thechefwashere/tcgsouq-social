---
title: "Authentication"
source: "https://docs.wati.io/reference/authentication.md"
final_url: "https://docs.wati.io/reference/authentication.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "ae658853fa26130962c483e772eddde2db3645d27ba767a1e22f87f20c5caac0"
---

---
updatedAt: 2026-05-19T06:54:22.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Authentication

Wati APIs use Bearer Token authentication. Every API request must include a valid API token in the HTTP Authorization header.

This guide explains how to generate your API token and include it in your API requests.

<Callout icon="❗️" theme="error">
  **Please do not share the token with anyone, nor post it publicly.**
</Callout>

## Generate an API token

Before making API requests, you need to generate an API token from your Wati account.

### Steps

1. Log in to your **Wati account**.

2. In the navigation menu, click **API**, or go to:

   **Connector → API → Create API Token**

   <Image align="center" width="500px" src="https://files.readme.io/f841810140511494e092ff6c0b9276b4937e84bd99c6b2dc8fe6a415e4321140-SCR-20260313-nxat.png" />

3. On the **API Tokens** page, click **Generate new token**.

   <Image align="center" width="700px" src="https://files.readme.io/9657c90bbb5752b38ef33881509ca8d09c8fd6765ea9a741ae978456accca271-SCR-20260313-nyrz.png" />

4. Enter a **token name** and select the required **scopes** (permissions), such as:
   * `contacts:read`
   * `contacts:write`
   * `messagetemplate:read`

5. (Optional) Set an **expiry date** for the token. For security, rotating tokens every **6 months** is recommended.

6. Copy and securely store the generated token.

<Callout icon="❗️" theme="error">
  The token will only be shown once. Make sure you save it securely.
</Callout>

## Authentication header

All API requests must include the following HTTP headers.

| Header          | Value                     |
| --------------- | ------------------------- |
| `Authorization` | `Bearer <your_api_token>` |
| `Content-Type`  | `application/json`        |

### Example request

```http Sample request
GET https://live-mt-server.wati.io/xxxxxx/api/v1/getContacts

	Authorization: Bearer eyJhbGciOiJIUzI1.......
	Content-Type: application/json
```

<Callout icon="❗️" theme="error">
  Replace **eyJhbGciOiJIUzI1.......** with your actual token copied from the **API Docs** page.
</Callout>

#### Example API Call (cURL)

````curl
```bash
curl --location 'https://live-mt-server.wati.io/xxxxxx/api/v1/getContacts' \
	--header 'Authorization: Bearer <your_api_token>' \
	--header 'Content-Type: application/json'
````

## Using authentication in common tools

### Postman

1. Open your API request.

2. Go to the **Authorization** tab.

3. Select **Bearer Token** as the type.

4. Paste your API token in the **Token** field.

5. Send the request.

### Zapier, n8n, or any HTTP client

Add the following header to your request:

| Header Name     | Value                     |
| --------------- | ------------------------- |
| `Authorization` | `Bearer <your_api_token>` |

#### Using environment variables (recommended)

For security, store your API credentials as environment variables instead of hardcoding them in your source code.

Example:

```Text Example
WATI_API_ENDPOINT=https://live-mt-server.wati.io/xxxxxx/
WATI_API_TOKEN=eyJhbG1NiIsIn......
```

Example usage:

```Text Example usage
Authorization: Bearer $WATI_API_TOKEN
```

<Callout icon="📘" theme="info">
  ## Security best practices

  | Practice                  | Description                                                   |
  | ------------------------- | ------------------------------------------------------------- |
  | Rotate tokens regularly   | Regenerate API tokens every 6 months                          |
  | Use minimal scopes        | Only grant the permissions required for your integration      |
  | Avoid exposing tokens     | Never commit tokens to Git repositories or public code        |
  | Use environment variables | Store tokens in environment variables or a secrets manager    |
  | Separate environments     | Use different tokens for development, staging, and production |
</Callout>

<Callout icon="❗️" theme="error">
  ## Troubleshooting

  | Issue                                   | Possible cause                       | Solution                                                                                                        |
  | --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
  | `401 Unauthorized`                      | Token missing, expired, or incorrect | Generate a new token and ensure the `Bearer` prefix is included                                                 |
  | `No Access Token provided`              | Missing `Authorization` header       | Add `Authorization: Bearer <token>` to the request                                                              |
  | Token becomes invalid                   | Account password was changed         | Generate a new token and update your integrations                                                               |
  | Request fails due to incorrect endpoint | Wrong API base URL                   | Use the API base URL shown in your Wati API documentation (for example: `https://live-mt-server-XXXXX.wati.io`) |
</Callout>

<br />

<br />
