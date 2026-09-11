---
title: "media REST reference"
source: "https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media"
final_url: "https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "33ff74ace3ed429e91e653fa1df3c044c4047f0809625cb3dc437bc8bf50e9a6"
---

# REST Resource: accounts.locations.media Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- `MediaItem` resource represents a single media item associated with a Google My Business location, encompassing photos and videos.
- Media items can be categorized (e.g., COVER, EXTERIOR), attributed to users, and have insightful statistics like view counts.
- The API provides methods to manage media items, including creation, deletion, retrieval, updating, and listing.
- Before creating a media item, you can generate a `MediaItemDataRef` using `startUpload` to facilitate uploading binary data.
- When creating media, ensure to comply with size and format requirements, and adhere to Business Profile guidelines for photos.

- [Resource: MediaItem](#MediaItem)
  - [JSON representation](#MediaItem.SCHEMA_REPRESENTATION)
  - [MediaItemDataRef](#MediaItem.MediaItemDataRef)
    - [JSON representation](#MediaItem.MediaItemDataRef.SCHEMA_REPRESENTATION)
  - [MediaFormat](#MediaItem.MediaFormat)
  - [LocationAssociation](#MediaItem.LocationAssociation)
    - [JSON representation](#MediaItem.LocationAssociation.SCHEMA_REPRESENTATION)
  - [Category](#MediaItem.Category)
  - [Dimensions](#MediaItem.Dimensions)
    - [JSON representation](#MediaItem.Dimensions.SCHEMA_REPRESENTATION)
  - [MediaInsights](#MediaItem.MediaInsights)
    - [JSON representation](#MediaItem.MediaInsights.SCHEMA_REPRESENTATION)
  - [Attribution](#MediaItem.Attribution)
    - [JSON representation](#MediaItem.Attribution.SCHEMA_REPRESENTATION)
- [Methods](#METHODS_SUMMARY)

## Resource: MediaItem

A single media item.

| JSON representation | |
| --- | --- |
| ``` {   "name": string,   "mediaFormat": enum (MediaFormat),   "locationAssociation": {     object (LocationAssociation)   },   "googleUrl": string,   "thumbnailUrl": string,   "createTime": string,   "dimensions": {     object (Dimensions)   },   "insights": {     object (MediaInsights)   },   "attribution": {     object (Attribution)   },   "description": string,    // Union field data can be only one of the following:   "sourceUrl": string,   "dataRef": {     object (MediaItemDataRef)   }   // End of list of possible types for union field data. } ``` |

| Fields | |
| --- | --- |
| `name` | `string`  The resource name for this media item. `accounts/{accountId}/locations/{locationId}/media/{mediaKey}` |
| `mediaFormat` | `enum (MediaFormat)`  The format of this media item. Must be set when the media item is created, and is read-only on all other requests. Cannot be updated. |
| `locationAssociation` | `object (LocationAssociation)`  Required when calling `CreatePhoto`. Describes how this media item is connected to its location. Must be either a category (for example, EXTERIOR) or the ID of a price list item.  This is required when adding new media to a location with `media.create`. For other types of media, for example, photos on local posts, this will not be present. |
| `googleUrl` | `string`  Output only. Google-hosted URL for this media item. This URL is not static since it may change over time. For video this will be a preview image with an overlaid play icon. |
| `thumbnailUrl` | `string`  Output only. Where provided, the URL of a thumbnail image for this media item. |
| `createTime` | `string (Timestamp format)`  Output only. Creation time of this media item.  A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: `"2014-10-02T15:01:23Z"` and `"2014-10-02T15:01:23.045123456Z"`. |
| `dimensions` | `object (Dimensions)`  Output only. The dimensions (width and height) in pixels. |
| `insights` | `object (MediaInsights)`  Output only. Statistics for this media item. |
| `attribution` | `object (Attribution)`  Output only. Attribution information for customer media items. You must display this attribution as provided to your users and must not delete or alter the attribution. |
| `description` | `string`  Description for this media item. Descriptions cannot be modified through the Google My Business API, but can be set when creating a new media item that is not a cover photo. |
| Union field `data`. The media item's data source. When creating a new media item, either a URL or data ref must be provided.  With the exception of `PROFILE` and `COVER` category, all photos must measure a minimum of 250px on the short edge, with a file size of at least 10240 bytes.  All uploaded photos should follow the [Business Profile guidelines for photos](https://support.google.com/business/answer/6031953). `data` can be only one of the following: | | |
| `sourceUrl` | `string`  A publicly accessible URL where the media item can be retrieved from.  When creating one of this or dataRef must be set to specify the source of the media item.  If `sourceUrl` was used when creating a media item, it will be populated with that source URL when the media item is retrieved.  This field cannot be updated. |
| `dataRef` | `object (MediaItemDataRef)`  Input only. A reference to media item binary data as obtained by the `media.startUpload` method.  When creating a media item, either  `sourceUrl`  or  `dataRef`  must be set. |

### MediaItemDataRef

Reference to the photo binary data of a `MediaItem` uploaded through the Google My Business API.

Create a data ref using `media.startUpload`, and use this ref when uploading bytes to [media.upload] and subsequently calling `media.create`.

| JSON representation | |
| --- | --- |
| ``` {   "resourceName": string } ``` |

| Fields | |
| --- | --- |
| `resourceName` | `string`  The unique ID for this media item's binary data. Used to upload the photo data with [media.upload] and when creating a new media item from those bytes with `media.create`.  Example of uploading bytes: `curl -X POST -T{path_to_file} "http://mybusiness.googleapis.com/upload/v1/media/{resourceName}?uploadType=media"`  For `media.create` calls, set this as the `MediaItem` `dataRef`. |

### MediaFormat

Enum for media format.

| Enums | |
| --- | --- |
| `MEDIA_FORMAT_UNSPECIFIED` | Format unspecified. |
| `PHOTO` | Media item is a photo. In this version, only photos are supported. |
| `VIDEO` | Media item is a video. |

### LocationAssociation

How the media item is associated with its location.

| JSON representation | |
| --- | --- |
| ``` {    // Union field location_attachment_type can be only one of the following:   "category": enum (Category),   "priceListItemId": string   // End of list of possible types for union field location_attachment_type. } ``` |

| Fields | |
| --- | --- |
| Union field `location_attachment_type`. Location media must either have a category or the ID of a price list item that they are associated with. Non-location media (for example, local post photos) must have neither. `location_attachment_type` can be only one of the following: | | |
| `category` | `enum (Category)`  The category that this location photo belongs to. |
| `priceListItemId` | `string`  The ID of a price list item that this location photo is associated with. |

### Category

Enum for media item category.

| Enums | |
| --- | --- |
| `CATEGORY_UNSPECIFIED` | Unspecified category. |
| `COVER` | Cover photo. A location has only one cover photo. |
| `PROFILE` | Profile photo. A location has only one profile photo. |
| `LOGO` | Logo photo.  `LOGO` is treated as an alias for `PROFILE`; any `LOGO` uploads are automatically mapped to `PROFILE`. Use `PROFILE` instead. |
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

### Dimensions

Dimensions of the media item.

| JSON representation | |
| --- | --- |
| ``` {   "widthPixels": integer,   "heightPixels": integer } ``` |

| Fields | |
| --- | --- |
| `widthPixels` | `integer`  Width of the media item, in pixels. |
| `heightPixels` | `integer`  Height of the media item, in pixels. |

### MediaInsights

Insights and statistics for the media item.

| JSON representation | |
| --- | --- |
| ``` {   "viewCount": string } ``` |

| Fields | |
| --- | --- |
| `viewCount` | `string (int64 format)`  Output only. The number of times the media item has been viewed. |

### Attribution

Attribution information for customer media items, such as the contributor's name and profile picture.

| JSON representation | |
| --- | --- |
| ``` {   "profileName": string,   "profilePhotoUrl": string,   "takedownUrl": string,   "profileUrl": string } ``` |

| Fields | |
| --- | --- |
| `profileName` | `string`  The user name to attribute the media item to. |
| `profilePhotoUrl` | `string`  URL of the attributed user's profile photo thumbnail. |
| `takedownUrl` | `string`  The URL of the takedown page, where the media item can be reported if it is inappropriate. |
| `profileUrl` | `string`  The URL of the attributed user's Google Maps profile page. |

| Methods | |
| --- | --- |
| `create` | Creates a new media item for the location. |
| `delete` | Deletes the specified media item. |
| `get` | Returns metadata for the requested media item. |
| `list` | Returns a list of media items associated with a location. |
| `patch` | Updates metadata of the specified media item. |
| `startUpload` | Generates a `MediaItemDataRef` for media item uploading. |
