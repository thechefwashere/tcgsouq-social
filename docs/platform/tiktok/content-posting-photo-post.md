---
title: "Photo post reference"
source: "https://developers.tiktok.com/doc/content-posting-api-reference-photo-post"
final_url: "https://developers.tiktok.com/docs/en/content-posting-api-reference-photo-post"
platform: "tiktok"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "3f442c1df6a3bcb2822429ccf0553ecd0922adce2e3bf829a4ca4910fa422402"
---

# Photo

## [#](#overview)Overview

The /v2/post/publish/content/init/ endpoint allows you to post directly or upload photos to TikTok.

|  |  |
| --- | --- |
| HTTP URL | /v2/post/publish/content/init/ |
| HTTP Method | POST |
| Scope | video.publish or video.upload |

To directly post photos to users' TikTok accounts, you must query creator information to render the UI elements to be displayed on the export page of your app before you call this Content Posting API.

1. Learn more about the [UX guidelines.](/docs/en/content-sharing-guidelines)
2. Learn more about the [creator\_info/query API](/docs/en/content-posting-api-reference-query-creator-info).

## [#](#request)Request

**Note**: Each user access\_token is limited to six requests per minute.

### [#](#header)Header

|  |  |  |  |
| --- | --- | --- | --- |
| **Field Name** | **Description** | **Value** | **Required** |
| Authorization | The token that bears the authorization of the TikTok user, which is obtained through /oauth/access\_token/ | Bearer {$UserAccessToken} | true |
| Content-Type | The content format of the body of this HTTP request | application/json; charset=UTF-8 | true |

### [#](#body)Body

|  |  |  |  |
| --- | --- | --- | --- |
| **Field** | **Type** | **Description** | **Required** |
| media\_type | string | Currently only PHOTO is allowed | true |
| post\_mode | string | Enum of:  DIRECT POST: Directly post the content to TikTok user's account.  MEDIA\_UPLOAD: Upload content to TikTok for users to complete the post using TikTok's editing flow. Users will receive an inbox notification. | true |
| post\_info | [Post Info Object](#eK35Sd) | The post information | true |
| source\_info | [Source Info Object](#D9SdTz) | The media source information | true |
| is\_aigc | bool | Set to `true` if the photo is AI generated content. If set, the photo will be labeled with an AI-generated tag in the description. | false |

#### [#](#post_info_object)Post Info Object

|  |  |  |  |
| --- | --- | --- | --- |
| **Field** | **Type** | **Description** | **Required** |
| title | string | The post title. The maximum length for photo posts is 90 in UTF-16 runes. | false |
| description | string | The post description. The maximum length for photo posts is 4000 in UTF-16 runes. | false |
| privacy\_level | string | Enum of:  PUBLIC\_TO\_EVERYONE  MUTUAL\_FOLLOW\_FRIENDS  FOLLOWER\_OF\_CREATOR  SELF\_ONLY    The provided value must match one of the privacy\_level\_options returned in the /creator\_info/query/ API. | Required for DIRECT POST |
| disable\_comment | bool | Only works for post\_mode = DIRECT POST.  If set to true, other TikTok users will not be allowed to make comments on this post. | false |
| auto\_add\_music | bool | Only works for post\_mode = DIRECT POST.  If set to true, recommended music will be automatically added to photos, and users can later choose to change the post's music in TikTok if they prefer other music. | false |
| brand\_content\_toggle | bool | Only works for post\_mode = DIRECT POST.  Set to true if the content is a paid partnership to promote a third-party business. | true |
| brand\_organic\_toggle | bool | Only works for post\_mode = DIRECT POST.  Set to true if this content is promoting the creator's own business. | true |

#### [#](#source_info_object)Source Info Object

|  |  |  |  |
| --- | --- | --- | --- |
| **Field** | **Type** | **Description** | **Required** |
| source | string | Only PULL\_FROM\_URL is allowed | true |
| photo\_images | list<string> | An array containing up to 35 photo content URLs. The URLs must be publicly accessible and verified by your app. Learn more about [pulling from URLs](/docs/en/content-posting-api-media-transfer-guide#pull_from_url). | true |
| photo\_cover\_index | int | Indicates the index (starting from 0) of the photo to be used as the cover | true |

### [#](#example)Example

#### [#](#direct_post)Direct Post

**Note**: To use Direct Post, the target TikTok user must have authorized your app for the video.publish scope.

All content posted by unaudited clients will be restricted to private viewing mode. Once you have successfully tested your integration, to lift the restrictions on content visibility, your API client must [undergo an audit](https://developers.tiktok.com/application/content-posting-api) to verify compliance with our [Terms of Service](https://www.tiktok.com/legal/tik-tok-developer-terms-of-service?lang=en).

```
curl --location 'https://open.tiktokapis.com/v2/post/publish/content/init/' \
--header 'Authorization: Bearer act.example12345Example12345Example' \
--header 'Content-Type: application/json' \
--data-raw '{
    "post_info": {
        "title": "funny cat",
        "description": "this will be a #funny photomode on your @tiktok #fyp",
        "disable_comment": true,
        "privacy_level": "PUBLIC_TO_EVERYONE",
        "auto_add_music": true
    },
    "source_info": {
        "source": "PULL_FROM_URL",
        "photo_cover_index": 1,
        "photo_images": [
            "https://tiktokcdn.com/obj/example-image-01.webp",
            "https://tiktokcdn.com/obj/example-image-02.webp"
        ]
    },
    "post_mode": "DIRECT_POST",
    "media_type": "PHOTO"
}'
```

#### [#](#upload_)Upload

After uploading from your app, you should inform users that they must click on inbox notifications to continue the editing flow in TikTok and complete the post. Title and description parameters are now supported with sending photos.

**Note**: To use upload method, the target TikTok user must have authorized your app for the video.upload scope.

We now support sending title and description in this method and it will be reflected in the editing flow once user clicks on the inbox notification.

```
curl --location 'https://open.tiktokapis.com/v2/post/publish/content/init/' \
--header 'Authorization: Bearer act.example12345Example12345Example' \
--header 'Content-Type: application/json' \
--data-raw '{
    "post_info": {
        "title": "funny cat",
        "description": "this will be a #funny photomode on your @tiktok #fyp"
    },
    "source_info": {
        "source": "PULL_FROM_URL",
        "photo_cover_index": 1,
        "photo_images": [
            "https://tiktokcdn.com/obj/example-image-01.webp",
            "https://tiktokcdn.com/obj/example-image-02.webp"
        ]
    },
    "post_mode": "MEDIA_UPLOAD",
    "media_type": "PHOTO"
}'
```

## [#](#response)Response

|  |  |  |  |
| --- | --- | --- | --- |
| **Field Name** | **Nested Field** | **Type** | **Description** |
| data | publish\_id | string | An identifier to track the posting action, which you can use to check status. The maximum length of this field is 64. |
| error | code | string | You can decide whether the request is successful based on the error code. Any code other than ok indicates the request did not succeed. Learn more about [error codes](#DU14lm). |
| message | string | A human-readable description of the error |
| logid | string | A unique identifier for the execution of this request |

### [#](#example_2)Example

```
200 OK
{
    "data": {
        "publish_id": "p_pub_url~v2.123456789"
    },
    "error": {
         "code": "ok",
         "message": "",
         "log_id": "202210112248442CB9319E1FB30C1073F3"
     }
}
```

### [#](#error_codes)Error codes

|  |  |  |
| --- | --- | --- |
| **HTTP Status** | **error.code** | **Description** |
| 400 | invalid\_param | Check error message for details |
| app\_version\_check\_failed | To use MEDIA\_UPLOAD post\_mode, users' TikTok APP version must not be less than 31.8 |
| 403 | spam\_risk\_too\_many\_posts | The daily post cap from API is reached for the current user |
| spam\_risk\_user\_banned\_from\_posting | The user is banned from making new posts |
| spam\_risk\_too\_many\_pending\_share | The daily upload cap from the API is reached for the current user.  To reduce spamming, TikTok limits the number of videos that can be uploaded via API that are not pending approval and posting by the creator. There may be at most 5 pending shares within any 24-hour period. |
| reached\_active\_user\_cap | The daily quota for active publishing users from your client is reached |
| unaudited\_client\_can\_only\_post\_to\_private\_accounts | Unaudited clients can only post to private account. The publish attempt will be blocked when calling /publish/content/init/. |
| url\_ownership\_unverified | To use PULL\_FROM\_URL as the content transfer method, developer must verify the ownership of the URL prefix or domain. Learn more about [content transfer](/docs/en/content-posting-api-media-transfer-guide). |
| privacy\_level\_option\_mismatch | privacy\_level is either unspecified or not among the options from the privacy\_level\_options returned in /publish/creator\_info/query/ API.    All clients are required to correctly display the creator account's privacy level options and honor the users' choice. Occurances of this error for product-use applications suggest violations to TikTok's product-use guidance. |
| 401 | access\_token\_invalid | The access\_token is invalid or has expired |
| scope\_not\_authorized | The access\_token does not bear user's grant on video.publish or video.upload scope |
| 429 | rate\_limit\_exceeded | Your request is blocked due to exceeding the API rate limit |
| 5xx | internal\_error | TikTok server or network error. Try again later. |
