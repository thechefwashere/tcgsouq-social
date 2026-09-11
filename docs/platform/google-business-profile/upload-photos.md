---
title: "Upload photos"
source: "https://developers.google.com/my-business/content/upload-photos"
final_url: "https://developers.google.com/my-business/content/upload-photos"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "fa9b0326e5cdcec341e9020df0bb290eb3d16b7702c4cdf7567a48e1162e4473"
---

# Upload media Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The Google My Business API offers two methods for uploading media: directly from a URL or by uploading media from bytes.
- Uploading from a URL involves a single API call to `Media.Create`, specifying the media format, location association, and source URL.
- Uploading from bytes is a three-step process: initiating the upload, uploading the bytes using the provided resource name, and finalizing the upload with a `Media.Create` call referencing the resource name.
- While media for locations can be uploaded using both methods, media for local posts must be uploaded from a URL.

You can use the Google My Business API to upload media with the following two methods:

- [Upload from a URL](#upload-from-url).
- [Upload from bytes](#upload-from-bytes).

## Upload from a URL

To upload photos from a URL , make the following call to
`Media.Create`. Use the relevant
[category](/my-business/reference/rest/v4/accounts.locations.media#category)
as needed.

```
POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media
{
  "mediaFormat": "PHOTO",
  "locationAssociation": {
    "category": "COVER"
  },
  "sourceUrl": "http://example.com/biz/image.jpg"
}
```

To upload videos from a URL with the Google My Business API, make the following call to
`Media.Create`:

```
POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media
{
  "mediaFormat": "VIDEO",
  "locationAssociation": {
    "category": "ADDITIONAL"
  },
  "sourceUrl": "http://example.com/biz/video.mp4"
}
```

## Upload from bytes

To upload media from bytes with the Google My Business API, complete the following steps:

1. To begin the upload, make the following call:

   ```
     POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media:startUpload
   ```

   The response from the API returns a body that contains a `MediaItemDataRef`:

   ```
     {
     "resourceName": "GoogleProvidedValue"
     }
   ```
2. To upload the bytes, use the `resourceName` returned by the call made in the
   previous step. The following is an example where the media to be uploaded is a photo:

   ```
   curl -X POST -T ~/Downloads/pictureToUpload.jpg  "https://mybusiness.googleapis.com/upload/v1/media/{GoogleProvidedValue}?upload_type=media"
   ```

   The following is an example if the media is a video:

   ```
   curl -X POST -T ~/Downloads/videoToUpload.mp4  "https://mybusiness.googleapis.com/upload/v1/media/{GoogleProvidedValue}?upload_type=media"
   ```
3. Use the `resourceName` returned in Step 1 to call `Media.Create`.
   Use the relevant
   [mediaFormat](/my-business/reference/rest/v4/accounts.locations.media#mediaformat) and
   [category](/my-business/reference/rest/v4/accounts.locations.media#category).

   ```
     POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media
     {
       "mediaFormat": "PHOTO",
       "locationAssociation": {
         "category": "COVER"
       },
       "dataRef": {
         "resourceName": "GoogleProvidedValue"
       }
     }
   ```

   ```
     POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/media
     {
       "mediaFormat": "VIDEO",
       "locationAssociation": {
         "category": "ADDITIONAL"
       },
       "dataRef": {
         "resourceName": "GoogleProvidedValue"
       }
     }
   ```
