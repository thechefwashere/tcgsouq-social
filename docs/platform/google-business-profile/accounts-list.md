---
title: "accounts.list"
source: "https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts/list"
final_url: "https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts/list"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "dc97a152de53470e2cc7566c8dfd4f20588d28caadbe789daf43063c90ae4376"
---

# Method: accounts.list Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Lists all accounts owned by or accessible to the authenticated user, including their personal account.
- Allows filtering accounts by type and specifying the parent account for retrieval.
- Supports pagination to retrieve large lists of accounts using `pageToken`.
- The response includes an array of `Account` objects and a `nextPageToken` for further results.
- Requires the `https://www.googleapis.com/auth/business.manage` OAuth scope for authorization.

- [HTTP request](#body.HTTP_TEMPLATE)
- [Query parameters](#body.QUERY_PARAMETERS)
- [Request body](#body.request_body)
- [Response body](#body.response_body)
  - [JSON representation](#body.ListAccountsResponse.SCHEMA_REPRESENTATION)
- [Authorization scopes](#body.aspect)

Lists all of the accounts for the authenticated user. This includes all accounts that the user owns, as well as any accounts for which the user has management rights.

### HTTP request

`GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Query parameters

| Parameters | |
| --- | --- |
| `parentAccount` | `string`  Optional. The resource name of the account for which the list of directly accessible accounts is to be retrieved. This only makes sense for Organizations and User Groups. If empty, will return `accounts.list` for the authenticated user. `accounts/{account_id}`. |
| `pageSize` | `integer`  Optional. How many accounts to fetch per page. The default and maximum is 20. |
| `pageToken` | `string`  Optional. If specified, the next page of accounts is retrieved. The `pageToken` is returned when a call to `accounts.list` returns more results than can fit into the requested page size. |
| `filter` | `string`  Optional. A filter constraining the accounts to return. The response includes only entries that match the filter. If `filter` is empty, then no constraints are applied and all accounts (paginated) are retrieved for the requested account.  For example, a request with the filter `type=USER_GROUP` will only return user groups.  The `type` field is the only supported filter. |

### Request body

The request body must be empty.

### Response body

Response message for Accounts.ListAccounts.

If successful, the response body contains data with the following structure:

| JSON representation |
| --- |
| ``` {   "accounts": [     {       object (Account)     }   ],   "nextPageToken": string } ``` |

| Fields | |
| --- | --- |
| `accounts[]` | `object (Account)`  A collection of accounts to which the user has access. The personal account of the user doing the query will always be the first item of the result, unless it is filtered out. |
| `nextPageToken` | `string`  If the number of accounts exceeds the requested page size, this field is populated with a token to fetch the next page of accounts on a subsequent call to `accounts.list`. If there are no more accounts, this field is not present in the response. |

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/business.manage`

For more information, see the [OAuth 2.0 Overview](https://developers.google.com/identity/protocols/OAuth2).
