---
title: "Error codes"
source: "https://developers.google.com/my-business/reference/rest/Shared.Types/ErrorCode"
final_url: "https://developers.google.com/my-business/reference/rest/Shared.Types/ErrorCode"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "c307ecd9a500edff03bfe9f5d91876b3834df22e039862c39fd1f3c2ca0000e1"
---

# ErrorCode Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- `ErrorDetail` codes are categorized: 1-199 (general), 1000-1099 (photos), 1100-1199 (address/location), 1200-1299 (category), and 1300-1399 (operation).
- Common error codes include unspecified errors, missing or invalid values, invalid characters, and exceeding item limits.
- Location-specific errors address issues with geocoding, latitude/longitude accuracy, and location restrictions.
- Photo errors indicate failures in fetching or uploading images from provided URLs.
- Operational and categorical errors cover unsupported values, verification issues, and account-related limitations.

Error codes for `ErrorDetail`:

- 1 to 199: common error codes that apply to all fields.
- 1000 to 1099: photos-related error codes.
- 1100 to 1199: address- and latitude/longitude-related error codes.
- 1200 to 1299: category-related error codes.
- 1300 to 1399: operation related error codes.

| Enums | |
| --- | --- |
| `ERROR_CODE_UNSPECIFIED` | Catch-all error code. |
| `MISSING_VALUE` | A required value was not provided. |
| `INVALID_VALUE` | An invalid value was provided. |
| `INVALID_CHARACTERS` | Invalid characters were found. |
| `TOO_MANY_ITEMS` | More than the maximum number of items was provided in a repeated field. |
| `READ_ONLY` | Read-only field cannot be modified. |
| `OVERLAPPING_RANGES` | Items in a repeated field are ranges that overlap with one another. |
| `INVERTED_RANGE` | The range provided is inverted. This also includes the case of an empty range. |
| `VALUE_OUTSIDE_ALLOWED_RANGE` | The value provided is outside of its allowed range. |
| `MISSING_DEPENDENT_FIELD` | Required dependent field not present. |
| `FIELD_HAS_DEPENDENCIES` | Field required by dependent field and cannot be removed. |
| `UNSUPPORTED_VALUE` | The provided value, although possibly valid, is unsupported due to other constraints. |
| `EXPIRED_VALUE` | The provided value has expired and is no longer valid. |
| `PHOTO_FETCH_FAILED` | Fetch photo from the specified URL failed. |
| `PHOTO_UPLOAD_FAILED` | Upload photo from the specified URL failed. |
| `GEOCODE_ERROR` | There was an error automatically determining latitude/longitude. |
| `LAT_LNG_OUTSIDE_COUNTRY` | The latitude/longitude provided does not lie in the country provided. |
| `LAT_LNG_REQUIRED` | Latitude and Longitude must be provided. |
| `LAT_LNG_TOO_FAR_FROM_ADDRESS` | The latitude/longitude and address pair are too far apart. |
| `CATEGORY_NOT_VERIFIED` | Category provided is not verified. |
| `OPERATION_EXECUTION_ERROR` | Generic operation execution error. |
| `OPERATION_UNSUPPORTED_UNDER_ACCOUNT_CONDITION` | Operation is not supported due to account condition. |
| `LOCATION_DISABLED_FOR_LOCAL_POST_API` | Location Disabled for Local Post API. |
