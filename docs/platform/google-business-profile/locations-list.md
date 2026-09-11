---
title: "accounts.locations.list"
source: "https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations/list"
final_url: "https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations/list"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "b571e69205006bb42b356af004926c5207d6f50cc72085ed170d21315df14a45"
---

# Method: accounts.locations.list Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- Lists all accessible locations for a specified account, including those directly or indirectly owned.
- Allows filtering, sorting, and pagination of location data using query parameters.
- Requires `https://www.googleapis.com/auth/business.manage` authorization scope for access.
- Returns a list of locations, a next-page token (if applicable), and the total size of results (when filtering).
- Provides comprehensive control over data retrieval through a read mask, letting you select specific fields.

- [HTTP request](#body.HTTP_TEMPLATE)
- [Path parameters](#body.PATH_PARAMETERS)
- [Query parameters](#body.QUERY_PARAMETERS)
- [Request body](#body.request_body)
- [Response body](#body.response_body)
  - [JSON representation](#body.ListLocationsResponse.SCHEMA_REPRESENTATION)
- [Authorization scopes](#body.aspect)

Lists the locations for the specified account.

### HTTP request

`GET https://mybusinessbusinessinformation.googleapis.com/v1/{parent=accounts/*}/locations`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters | |
| --- | --- |
| `parent` | `string`  Required. The name of the account to fetch locations from. If the parent [Account] [google.mybusiness.accountmanagement.v1.Account] is of [AccountType] [google.mybusiness.accountmanagement.v1.Account.AccountType] PERSONAL, only Locations that are directly owned by the Account are returned, otherwise it will return all accessible locations from the Account, either directly or indirectly. |

### Query parameters

| Parameters | |
| --- | --- |
| `pageSize` | `integer`  Optional. How many locations to fetch per page. Default value is 10 if not set. Minimum is 1, and maximum page size is 100. |
| `pageToken` | `string`  Optional. If specified, it fetches the next `page` of locations. The page token is returned by previous calls to `locations.list` when there were more locations than could fit in the requested page size. |
| `filter` | `string`  Optional. A filter constraining the locations to return. The response includes only entries that match the filter. If `filter` is empty, then constraints are applied and all locations (paginated) are retrieved for the requested account.  For more information about valid fields and example usage, see [Work with Location Data Guide](https://developers.google.com/my-business/content/location-data#filter_results_when_you_list_locations). |
| `orderBy` | `string`  Optional. Sorting order for the request. Multiple fields should be comma-separated, following SQL syntax. The default sorting order is ascending. To specify descending order, a suffix " desc" should be added. Valid fields to orderBy are title and storeCode. For example: "title, storeCode desc" or "title" or "storeCode desc" |
| `readMask` | `string (FieldMask format)`  Required. Read mask to specify what fields will be returned in the response.  This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body must be empty.

### Response body

Response message for Locations.ListLocations.

If successful, the response body contains data with the following structure:

| JSON representation |
| --- |
| ``` {   "locations": [     {       object (Location)     }   ],   "nextPageToken": string,   "totalSize": integer } ``` |

| Fields | |
| --- | --- |
| `locations[]` | `object (Location)`  The locations. |
| `nextPageToken` | `string`  If the number of locations exceeded the requested page size, this field is populated with a token to fetch the next page of locations on a subsequent call to `locations.list`. If there are no more locations, this field is not present in the response. |
| `totalSize` | `integer`  The approximate number of Locations in the list irrespective of pagination. This field will only be returned if `filter` is used as a query parameter. |

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/business.manage`

For more information, see the [OAuth 2.0 Overview](https://developers.google.com/identity/protocols/OAuth2).
