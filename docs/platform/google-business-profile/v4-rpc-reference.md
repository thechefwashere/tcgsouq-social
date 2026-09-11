---
title: "v4 RPC reference (LocalPost fields)"
source: "https://developers.google.com/my-business/reference/rpc/google.mybusiness.v4"
final_url: "https://developers.google.com/my-business/reference/rpc/google.mybusiness.v4"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "8f2aaece7028fac36c0fdcb0339e16421d59cd0a17682d8d123c84f3229bb50d"
---

# Package google.mybusiness.v4 Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The Google My Business API v4 provides programmatic access to manage business information on Google.
- Many features previously available in v4 are now deprecated, with users directed to the Account Management and Notifications APIs.
- The API uses OAuth 2.0 for authorization, typically requiring scopes like `https://www.googleapis.com/auth/plus.business.manage`.
- Resources are organized into interfaces, messages, and enums, each with detailed descriptions and functionalities.
- Developers can use the API to manage locations, media, Q&A, reviews, services, and verifications, among other features.

## Index

- `FoodMenuService` (interface)
- `LocalPosts` (interface)
- `Media` (interface)
- `Reviews` (interface)
- `AlertType` (enum)
- `Allergen` (enum)
- `BatchGetReviewsRequest` (message)
- `BatchGetReviewsResponse` (message)
- `CallToAction` (message)
- `CallToAction.ActionType` (enum)
- `CreateLocalPostRequest` (message)
- `CreateMediaItemRequest` (message)
- `DeleteLocalPostRequest` (message)
- `DeleteMediaItemRequest` (message)
- `DeleteReviewReplyRequest` (message)
- `DietaryRestriction` (enum)
- `ErrorDetail` (message)
- `ErrorDetail.ErrorCode` (enum)
- `FoodMenu` (message)
- `FoodMenu.Cuisine` (enum)
- `FoodMenuItem` (message)
- `FoodMenuItemAttributes` (message)
- `FoodMenuItemAttributes.Ingredient` (message)
- `FoodMenuItemAttributes.PortionSize` (message)
- `FoodMenuItemOption` (message)
- `FoodMenuSection` (message)
- `FoodMenus` (message)
- `GetCustomerMediaItemRequest` (message)
- `GetFoodMenusRequest` (message)
- `GetLocalPostRequest` (message)
- `GetMediaItemRequest` (message)
- `GetReviewRequest` (message)
- `InternalError` (message)
- `ListCustomerMediaItemsRequest` (message)
- `ListCustomerMediaItemsResponse` (message)
- `ListLocalPostsRequest` (message)
- `ListLocalPostsResponse` (message)
- `ListMediaItemsRequest` (message)
- `ListMediaItemsResponse` (message)
- `ListReviewsRequest` (message)
- `ListReviewsResponse` (message)
- `LocalPost` (message)
- `LocalPost.LocalPostState` (enum)
- `LocalPostEvent` (message)
- `LocalPostEvent.RecurrenceInfo` (message)
- `LocalPostEvent.RecurrenceInfo.DailyOccurrencePattern` (message)
- `LocalPostEvent.RecurrenceInfo.MonthlyOccurrencePattern` (message)
- `LocalPostEvent.RecurrenceInfo.MonthlyOccurrencePattern.DayOfWeekOccurrence` (enum)
- `LocalPostEvent.RecurrenceInfo.WeeklyOccurrencePattern` (message)
- `LocalPostOffer` (message)
- `LocalPostTopicType` (enum)
- `LocationReview` (message)
- `MediaItem` (message)
- `MediaItem.Attribution` (message)
- `MediaItem.Dimensions` (message)
- `MediaItem.LocationAssociation` (message)
- `MediaItem.LocationAssociation.Category` (enum)
- `MediaItem.MediaFormat` (enum)
- `MediaItem.MediaInsights` (message)
- `MediaItemDataRef` (message)
- `MenuLabel` (message)
- `NutritionFacts` (message)
- `NutritionFacts.CaloriesFact` (message)
- `NutritionFacts.EnergyUnit` (enum)
- `NutritionFacts.MassUnit` (enum)
- `NutritionFacts.NutritionFact` (message)
- `PreparationMethod` (enum)
- `Review` (message)
- `Review.ReviewMediaItem` (message)
- `Review.Reviewer` (message)
- `Review.StarRating` (enum)
- `ReviewReply` (message)
- `ReviewReply.PolicyViolation` (enum)
- `ReviewReply.State` (enum)
- `Spiciness` (enum)
- `StartUploadMediaItemDataRequest` (message)
- `TimeInterval` (message)
- `UpdateFoodMenusRequest` (message)
- `UpdateLocalPostRequest` (message)
- `UpdateMediaItemRequest` (message)
- `UpdateReviewReplyRequest` (message)
- `ValidationError` (message)

## FoodMenuService

This API allows get and update the food menus of business locations.

Note that the Location.PriceList also represents "menus" in one of its type but with limited fields. It shares the same downstream storage as FoodMenus. Once migration to FoodMenuService is done, clients are strongly discouraged to use Location.PriceList to update menu data anymore, which may result in unexpected data loss.

| GetFoodMenus |
| --- |
| `rpc GetFoodMenus(GetFoodMenusRequest) returns (FoodMenus)`  Returns the food menus of a specific location. Only call this if location.location\_state.can\_have\_food\_menu is true.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| UpdateFoodMenus |
| --- |
| `rpc UpdateFoodMenus(UpdateFoodMenusRequest) returns (FoodMenus)`  Updates the food menus of a specific location. Only call this if location.location\_state.can\_have\_food\_menu is true.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

## LocalPosts

This API exposes the management API of local posts.

| CreateLocalPost |
| --- |
| `rpc CreateLocalPost(CreateLocalPostRequest) returns (LocalPost)`  Creates a new local post associated with the specified location, and returns it.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| DeleteLocalPost |
| --- |
| `rpc DeleteLocalPost(DeleteLocalPostRequest) returns (Empty)`  Deletes a local post. Returns `NOT_FOUND` if the local post does not exist.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| GetLocalPost |
| --- |
| `rpc GetLocalPost(GetLocalPostRequest) returns (LocalPost)`  Gets the specified local post. Returns `NOT_FOUND` if the local post does not exist.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| ListLocalPosts |
| --- |
| `rpc ListLocalPosts(ListLocalPostsRequest) returns (ListLocalPostsResponse)`  Returns a list of local posts associated with a location.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| UpdateLocalPost |
| --- |
| `rpc UpdateLocalPost(UpdateLocalPostRequest) returns (LocalPost)`  Updates the specified local post and returns the updated local post.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

## Media

This service allows the management of media (photos and video) linked with a location.

| CreateMediaItem |
| --- |
| `rpc CreateMediaItem(CreateMediaItemRequest) returns (MediaItem)`  Creates a new media item for the location.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| DeleteMediaItem |
| --- |
| `rpc DeleteMediaItem(DeleteMediaItemRequest) returns (Empty)`  Deletes the specified media item.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| GetCustomerMediaItem |
| --- |
| `rpc GetCustomerMediaItem(GetCustomerMediaItemRequest) returns (MediaItem)`  Returns metadata for the requested customer media item.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| GetMediaItem |
| --- |
| `rpc GetMediaItem(GetMediaItemRequest) returns (MediaItem)`  Returns metadata for the requested media item.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| ListCustomerMediaItems |
| --- |
| `rpc ListCustomerMediaItems(ListCustomerMediaItemsRequest) returns (ListCustomerMediaItemsResponse)`  Returns a list of media items associated with a location that have been contributed by customers.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| ListMediaItems |
| --- |
| `rpc ListMediaItems(ListMediaItemsRequest) returns (ListMediaItemsResponse)`  Returns a list of media items associated with a location.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| StartUploadMediaItemData |
| --- |
| `rpc StartUploadMediaItemData(StartUploadMediaItemDataRequest) returns (MediaItemDataRef)`  Generates a `MediaItemDataRef` for media item uploading.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| UpdateMediaItem |
| --- |
| `rpc UpdateMediaItem(UpdateMediaItemRequest) returns (MediaItem)`  Updates metadata of the specified media item. This can only be used to update the Category of a media item, with the exception that the new category cannot be COVER or PROFILE.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

## Reviews

This API provides CRUD operations for Reviews. `google.mybusiness.v4.Reviews`.

| BatchGetReviews |
| --- |
| `rpc BatchGetReviews(BatchGetReviewsRequest) returns (BatchGetReviewsResponse)`  Returns the paginated list of reviews for all specified locations. This operation is only valid if the specified locations are verified.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| DeleteReviewReply |
| --- |
| `rpc DeleteReviewReply(DeleteReviewReplyRequest) returns (Empty)`  Deletes the response to the specified review. This operation is only valid if the specified location is verified.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| GetReview |
| --- |
| `rpc GetReview(GetReviewRequest) returns (Review)`  Returns the specified review. This operation is only valid if the specified location is verified. Returns `NOT_FOUND` if the review does not exist, or has been deleted.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| ListReviews |
| --- |
| `rpc ListReviews(ListReviewsRequest) returns (ListReviewsResponse)`  Returns the paginated list of reviews for the specified location. This operation is only valid if the specified location is verified.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

| UpdateReviewReply |
| --- |
| `rpc UpdateReviewReply(UpdateReviewReplyRequest) returns (ReviewReply)`  Updates the reply to the specified review. A reply is created if one does not exist. This operation is only valid if the specified location is verified.  Authorization scopes  Requires one of the following OAuth scopes:   - `https://www.googleapis.com/auth/plus.business.manage` - `https://www.googleapis.com/auth/business.manage`   For more information, see the [OAuth 2.0 Overview](/identity/protocols/OAuth2). |

## AlertType

The type of event for which the alert post was created.

| Enums | |
| --- | --- |
| `ALERT_TYPE_UNSPECIFIED` | No alert is specified. |
| `COVID_19` | Alerts related to the 2019 Coronavirus Disease pandemic. Covid posts only support a summary field and a call to action field. When these alerts are no longer relevant, new Alert post creation for type COVID-19 will be disabled. However, merchant will still be able to manage their existing COVID-19 posts. |

## Allergen

Allergen information regarding a food item.

| Enums | |
| --- | --- |
| `ALLERGEN_UNSPECIFIED` | Allergen unspecified |
| `DAIRY` | Dairy related allergen |
| `EGG` | Egg related allergen |
| `FISH` | Fish related allergen |
| `PEANUT` | Peanut related allergen |
| `SHELLFISH` | Shellfish related allergen |
| `SOY` | Soy related allergen |
| `TREE_NUT` | Tree nut related allergen |
| `WHEAT` | Wheat related allergen |

## BatchGetReviewsRequest

Request message for Reviews.BatchGetReviews.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the account from which to retrieve a list of reviews across multiple locations. |
| `location_names[]` | `string`  A collection of locations to fetch reviews for, specified by their names. |
| `page_size` | `int32`  How many reviews to fetch per page. The default value is 50. |
| `page_token` | `string`  If specified, it fetches the next page of reviews. |
| `order_by` | `string`  Optional. Specifies the field to sort reviews by. If unspecified, the order of reviews returned will default to `update_time desc`. Valid orders to sort by are `rating`, `rating desc` and `update_time desc`. `rating` will return reviews in ascending order. `update_time`(i.e. ascending order) is not supported. |
| `ignore_rating_only_reviews (deprecated)` | `bool`  Whether to ignore rating-only reviews. |

## BatchGetReviewsResponse

Response message for Reviews.BatchGetReviews.

| Fields | |
| --- | --- |
| `location_reviews[]` | `LocationReview`  Reviews with location information. |
| `next_page_token` | `string`  If the number of reviews exceeded the requested page size, this field is populated with a token to fetch the next page of reviews on a subsequent calls. If there are no more reviews, this field will not be present in the response. |

## CallToAction

An action that is performed when the user clicks through the post

| Fields | |
| --- | --- |
| `action_type` | `ActionType`  The type of action that will be performed. |
| `url` | `string`  The URL the user will be directed to upon clicking. This field should be left unset for Call CTA. |

## ActionType

The type of action that will be performed.

| Enums | |
| --- | --- |
| `ACTION_TYPE_UNSPECIFIED` | Type unspecified. |
| `BOOK` | This post wants a user to book an appointment/table/etc. |
| `ORDER` | This post wants a user to order something. |
| `SHOP` | This post wants a user to browse a product catalog. |
| `LEARN_MORE` | This post wants a user to learn more (at their website). |
| `SIGN_UP` | This post wants a user to register/sign up/join something. |
| `GET_OFFER` | Deprecated. Use `OFFER` in `LocalPostTopicType` to create a post with offer content. |
| `CALL` | This post wants a user to call the business. |

## CreateLocalPostRequest

Request message for CreateLocalPost.

| Fields | |
| --- | --- |
| `parent` | `string`  The name of the location in which to create this local post. |
| `local_post` | `LocalPost`  The new local post metadata. |

## CreateMediaItemRequest

Request message for Media.CreateMediaItem.

| Fields | |
| --- | --- |
| `parent` | `string`  The resource name of the location where this media item will be created. |
| `media_item` | `MediaItem`  The media item to be created. |

## DeleteLocalPostRequest

Request message for DeleteLocalPost.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the local post to delete. |

## DeleteMediaItemRequest

Request message for Media.DeleteMediaItem.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the media item to be deleted. |

## DeleteReviewReplyRequest

Request message for Reviews.DeleteReviewReply.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the review reply to delete. |

## DietaryRestriction

Dietary information of a food item.

| Enums | |
| --- | --- |
| `DIETARY_RESTRICTION_UNSPECIFIED` | Dietary type unspecified |
| `HALAL` | Denotion of the food as a halal dish. |
| `KOSHER` | Denotion of the food as a kosher dish. |
| `ORGANIC` | Denotion of the food as an organic dish. |
| `VEGAN` | Denotion of the food as a vegan dish. |
| `VEGETARIAN` | Denotion of the food as a vegetarian dish. |

## ErrorDetail

Details an error that resulted in a validation or internal failure.

| Fields | |
| --- | --- |
| `code` | `int32`  The status code, which should be an enum value of `ErrorCode`. |
| `field` | `string`  A path leading to a field in the request body. The value is a sequence of dot-separated identifiers that identify a protocol buffer field. For example, "error\_details.field" would identify this field. |
| `message` | `string`  A description of why the field caused a failure. The message is in English and may not be suitable for display to users. |
| `value` | `string`  The value that failed the request. |
| `field_index` | `int32`  If the request field that generated this error is repeated, this will contain the zero based index of the entry in that field which caused validation to fail. |

## ErrorCode

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
| `STALE_DATA` | Proposed values of some fields are stale compared with existing values. |

## FoodMenu

Menu of a business that serves food dishes.

| Fields | |
| --- | --- |
| `labels[]` | `MenuLabel`  Required. Language-tagged labels for the menu. E.g. "menu", "lunch special". Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required. |
| `source_url` | `string`  Optional. Source URL of menu if there is a webpage to go to. |
| `sections[]` | `FoodMenuSection`  Required. Sections of the menu. |
| `cuisines[]` | `Cuisine`  Optional. Cuisine information for the food menu. It is highly recommended to provide this field. |

## Cuisine

Cuisine information of a resturant.

| Enums | |
| --- | --- |
| `CUISINE_UNSPECIFIED` | Cuisine unspecified |
| `AMERICAN` | American food |
| `ASIAN` | Asian food |
| `BRAZILIAN` | Brazilian food |
| `BREAK_FAST` | Breakfast |
| `BRUNCH` | Brunch |
| `CHICKEN` | Chicken |
| `CHINESE` | Chinese food |
| `FAMILY` | Family style cuisine |
| `FAST_FOOD` | Fast food |
| `FRENCH` | French food |
| `GREEK` | Greek food |
| `GERMAN` | German food |
| `HAMBURGER` | Hamburger |
| `INDIAN` | Indian food |
| `INDONESIAN` | Indonesian food |
| `ITALIAN` | Italian food |
| `JAPANESE` | Japanese food |
| `KOREAN` | Korean food |
| `LATIN_AMERICAN` | Latin American food |
| `MEDITERRANEAN` | Mediterranean food |
| `MEXICAN` | Mexican food |
| `PAKISTANI` | Pakistani food |
| `PIZZA` | Pizza |
| `SEAFOOD` | Seafood |
| `SPANISH` | Spanish food |
| `SUSHI` | Sushi |
| `THAI` | Thai food |
| `TURKISH` | Turkish food |
| `VEGETARIAN` | Vegetarian Food |
| `VIETNAMESE` | Vietnamese food |
| `OTHER_CUISINE` | Other cuisine |

## FoodMenuItem

Item of a Section. It can be the dish itself, or can contain multiple FoodMenuItemOption.

| Fields | |
| --- | --- |
| `labels[]` | `MenuLabel`  Required. Language tagged labels for this menu item. Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required. |
| `attributes` | `FoodMenuItemAttributes`  Required. Detailed attributes of the item. When item options are specified, this is considered as the base attributes and populate to each options. |
| `options[]` | `FoodMenuItemOption`  Optional. This is for an item that comes in multiple different options, and users are required to make choices. E.g. "regular" vs. "large" pizza. When options are specified, labels and attributes at item level will automatically become the first option's labels and attributes. Clients only need to specify other additional food options in this field. |

## FoodMenuItemAttributes

Attributes of a food item/dish.

| Fields | |
| --- | --- |
| `price` | `Money`  Optional. Price of the food dish. |
| `spiciness` | `Spiciness`  Optional. Spiciness level of the food dish. |
| `allergen[]` | `Allergen`  Optional. Allergens associated with the food dish. It is highly recommended to provide this field. |
| `dietary_restriction[]` | `DietaryRestriction`  Optional. Dietary information of the food dish. It is highly recommended to provide this field. |
| `nutrition_facts` | `NutritionFacts`  Optional. Nutrition facts of the food dish option. It is highly recommended to provide this field. |
| `ingredients[]` | `Ingredient`  Optional. Ingredients of the food dish option. |
| `serves_num_people` | `int32`  Optional. Number of people can be served by this food dish option. |
| `preparation_methods[]` | `PreparationMethod`  Optional. Methods on how the food dish option is prepared. |
| `portion_size` | `PortionSize`  Optional. Size of the order, represented in units of items. (e.g. 4 "skewers", 6 "pieces") |
| `media_keys[]` | `string`  Optional. The media keys of the media associated with the dish. Only photo media is supported. When there are multiple photos associated, the first photo is considered as the preferred photo. |

## Ingredient

This message denotes an ingredient information of a food dish.

| Fields | |
| --- | --- |
| `labels[]` | `MenuLabel`  Required. Labels to describe ingredient. Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required. |

## PortionSize

Serving portion size of a food dish.

| Fields | |
| --- | --- |
| `quantity` | `int32`  Required. Number of the portion. |
| `unit[]` | `MenuLabel`  Required. The repeated name\_info field is for the unit in multiple languages. |

## FoodMenuItemOption

Option of an Item. It requires an explicit user selection.

| Fields | |
| --- | --- |
| `labels[]` | `MenuLabel`  Required. Language tagged labels for this menu item option. E.g.: "beef pad thai", "veggie pad thai", "small pizza", "large pizza". Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required. |
| `attributes` | `FoodMenuItemAttributes`  Required. Detailed attributes of the item option. Individual unspecified attributes will be inherited from the item-level attibutes as the base. |

## FoodMenuSection

Section of a menu. It can contain multiple items/dishes.

| Fields | |
| --- | --- |
| `labels[]` | `MenuLabel`  Required. Language tagged labels for this menu section. Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required. |
| `items[]` | `FoodMenuItem`  Required. Items of the section. Each Section must have at least an item. |

## FoodMenus

Menus of a business that serve food dishes.

| Fields | |
| --- | --- |
| `name` | `string`  Required. Google identifier for this location in the form: `accounts/{account_id}/locations/{location_id}/foodMenus` |
| `menus[]` | `FoodMenu`  Optional. A collection of food menus. |

## GetCustomerMediaItemRequest

Request message for Media.GetCustomerMediaItem.

| Fields | |
| --- | --- |
| `name` | `string`  The resource name of the requested customer media item. |

## GetFoodMenusRequest

Request message for FoodMenu.GetFoodMenus

| Fields | |
| --- | --- |
| `name` | `string`  Required. Google identifier for this location in the form: `accounts/{account_id}/locations/{location_id}/foodMenus` |
| `read_mask` | `FieldMask`  Optional. The specific fields to return. If no mask is specified, then it returns the full FoodMenu (same as "\*"). Repeated field items can not be individually specified. For example: "name" and "menus" are valid masks, while "menus.sections" is invalid. |

## GetLocalPostRequest

Request message for LocalPosts.GetLocalPost.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the local post to fetch. |

## GetMediaItemRequest

Request message for Media.GetMediaItem.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the requested media item. |

## GetReviewRequest

Request message for Reviews.GetReview.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the review to fetch. |

## InternalError

Describes internal failures.

| Fields | |
| --- | --- |
| `error_details[]` | `ErrorDetail`  Details individual failures. |

## ListCustomerMediaItemsRequest

Request message for Media.ListCustomerMediaItems.

| Fields | |
| --- | --- |
| `parent` | `string`  The name of the location whose customer media items will be listed. |
| `page_size` | `int32`  How many media items to return per page. The default value is 100, the maximum supported page size is 200. |
| `page_token` | `string`  If specified, returns the next page of media items. |

## ListCustomerMediaItemsResponse

Response message for Media.ListCustomerMediaItems.

| Fields | |
| --- | --- |
| `media_items[]` | `MediaItem`  The returned list of media items. |
| `total_media_item_count` | `int32`  The total number of media items for this location, irrespective of pagination. This number is approximate, particularly when there are multiple pages of results. |
| `next_page_token` | `string`  If there are more media items than the requested page size, then this field is populated with a token to fetch the next page of media items on a subsequent call to ListCustomerMediaItems. |

## ListLocalPostsRequest

Request message for ListLocalPosts

| Fields | |
| --- | --- |
| `parent` | `string`  The name of the location whose local posts will be listed. |
| `page_size` | `int32`  How many local posts to return per page. Default of 20. The minimum is 1, and maximum page size is 100. |
| `page_token` | `string`  If specified, returns the next page of local posts. |

## ListLocalPostsResponse

Response message for ListLocalPosts

| Fields | |
| --- | --- |
| `local_posts[]` | `LocalPost`  The returned list of local posts. |
| `next_page_token` | `string`  If there are more local posts than the requested page size, then this field is populated with a token to fetch the next page of local posts on a subsequent call to `ListLocalPosts`. |

## ListMediaItemsRequest

Request message for Media.ListMediaItems.

| Fields | |
| --- | --- |
| `parent` | `string`  The name of the location whose media items will be listed. |
| `page_size` | `int32`  How many media items to return per page. The default value is 100, which is also the maximum supported number of media items able to be added to a location with the My Business API. Maximum page size is 2500. |
| `page_token` | `string`  If specified, returns the next page of media items. |

## ListMediaItemsResponse

Response message for Media.ListMediaItems.

| Fields | |
| --- | --- |
| `media_items[]` | `MediaItem`  The returned list of media items. |
| `total_media_item_count` | `int32`  The total number of media items for this location, irrespective of pagination. |
| `next_page_token` | `string`  If there are more media items than the requested page size, then this field is populated with a token to fetch the next page of media items on a subsequent call to ListMediaItems. |

## ListReviewsRequest

Request message for Reviews.ListReviews.

| Fields | |
| --- | --- |
| `parent` | `string`  The name of the location to fetch reviews for. |
| `page_size` | `int32`  How many reviews to fetch per page. The maximum `page_size` is 50. |
| `page_token` | `string`  If specified, it fetches the next page of reviews. |
| `order_by` | `string`  Specifies the field to sort reviews by. If unspecified, the order of reviews returned will default to `update_time desc`. Valid orders to sort by are `rating`, `rating desc` and `update_time desc`. |

## ListReviewsResponse

Response message for Reviews.ListReviews.

| Fields | |
| --- | --- |
| `reviews[]` | `Review`  The reviews. |
| `average_rating` | `double`  The average star rating of all reviews for this location on a scale of 1 to 5, where 5 is the highest rating. |
| `total_review_count` | `int32`  The total number of reviews for this location. |
| `next_page_token` | `string`  If the number of reviews exceeded the requested page size, this field is populated with a token to fetch the next page of reviews on a subsequent call to ListReviews. If there are no more reviews, this field is not present in the response. |

## LocalPost

Represents a [local post](https://support.google.com/business/answer/7662907) for a location.

| Fields | |
| --- | --- |
| `name` | `string`  Output only. Google identifier for this local post in the form: `accounts/{account_id}/locations/{location_id}/localPosts/{local_post_id}` |
| `language_code` | `string`  The language of the local post. |
| `summary` | `string`  Description/body of the local post. |
| `call_to_action` | `CallToAction`  The URL that users are sent to when clicking through the promotion. Ignored for topic type `OFFER`. |
| `create_time` | `Timestamp`  Output only. Time of the creation of the post. |
| `update_time` | `Timestamp`  Output only. Time of the last modification of the post made by the user. |
| `scheduled_time` | `Timestamp`  If set, determines when a post will be published. This can be set by the user to schedule posts in advance. |
| `recurring_instance_time (deprecated)` | `Timestamp`  Output only. Deprecated: Use `event.recurring_instance_time` instead. This field will be removed in a future version. Output only. Time when the most recent recurring instance of the post was updated. |
| `event` | `LocalPostEvent`  Event information. Required for topic types `EVENT` and `OFFER`. |
| `state` | `LocalPostState`  Output only. The state of the post, indicating what part of its lifecycle it is in. |
| `media[]` | `MediaItem`  The media associated with the post. source\_url is the only supported data field for a LocalPost MediaItem. |
| `search_url` | `string`  Output only. The link to the local post in Google search. This link can be used to share the post via social media, email, text, etc. |
| `topic_type` | `LocalPostTopicType`  Required. The topic type of the post: standard, event, offer, or alert. |
| `alert_type` | `AlertType`  The type of alert the post is created for. This field is only applicable for posts of topic\_type Alert, and behaves as a sub-type of Alerts. |
| Union field `topic_type_specific_fields`. Specific fields for a topic type. `topic_type_specific_fields` can be only one of the following: | |
| `offer` | `LocalPostOffer`  Additional data for offer posts. This should only be set when the topic\_type is OFFER. |

## LocalPostState

Indicates what state the post is in.

| Enums | |
| --- | --- |
| `LOCAL_POST_STATE_UNSPECIFIED` | State not specified. |
| `REJECTED` | This post was rejected due to content policy violation. |
| `LIVE` | This post is published and is currently appearing in search results. |
| `PROCESSING` | This post is being processed and is not appearing in search results. |
| `SCHEDULED` | This post is scheduled for the future and is not appearing in search results. |
| `RECURRING` | This post is a recurring post and is currently appearing in search results. |

## LocalPostEvent

All the information pertaining to an event featured in a local post.

| Fields | |
| --- | --- |
| `title` | `string`  Name of the event. |
| `schedule` | `TimeInterval`  Event start and end date/time. |
| `recurrence_info` | `RecurrenceInfo`  Optional. Stores info about the cadence of a recurring post. Will be set only if the post is a recurring post. |
| `recurring_instance_time` | `Timestamp`  Output only. Time when the most recent recurring instance of the post was updated. |

## RecurrenceInfo

Represents the recurrence information for a local post.

| Fields | |
| --- | --- |
| `series_end_time` | `Timestamp`  Optional. The end time of the recurrence series. |
| Union field `occurrence_pattern`. The occurrence pattern for the recurring post. `occurrence_pattern` can be only one of the following: | |
| `daily_pattern` | `DailyOccurrencePattern`  Daily occurrence pattern. |
| `weekly_pattern` | `WeeklyOccurrencePattern`  Weekly occurrence pattern. |
| `monthly_pattern` | `MonthlyOccurrencePattern`  Monthly occurrence pattern. |

## DailyOccurrencePattern

This type has no fields.

Represents a daily occurrence pattern.

## MonthlyOccurrencePattern

Represents a monthly occurrence pattern.

| Fields | |
| --- | --- |
| Union field `monthly_option`. The recurrence option for the monthly occurrence pattern. `monthly_option` can be only one of the following: | |
| `day_of_month` | `int32`  The day of the month. |
| `day_of_week_occurrence` | `DayOfWeekOccurrence`  The day of the week occurrence in the month. The day of the week is implied by the day of the week of the event's start time. For example, if an event starts on a Friday and day\_of\_week\_occurrence is SECOND, the event will repeat on the second Friday of every month. |

## DayOfWeekOccurrence

The day of the week occurrence in the month.

| Enums | |
| --- | --- |
| `DAY_OF_WEEK_OCCURRENCE_UNSPECIFIED` | Unspecified day of the week occurrence. |
| `FIRST` | First day of the week in the month. |
| `SECOND` | Second day of the week in the month. |
| `THIRD` | Third day of the week in the month. |
| `FOURTH` | Fourth day of the week in the month. |
| `LAST` | Last day of the week in the month. |

## WeeklyOccurrencePattern

Represents a weekly occurrence pattern.

| Fields | |
| --- | --- |
| `days_of_week[]` | `DayOfWeek`  Optional. The list of the week days for the offer/event. If empty, the post will repeat on the same day of the week as the event's schedule.start\_time. |

## LocalPostOffer

Specific fields for offer posts.

| Fields | |
| --- | --- |
| `coupon_code` | `string`  Optional. Offer code that is usable in store or online. |
| `redeem_online_url` | `string`  Optional. Online link to redeem offer. |
| `terms_conditions` | `string`  Optional. Offer terms and conditions. |

## LocalPostTopicType

The topic type of the local post, which is used to select different templates to create and render a post.

| Enums | |
| --- | --- |
| `LOCAL_POST_TOPIC_TYPE_UNSPECIFIED` | No post type is specified. |
| `STANDARD` | Post contains basic information, like summary and images. |
| `EVENT` | Post contains basic information and an event. |
| `OFFER` | Post contains basic information, an event and offer related content (e.g. coupon code) |
| `ALERT` | High-priority, and timely announcements related to an ongoing event. These types of posts are not always available for authoring. |

## LocationReview

Represents a review with location information.

| Fields | |
| --- | --- |
| `name` | `string`  Location resource name. |
| `review` | `Review`  A review for the location. |

## MediaItem

A single media item.

| Fields | |
| --- | --- |
| `name` | `string`  The resource name for this media item. `accounts/{account_id}/locations/{location_id}/media/{media_key}` |
| `media_format` | `MediaFormat`  The format of this media item. Must be set when the media item is created, and is read-only on all other requests. Cannot be updated. |
| `location_association` | `LocationAssociation`  Required when calling `CreatePhoto`. Describes how this media item is connected to its location. Must be either a category (for example, EXTERIOR) or the ID of a price list item.  This is required when adding new media to a location with `CreateMediaItem`. For other types of media, for example, photos on local posts, this will not be present. |
| `google_url` | `string`  Output only. Google-hosted URL for this media item. This URL is not static since it may change over time. For video this will be a preview image with an overlaid play icon. |
| `thumbnail_url` | `string`  Output only. Where provided, the URL of a thumbnail image for this media item. |
| `create_time` | `Timestamp`  Output only. Creation time of this media item. |
| `dimensions` | `Dimensions`  Output only. The dimensions (width and height) in pixels. |
| `insights (deprecated)` | `MediaInsights`  Output only. Statistics for this media item. |
| `attribution` | `Attribution`  Output only. Attribution information for customer media items. You must display this attribution as provided to your users and must not delete or alter the attribution. |
| `description` | `string`  Description for this media item. Descriptions cannot be modified through the My Business API, but can be set when creating a new media item that is not a cover photo. |
| Union field `data`. The media item's data source. When creating a new media item, either a URL or data ref must be provided.  With the exception of `PROFILE` and `COVER` category, all photos must measure a minimum of 250px on the short edge, with a file size of at least 10240 bytes.  All uploaded photos should follow the [Google My Business guidelines for photos](https://support.google.com/business/answer/6031953). `data` can be only one of the following: | |
| `source_url` | `string`  A publicly accessible URL where the media item can be retrieved from.  When creating one of this or data\_ref must be set to specify the source of the media item.  If `source_url` was used when creating a media item, it will be populated with that source URL when the media item is retrieved.  This field cannot be updated. |
| `data_ref` | `MediaItemDataRef`  Input only. A reference to media item binary data as obtained by the `StartUploadMediaItemData` method.  When creating a media item, either  `sourceUrl`  or  `dataRef`  must be set. |

## Attribution

Attribution information for customer media items, such as the contributor's name and profile picture.

| Fields | |
| --- | --- |
| `profile_name` | `string`  The user name to attribute the media item to. |
| `profile_photo_url` | `string`  URL of the attributed user's profile photo thumbnail. |
| `takedown_url` | `string`  The URL of the takedown page, where the media item can be reported if it is inappropriate. |
| `profile_url` | `string`  The URL of the attributed user's Google Maps profile page. |

## Dimensions

Dimensions of the media item.

| Fields | |
| --- | --- |
| `width_pixels` | `int32`  Width of the media item, in pixels. |
| `height_pixels` | `int32`  Height of the media item, in pixels. |

## LocationAssociation

How the media item is associated with its location.

| Fields | |
| --- | --- |
| Union field `location_attachment_type`. Location media must either have a category or the ID of a price list item that they are associated with. Non-location media (for example, local post photos) must have neither. `location_attachment_type` can be only one of the following: | |
| `category` | `Category`  The category that this location photo belongs to. |
| `price_list_item_id` | `string`  The ID of a price list item that this location photo is associated with. |

## Category

Enum for media item category.

| Enums | |
| --- | --- |
| `CATEGORY_UNSPECIFIED` | Unspecified category. |
| `COVER` | Cover photo. A location has only one cover photo. |
| `PROFILE` | Profile photo. A location has only one profile photo. |
| `LOGO` | Logo photo. |
| `EXTERIOR` | Exterior media. |
| `INTERIOR` | Interior media. |
| `PRODUCT` | Product media. |
| `AT_WORK` | 'At-work' media. |
| `FOOD_AND_DRINK` | Food and drink media. |
| `MENU` | Menu media. |
| `COMMON_AREA` | Common area media. |
| `ROOMS` | Rooms media. |
| `TEAMS` | Teams media. |
| `ADDITIONAL` | Additional, uncategorized media. |

## MediaFormat

Enum for media format.

| Enums | |
| --- | --- |
| `MEDIA_FORMAT_UNSPECIFIED` | Format unspecified. |
| `PHOTO` | Media item is a photo. In this version, only photos are supported. |
| `VIDEO` | Media item is a video. |

## MediaInsights

Deprecated Insights and statistics for the media item.

| Fields | |
| --- | --- |
| `view_count` | `int64`  Output only. The number of times the media item has been viewed. |

## MediaItemDataRef

Reference to the photo binary data of a `MediaItem` uploaded through the My Business API.

Create a data ref using `StartUploadMediaItemData`, and use this ref when uploading bytes to [UpdateMedia] and subsequently calling `CreateMediaItem`.

| Fields | |
| --- | --- |
| `resource_name` | `string`  The unique ID for this media item's binary data. Used to upload the photo data with [UpdateMedia] and when creating a new media item from those bytes with `CreateMediaItem`.  Example of uploading bytes: `curl -X POST -T{path_to_file} "http://mybusiness.googleapis.com/upload/v1/media/{resource_name}?upload_type=media"`  For `CreateMediaItem` calls, set this as the `MediaItem` `data_ref`. |

## MenuLabel

Label to be used when displaying the menu and its various sub-components.

| Fields | |
| --- | --- |
| `display_name` | `string`  Required. Display name of the component. |
| `description` | `string`  Optional. Supplementary information of the component. |
| `language_code` | `string`  Optional. The BCP 47 code of language. If the language is not available, it will default to English. |

## NutritionFacts

This message represents nutrition facts for a food dish.

| Fields | |
| --- | --- |
| `calories` | `CaloriesFact`  Optional. Calories of the dish. |
| `total_fat` | `NutritionFact`  Optional. Fat information for a given food dish. |
| `cholesterol` | `NutritionFact`  Optional. Cholesterol information for a given food dish. |
| `sodium` | `NutritionFact`  Optional. Sodium information for a given food dish. |
| `total_carbohydrate` | `NutritionFact`  Optional. Carbohydrate information for a given food dish. |
| `protein` | `NutritionFact`  Optional. Protein information for a given food dish. |

## CaloriesFact

This message denotes calories information with an upper bound and lower bound range. Lower amount must be specified. Both lower and upper amounts are non-negative numbers.

| Fields | |
| --- | --- |
| `lower_amount` | `int32`  Required. Lower amount of calories |
| `upper_amount` | `int32`  Optional. Upper amount of calories |
| `unit` | `EnergyUnit`  Required. Unit of the given calories information. |

## EnergyUnit

Possible units of food energy (calories).

| Enums | |
| --- | --- |
| `ENERGY_UNIT_UNSPECIFIED` | Energy unit unspecified |
| `CALORIE` | Calorie |
| `JOULE` | Joule |

## MassUnit

Possible units of mass.

| Enums | |
| --- | --- |
| `MASS_UNIT_UNSPECIFIED` | Mass unit unspecified |
| `GRAM` | Gram |
| `MILLIGRAM` | Milligram |

## NutritionFact

This message denotes nutrition information with an upper bound and lower bound range and can be represented by mass unit. Lower amount must be specified. Both lower and upper amounts are non-negative numbers.

| Fields | |
| --- | --- |
| `lower_amount` | `double`  Required. Lower amount of nutrition |
| `upper_amount` | `double`  Optional. Upper amount of nutrition |
| `unit` | `MassUnit`  Required. Unit of the given nutrition information. |

## PreparationMethod

Preparation method of a food dish.

| Enums | |
| --- | --- |
| `PREPARATION_METHOD_UNSPECIFIED` | Preparation method unspecified |
| `BAKED` | Baked method |
| `BARBECUED` | Barbecued method |
| `BASTED` | Basted method |
| `BLANCHED` | Blanched method |
| `BOILED` | Boiled method |
| `BRAISED` | Braised method |
| `CODDLED` | Coddled method |
| `FERMENTED` | Fermented method |
| `FRIED` | Fried method |
| `GRILLED` | Grilled method |
| `KNEADED` | Kneaded method |
| `MARINATED` | Marinated method |
| `PAN_FRIED` | Pan fried method |
| `PICKLED` | Pickled method |
| `PRESSURE_COOKED` | Pressure cooked method |
| `ROASTED` | Roasted method |
| `SAUTEED` | Sauteed method |
| `SEARED` | Seared method |
| `SIMMERED` | Simmered method |
| `SMOKED` | Smoked method |
| `STEAMED` | Steamed method |
| `STEEPED` | Steeped method |
| `STIR_FRIED` | Stir fried method |
| `OTHER_METHOD` | Other method |

## Review

Output only. Represents a review for a location.

| Fields | |
| --- | --- |
| `name` | `string`  The resource name. For Review it is of the form `accounts/{account_id}/locations/{location_id}/reviews/{review_id}` |
| `review_id` | `string`  The encrypted unique identifier. |
| `reviewer` | `Reviewer`  The author of the review. |
| `star_rating` | `StarRating`  The star rating of the review. |
| `comment` | `string`  The body of the review as plain text with markups. |
| `create_time` | `Timestamp`  The timestamp for when the review was written. |
| `update_time` | `Timestamp`  The timestamp for when the review was last modified. |
| `review_reply` | `ReviewReply`  The owner/manager of this location's reply to this review. |
| `review_media_items[]` | `ReviewMediaItem`  Output only. The media items associated with the review. |
| `review_reply_url` | `string`  Output only. URL for replying to the review. |

## ReviewMediaItem

Represents a media item (photo or video) associated with a review.

| Fields | |
| --- | --- |
| `thumbnail_url` | `string`  Output only. FIFE url for the photo, or video thumbnail if `video_url` is present. |
| `thumbnail_label` | `string`  Output only. Author-provided label for the `thumbnail_url`. |
| `video_url` | `string`  Output only. Playable video url. |

## Reviewer

Represents the author of the review.

| Fields | |
| --- | --- |
| `profile_photo_url` | `string`  The profile photo link of the reviewer. Only populated if `is_anonymous` is false. |
| `display_name` | `string`  The name of the reviewer. Only populated with the reviewer's real name if `is_anonymous` is false. |
| `is_anonymous` | `bool`  Indicates whether the reviewer has opted to remain anonymous. |

## StarRating

The star rating out of five, where five is the highest rated.

| Enums | |
| --- | --- |
| `STAR_RATING_UNSPECIFIED` | Not specified. |
| `ONE` | One star out of a maximum of five. |
| `TWO` | Two stars out of a maximum of five. |
| `THREE` | Three stars out of a maximum of five. |
| `FOUR` | Four stars out of a maximum of five. |
| `FIVE` | The maximum star rating. |

## ReviewReply

Represents the location owner's/manager's reply to a review.

| Fields | |
| --- | --- |
| `comment` | `string`  The body of the reply as plain text with markups. The maximum length is 4096 bytes. |
| `update_time` | `Timestamp`  Output only. The timestamp for when the reply was last modified. |
| `review_reply_state` | `State`  Output only. The state of the review reply. |
| `policy_violation` | `PolicyViolation`  Optional. Output only. The policy violation that resulted in rejection. Only populated if review\_reply\_state is REJECTED. |

## PolicyViolation

Represents standardized policy violations. New values may be added in the future. Clients should be prepared to handle unknown values.

| Enums | |
| --- | --- |
| `POLICY_VIOLATION_UNSPECIFIED` | Represents an unspecified policy violation. |
| `ACCOUNT_RESTRICTED_AND_SUSPENDED` | A Google Account associated with this Business Profile has been placed under restriction, resulting in the suspension of the Business Profile. |
| `ACCOUNT_RESTRICTED_AND_EDIT_REJECTED` | A Google Account associated with this Business Profile has been placed under restriction, causing edits to be rejected. Unlike ACCOUNT\_RESTRICTED\_AND\_SUSPENDED, the Business Profile itself remains active and is not suspended. |
| `ASSOCIATED_ACCOUNT_SUSPENDED` | A Google Account associated with this Business Profile is not in good standing. Business Profiles associated with that account have been suspended. |
| `BUSINESS_INELIGIBLE` | Your business is not eligible for a Business Profile. |
| `OWNERSHIP_REVOKED` | Another Google Account has claimed this Business Profile. You can no longer manage this profile. |
| `LOCATION_SUSPENDED` | This Business Profile has been suspended. |
| `LOCATION_DISABLED` | This Business Profile has been disabled. |
| `LOCATION_VERIFICATION_REQUIRED` | This Business Profile is not verified. |
| `PO_BOX` | Your Business Profile has been suspended because your business address can't be a PO box. |
| `GOOGLE_PAY_SUSPENSION` | Business Profiles associated with your Payments profile have been suspended. |
| `EDITING_RESTRICTION` | This Business Profile is currently restricted from receiving public updates. Google has turned editing for this location to prevent policy-violating content. |
| `ILLEGAL_BUSINESS_HOURS_EDIT` | Your business category can't edit business hours. |
| `FAKE_ENGAGEMENT` | Content that violates our policy on fake engagement isn't allowed. Fake engagement includes incentivized content, content intended to manipulate a place's rating, and other content that doesn't represent a genuine experience. |
| `ADULT_THEMED` | Content that violates our policy on adult-themed content isn't allowed. Adult themes include both non-explicit sexual content and other adult content. |
| `SEXUALLY_EXPLICIT` | Content that violates our policy on sexually explicit content isn't allowed. Sexually explicit content includes genital nudity or depictions or descriptions of sexual acts. |
| `ADVERTISING_AND_SOLICITATION` | Content that violates our policy on advertising or solicitation isn't allowed. Advertising and solicitation includes promotional or commercial content, or content posted in exchange for benefits. |
| `DANGEROUS` | Content that violates our policy on dangerous content isn't allowed. Dangerous content promotes, facilitates, or encourages harmful acts. |
| `GIBBERISH_AND_REPETITIVE` | Content that violates our policy on unclear or repetitive content isn't allowed. Unclear or repetitive content dilutes useful information others can find on Google. |
| `REPETITIVE` | Content that violates our policy on repetitive content isn't allowed. Repetitive content includes identical or similar content added multiple times by one or more accounts. |
| `UNCLEAR` | Content that violates our policy on unclear content isn't allowed. Unclear content includes random characters or other content that lacks meaning. |
| `ILLEGAL` | Content that violates our policy on illegal content isn't allowed. |
| `OFF_TOPIC` | Content that violates our policy on off-topic content isn't allowed. Off-topic content includes general, political, or social commentary, and personal rants. |
| `OFFENSIVE` | Content that violates our policy on offensive content isn't allowed. Offensive content may reasonably cause another to experience extreme anger, insult, or disrespect. |
| `VIOLENCE_AND_GORE` | Content that violates our policy on violence and gore isn't allowed. Violence and gore includes content involving people or animals that is extreme and depicts realistic acts of violence, blood, body parts, or viscera. |
| `CHILD_SAFETY` | Content that violates our policy on child safety isn't allowed. This includes subject matter that puts children at risk, exploits or abuses children, or uses Google services to endanger children. |
| `HARASSMENT` | Content that violates our policy on harassment isn't allowed. This includes content that bullies, threatens, sexualizes, or causes a person to fear for their safety. |
| `HATE_SPEECH` | Content that violates our policy on hate speech isn't allowed. Hate speech includes promoting or condoning violence, discrimination, disparagement, or inciting hatred based on a protected characteristic or other characteristics associated with systemic discrimination or marginalization. |
| `IMPERSONATION` | Content that violates our policy on impersonation isn't allowed. Impersonation includes assuming a false identity in order to mislead others or gain improper benefits. |
| `MISINFORMATION` | Content that violates our policy on misinformation isn't allowed. Misinformation includes false or inaccurate information that may cause significant harm to individuals, businesses, or society. |
| `MISREPRESENTATION` | Content that violates our policy on misrepresentation isn't allowed. Misrepresentation includes misleading representations or omissions for the purpose of gaining improper benefit. |
| `OBSCENITY_AND_PROFANITY` | Content that violates our policy on obscenity or profanity isn't allowed. Obscenity and profanity includes words or gestures that are locally considered socially offensive or vulgar. |
| `PERSONAL_INFO` | Content that violates our policy on personal information isn't allowed. Personal information includes private or confidential information, such as credit card details, medical records, or government-issued identification, whether yours or someone else's. |
| `REGULATED_GOODS_AND_SERVICES` | Content that violates our policy on regulated goods and services isn't allowed. This includes featuring calls to action or offers for the sale of products or services that are subject to local legal regulations. |
| `GENERIC_VANDALISM` | Content that violates our policies on abusive or low quality content isn't allowed. |
| `GENERIC_FRAUD` | Content that violates our policies on deceptive content and behavior isn't allowed. Deceptive content intentionally misleads or deceives others. |
| `PHOTOS_AND_VIDEOS_CRITERIA` | Content that doesn't follow our photo and video criteria isn't allowed. |
| `MODERATION_ERROR` | An error occurred while processing your content. |
| `PRIVACY` | Content that violates the Maps User Contributed Content privacy policy isn't allowed. |
| `GENERIC_VIOLATION` | Your content violates our policies and isn't allowed. |
| `GENERIC_QUALITY` | Content that violates our policies on low quality content isn't allowed. |
| `IDENTITY_CHANGE` | The change made by you is very different from the business created. This violates our policy. |
| `GEOGRAPHIC_LOCATION_CHANGE` | Indicates the physical geographic location (address or latitude/longitude) of the business has changed significantly since the profile was created. |

## State

Represents the moderation state of a review reply.

| Enums | |
| --- | --- |
| `REVIEW_REPLY_STATE_UNSPECIFIED` | Indicates that the state is unspecified. |
| `PENDING` | Indicates that the reply is pending moderation. |
| `REJECTED` | Indicates that the reply was rejected. |
| `APPROVED` | Indicates that the reply was approved. |

## Spiciness

The spiciness level of a food item.

| Enums | |
| --- | --- |
| `SPICINESS_UNSPECIFIED` | Level unspecified |
| `MILD` | Denotion of mild spicy. |
| `MEDIUM` | Denotion of medium spicy. |
| `HOT` | Denotion of hot spicy. The most spiciest level. |

## StartUploadMediaItemDataRequest

Request message for Media.StartUploadMediaItemData.

| Fields | |
| --- | --- |
| `parent` | `string`  The resource name of the location this media item is to be added to. |

## TimeInterval

An interval of time, inclusive. It must contain all fields to be valid.

| Fields | |
| --- | --- |
| `start_date` | `Date`  The start date of this period. |
| `start_time` | `TimeOfDay`  The start time of this period. |
| `end_date` | `Date`  The end date of this period. |
| `end_time` | `TimeOfDay`  The end time of this period. |

## UpdateFoodMenusRequest

Request message for FoodMenu.UpdateFoodMenus

| Fields | |
| --- | --- |
| `food_menus` | `FoodMenus`  Required. The updated food menu information. Menu can be unset by updating without any menu sections. |
| `update_mask` | `FieldMask`  Optional. The specific fields to update. If no mask is specified, then this is treated as a full update and all fields are set to the values passed in, which may include unsetting empty fields in the request. Repeated field items can not be individually updated. Note: "name" of FoodMenus is the resource identifier which is not updatable. |

## UpdateLocalPostRequest

Request message for UpdateLocalPost.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the local post to update. |
| `local_post` | `LocalPost`  The updated local post information. |
| `update_mask` | `FieldMask`  The specific fields to update. You must specify each field that is being updated in the mask. |

## UpdateMediaItemRequest

Request message for Media.UpdateMediaItem.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the media item to be updated. |
| `media_item` | `MediaItem`  The media item to be updated.  Only the category or price list item id can be updated. |
| `update_mask` | `FieldMask`  The specific fields to update. If no mask is specified, then this is treated as a full update and all editable fields are set to the values passed in. |

## UpdateReviewReplyRequest

Request message for Reviews.UpdateReviewReply.

| Fields | |
| --- | --- |
| `name` | `string`  The name of the review to respond to. |
| `review_reply` | `ReviewReply`  The reply to the review. If a reply already exists, this will replace the old reply. |

## ValidationError

Describes validation failures in a client request.

| Fields | |
| --- | --- |
| `error_details[]` | `ErrorDetail`  Details individual validation failures with integer error codes. |
