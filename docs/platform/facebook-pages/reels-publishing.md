---
title: "Reels publishing"
source: "https://developers.facebook.com/docs/video-api/guides/reels-publishing"
final_url: "https://developers.facebook.com/documentation/video-api/guides/reels-publishing"
platform: "facebook-pages"
fetched_at: "2026-09-11T10:10:27Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: "2026-09-11T09:20:10Z"
http_status: "200"
format: "markdown-served"
sha256: "9fd6bf7f02365c94f0dd89972a8adf17b2d892cb9251035de345b539d14b82ee"
---

# Reels Publishing API

This document explains how to publish a reel on a Facebook Page.  To publish a reel on a Facebook Page, you will:

1. Initialize an upload session to upload your reel to the Meta servers
2. Upload your reel
2. Publish the reel to your Facebook Page

* Optionally, you can invite a collaborator to publish the reel on their Facebook Page.

#### Sharing Disclosure

When uploading a reel using your app, the app user should be presented with disclosure of and options for control over how their Reels are used on Facebook.

#### Privacy / Who can see this?

An app user should be able to select the audience for their reel. This selection corresponds to the privacy parameter in the publishing step. Publishing to a Page has implicit public scope, and only the &#039;Public&#039; option should be available.

#### Limitations

* You can only publish Reels to Facebook Pages
* You can only crosspost Reels to Facebook Pages

#### Rate Limit

Reels API is limited to 30 API-published posts within a 24-hour moving period. This limit is enforced on the `POST /&#123;page_id&#125;/video_reels` endpoint when attempting to publish a reel. Meta recommends that your app also enforces the publishing rate limit, especially if your app allows app users to schedule posts to be published in the future.

*Sharing Disclosure Mockup*

## Before You Start

You will need:

* A Page access token requested from your app user who can perform the `CREATE_CONTENT` task on the Page
* The your app user must grant your app the following permissions using Facebook Login:
    * `pages_show_list`
    * `pages_read_engagement`
    * `pages_manage_posts`
* A video file that contains your reel

### Video Specifications &#123;#requirements&#125;

| Property | Specification |
| --- | --- |
| File Type | .mp4 (recommended) |
| Aspect Ratio | 9 x 16 |
| Resolution | 1080 x 1920 pixels (recommended). Minimum is 540 x 960 pixels |
| Frame Rate | 24 to 60 frames per second |
| Duration | 3 to 90 seconds. |
| Video Settings | * Chroma subsampling 4:2:0&lt;br&gt;* Closed GOP (2-5 seconds)&lt;br&gt;* Compression – H.264, H.265 (VP9, AV1 are also supported)&lt;br&gt;&lt;br&gt;* Fixed frame rate&lt;br&gt;* Progressive scan |
| Audio Settings | * Audio bitrate – 128kbs+&lt;br&gt;* Channels – Stereo&lt;br&gt;&lt;br&gt;* Codec – AAC Low Complexity&lt;br&gt;* Sample rate – 48kHz |

## Step 1: Initialize an Upload Session

Before you can publish a video to a Facebook Page, you must first upload it to the Meta social graph. You will need to initialize a video upload session to start the upload process. To start a session, send a `POST` request to the `/page-id/video_reels` endpoint, where ***page-id*** is the ID for your Facebook Page, with the `upload_phase` parameter set to `start`.

Be sure the host is ***`graph.facebook.com`***.

#### Example Request

_Formatted for readability. Replace ***bold***, ***italics values***, such as ***page_access_token***, with your values._

```curl
curl -X POST &quot;https://graph.facebook.com/v25.0/Your_page_id/video_reels&quot; \
     -H &quot;Content-Type: application/json&quot; \
     -d &#039;&#123;
           &quot;upload_phase&quot;:&quot;start&quot;,
           &quot;access_token&quot;:&quot;Your_page_access_token&quot;
         &#125;&#039;
```

On success, your app will receive a video ID and a URL to the video. This video ID will be used in subsequent steps.

```json
&#123;
  &quot;video_id&quot;: &quot;video-id&quot;,
  &quot;upload_url&quot;: &quot;https://rupload.facebook.com/video-upload/video-id&quot;,
&#125;
```

## Step 2: Upload the Video &#123;#upload&#125;

Most Graph API calls use the graph.facebook.com host however, calls to upload videos for reels use ***`rupload.facebook.com`***.

The following file sources are supported for uploaded video files:

* A file located on your computer
* A file hosted on a public facing server, such as a CDN

### Upload a Local File

To initiate the upload of the video asset, send a `POST` request using application/octet-stream as content type to the `/video-upload/`***`video-id`*** endpoint where ***video-id*** is the ID from Step 1, `offset` is set to the first byte being upload, generally `0`, and `file_size` set to the size of your file, in bytes.

Be sure the host is ***`rupload.facebook.com`***.

| Header | Description |
| --- | --- |
| Authorization | Should contain “OAuth &#123;access-token&#125;”. |
| file_size | The total size in bytes of the video being uploaded. |
| file_url | The url for the video file hosted on a server. Supported protocols are http and https. Other protocols, and urls requiring authentication are not currently supported. |
| offset | The byte offset of the first byte being uploaded in this request.Generally should be set to 0, unless resuming an interrupted upload. If resuming an interrupted upload, set to the “offset” returned by /status. |
| place | ID of the page you want to tag as the location. **Note:** The page you specify must have a valid location associated with it. |

**Video Reel Upload Quick Reference**

#### Example Request

_Formatted for readability. Replace ***bold***, ***italics values***, such as ***page_access_token***, with your values._

```curl
curl -X POST &quot;https://rupload.facebook.com/video-upload/v25.0/video-id&quot; \
     -H &quot;Authorization: OAuth Your_page_access_token&quot; \
     -H &quot;offset: 0&quot; \
     -H &quot;file_size: Your_file_size_in_bytes&quot; \
     --data-binary &quot;&#064;my_video_file.mp4&quot;
```

### Upload a Hosted File

To upload a hosted file, send a `POST` request to the `/video-upload/`***`video-id`*** endpoint where ***video-id*** is the ID returned in Step 1 and `file_url` is set to the URL for your hosted file.

Be sure the host is ***`rupload.facebook.com`***.

The API will now reject files hosted on sites that restrict access via robots.txt. Developers need to ensure that the hosting site allows the “facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)” user agent to fetch the hosted file.

Files hosted on Meta CDN (e.g.. fbcdn URLs) will get rejected. Instead, developers can use the crossposting feature to publish a video on multiple pages without uploading the video to each page. Refer to our [detailed guidance](https://developers.facebook.com/documentation/video-api/guides/crossposting) on crossposting.

#### Example Request

_Formatted for readability. Replace ***bold***, ***italics values***, such as ***page_access_token***, with your values._

```curl
curl -X POST &quot;https://rupload.facebook.com/video-upload/v25.0/video_id&quot; \
     -H &quot;Authorization: OAuth Your_page_access_token&quot; \
     -H &quot;file_url: https://some.cdn.url/video.mp4&quot;
```

### Example Upload Response

If you upload was successful, your app will receive a JSON object with `success` set to `true`.

```json
&#123;&quot;success&quot;: true&#125;
```

### Get the Upload Status

To get the status of a video, send a `GET` request to the `/` `video-id` endpoint where the `video-id` is the ID from initialization step, and with `fields` set to `status`.

Be sure the host is `graph.facebook.com`.

#### Sample Request

```curl
curl -X GET &quot;https://graph.facebook.com/v25.0/video-id?fields=status
&amp;access_token=Your_page_access_token&quot;
```

On success your app will receive a JSON object with status information that includes the processing, uploading, and publishing phases, and the video status.

| `status` Field Values | Description |
| --- | --- |
| `processing_phase` | This JSON object contains information about progress through the processing phase. This phase encompasses generating alternate media encodings, thumbnails, and other assets necessary for publishing. Values can include:&lt;br&gt;• `error` – This object will include a message about what went wrong during processing&lt;br&gt;• `status` – Values can be:&lt;br&gt;&lt;br&gt;• `completed`&lt;br&gt;• `error`&lt;br&gt;• `not_started`&lt;br&gt;• `in_progress`&lt;br&gt;&lt;br&gt; |
| `publishing_phase` | This JSON object contains information about progress through the publishing phase. This phase encompasses adding the video to the page, and if scheduled, will describe when the video is intended to be published. Values can include:&lt;br&gt;&lt;br&gt;• `error` – This object will include a message about what went wrong during publishing&lt;br&gt;• `status` – Values can be:&lt;br&gt;&lt;br&gt;• `completed`&lt;br&gt;• `error`&lt;br&gt;• `not_started`&lt;br&gt;• `in_progress`&lt;br&gt;&lt;br&gt;• `publish_status` – Values can be:&lt;br&gt;&lt;br&gt;• `draft`&lt;br&gt;• `error`&lt;br&gt;• `published`&lt;br&gt;• `scheduled`&lt;br&gt;&lt;br&gt;• `publish_time` – A UNIX timestamp for the actual or scheduled published time&lt;br&gt; |
| `uploading_phase` | This JSON object contains information about progress through the uploading phase. Values can include:&lt;br&gt;&lt;br&gt;• `bytes_transfered` – The number of bytes of the video file that have been uploaded. This field can be used as the `offset` value to resume an interrupted upload.&lt;br&gt;• `errors`&lt;br&gt;• `status` – Values can be:&lt;br&gt;• `completed`&lt;br&gt;• `error`&lt;br&gt;• `not_started`&lt;br&gt;• `in_progress`&lt;br&gt;&lt;br&gt;• source_file_size&lt;br&gt; |
| `video_status` | The overall status of the video. Possible value can be:&lt;br&gt;&lt;br&gt;* `error` – An error occurred during the processing or publishing phase&lt;br&gt;* `expired` – The video is expired and must be uploaded again&lt;br&gt;* `processing` – Meta is processing the video during or after upload&lt;br&gt;* `ready` – The video is ready to be published&lt;br&gt;* `uploading` – The video is currently uploading&lt;br&gt;* `upload_failed` – An error occured during upload phase, retry the upload             * `upload_complete` – The video has finished uploading. The uploaded bytes should equal the file size. |

**Video Status Quick Reference**

If re-uploading doesn’t work, try again from Step 1.

##### Example Response with a Processing Error

```json
&#123;
  &quot;status&quot;: &#123;
    &quot;video_status&quot;: &quot;processing&quot;,
    &quot;uploading_phase&quot;: &#123;
      &quot;status&quot;: &quot;complete&quot;,
    &#125;,
    &quot;processing_phase&quot;: &#123;
      &quot;status&quot;: &quot;not_started&quot;,
      &quot;error&quot;: &#123;
        &quot;message&quot;: &quot;Resolution too low. Video must have a minimum resolution of 540p.&quot;
      &#125;
    &#125;
    &quot;publishing_phase&quot;: &#123;
      &quot;status&quot;: &quot;not_started&quot;,
    &#125;
  &#125;
&#125;
```

##### Example Response for an Interrupted Upload

```json
&#123;
  &quot;status&quot;: &#123;
    &quot;video_status&quot;: &quot;processing&quot;,
    &quot;uploading_phase&quot;: &#123;
      &quot;status&quot;: &quot;in_progress&quot;,
      &quot;bytes_transfered&quot;: 50002
    &#125;
    &quot;processing_phase&quot;: &#123;
      &quot;status&quot;: &quot;not_started&quot;
    &#125;
    &quot;publishing_phase&quot;: &#123;
      &quot;status&quot;: &quot;not_started&quot;,
    &#125;
  &#125;
&#125;
```

| Error Type | Error Message | Recommended Solution |
| --- | --- | --- |
| OffsetInvalidError | Request starting offset is invalid | Set the ‘offset’ parameter to the `bytes_transfered` value returned in the Video endpoint `status` field |
| PartialRequestError | Partial request (did not match length of file) | Check the file size and try the upload again. |
| ProcessingFailedError | Request processing failed | Please try uploading again. Make sure the video meets all of the requirements. If the upload does not work, initialize a new upload session. |

### Resume an Interrupted Upload

If the video upload is interrupted, it can be resumed.

To resume an upload, send another POST request to the `/video-upload/video-id` endpoint and use the value for `upload_phase.bytes_transfered` as the value for `offset`.

## Step 3: Publish the Reel

To end the upload session and publish your video, send a `POST `request to the `/`***`page-id`***`/video_reels` endpoint. You can also include any of the additional fields, like `description`, which can include hashtags, and `title`.

Be sure the host is ***`graph.facebook.com`***.

| Field | Description |
| --- | --- |
| `video_id` | **Required**. The ID for the video as returned from initialize step. |
| `upload_phase` *enum&#123;start,finish&#125;* | **Required**. The upload status for the video file. To publish this should be `complete` |
| `video_state` *enum&#123;DRAFT, SCHEDULED, PUBLISHED&#125;* | **Required**. The publish status for the video. |
| `description  ` | The description for the video. Supports hashtags. |
| `title  ` | The title for the video |
| `scheduled_publish_time` | If the video is not being published immediately, set to a Unix timestamp integer for scheduled publish time.&lt;br&gt;&lt;br&gt;If set, the publish time must be greater than 10 minutes from the current time and within 29 days of the current date, and `video_state` must be set to &#039;SCHEDULED&#039;. |

**POST Page Video Reels Quick Reference**

#### Example Request

_Formatted for readability. Replace ***bold***, ***italics values***, such as ***page_access_token***, with your values._

```curl
curl -X POST &quot;https://graph.facebook.com/v25.0/page-id/video_reels
    ?access_token=Your_page_access_token&amp;video_id=video-id&amp;upload_phase=finish
&amp;video_state=PUBLISHED
&amp;description=What a beautiful day! #sunnyand72&quot;
```

On success your app will receive a JSON object with `success` set to `true`.

```json
&#123;&quot;success&quot;: true&#125;
```

### Get a List of Reels

To get a list of all reels published on your Facebook Page, send a `GET` request to `/`***`page-id`***`/video_reels` endpoint.

Be sure the host is ***`graph.facebook.com`*** for this API call.

**Note:** When using `since` and `until` in your `GET` request, the date for `until` must be a date after the date for `since`. For example, if `since` is `2023-01-31`, `until` must be after `2023-01-31`. You can use both parameters, or one or the other. Date formats can be any of the following:

* `today`, `yesterday`
* Epoch timestamps (1676057525)
* `yyyy-mm-dd` (2023-1-31)

```curl
curl -X GET &quot;https://graph.facebook.com/v25.0/page-id/video_reels?access_token=Your_page_access_token&quot;
```

On success your app will receive a JSON object with information about your published reels such as video ID and published time.

```json
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;updated_time&quot;: &quot;unix_timestamp&quot;,
      &quot;id&quot;: &quot;video-1-id&quot;
    &#125;,
    &#123;
      &quot;description&quot;: &quot;sample_description&quot;,
      &quot;updated_time&quot;: &quot;unix_timestamp&quot;,
      &quot;id&quot;: &quot;video-2-id&quot;
    &#125;,
    ...
  ]
&#125;
```

## Invite a collaborator

Invite a person, a **collaborator**, to publish your reel on their Facebook Page.

To publish a reel on a collaborator&#039;s Facebook Page you will invite the collaborator to publish your reel on their Facebook Page. When they accept the invitation, the reel will immediately be published on their Facebook Page if the reel has been published, or the reel will be published on their Page when you publish the reel on your Page.

You will need:

* The ID for the collaborator&#039;s Facebook Page (for New Page Experience, use the delegate Page ID)
* The ID for the Video you want to share with a collaborator

#### Limitations

* You can only send 10 collaborator invitation per Page per 24 hours
* You can only publish Reels to other Facebook Pages

### Send an Invitation

To invite a collaborator to publish your reel on their Facebook Page, send a `POST` request to the `/`***`video-id`***`/collaborators` endpoint with the `target_id` parameter set to the ID for the collaborator&#039;s Facebook Page.

*Formatted for readability.*

```curl
curl -X POST &quot;https://graph.facebook.com/v25.0/video-id/collaborators
  ?target_id=collaborators-page-id&amp;access_token=your-page-access-token&quot;
```

On success your app will receive a JSON response with the link to the invitation and your collaborator will receive an invite notification.

#### Example Response

```json
&#123;
  &quot;success&quot;: true,
  “collaborator_id”: “collaborators-page-id”
  “invitation_link”: “facebook-url-for-invitation”
&#125;
```

### Get Invitation Status

To get the status for an invitation you sent, send a `GET` request to the `/`***`video-id`***`/collaborators` endpoint.

#### Example Request

*Formatted for readability.*

```curl
curl -X POST &quot;https://graph.facebook.com/v25.0/video-id/collaborators
  ?access_token=your-page-or-user--access-token&quot;
```

On success your app will receive a JSON response with the invitation status of `Accepted`, `Declined`, or `Pending`.

```json
&#123;
  “id”: “video-id”
  “name”: “collaborators-page-name”
  “invite_status”: “Accepted”
  “invitation_link”: “facebook-url-for-invitation”
&#125;
```

## Tag a location

To find a place to tag, you can use the [Pages Search API](https://developers.facebook.com/documentation/pages-api/search-pages). When searching for a place, only pages with valid locations can be used. When searching be sure to include the `location` field to verify this.

To tag the location in your reel, include the parameter `place` and the `id` returned from the Pages Search API in the publish call.

**Example Request**

```curl
curl -X POST &quot;https://graph.facebook.com/v18.0/page-id/video_reels
    ?access_token=Your_page_access_token
    &amp;video_id=video-id
    &amp;upload_phase=finish
    &amp;video_state=PUBLISHED
    &amp;place=123456&quot;
```

## Retrieve Copyright Information

At upload, a copyright check is run to see if your upload contains licensed content and lets you act appropriately before publishing. Videos in violation may have restricted access or be subject to monetization impacts. To retrieve the copyright check information on the Reel, you must have `pages_read_engagement` permission on the Page. You will need the ID of the Video and the Page access token. Please note that it may take a couple of minutes for the copyright check to be completed and return information.

### Limitations

* Works for Reels API uploads

* Only the owner can view the matches information

### Example

**Example Request**

```curl
curl -i -X GET &quot;https://graph.facebook.com/v18.0/VIDEO_ID?fields=copyright_check_information&amp;access_token=ACCESS_TOKEN&quot;
```

**Example Responses**

*In progress:*

```json
&#123;
  &quot;copyright_check_information&quot;: &#123;
        &quot;status&quot;: &#123;
            &quot;status&quot;: &quot;in_progress&quot;,
        &#125;,
    &#125;
&#125;
```

*Without any matches:*

```json
&#123;
  &quot;copyright_check_information&quot;: &#123;
        &quot;status&quot;: &#123;
            &quot;status&quot;: &quot;complete&quot;,
            &quot;matches_found&quot;: false
        &#125;,
    &#125;
&#125;
```

*With matches:*

```json
&quot;copyright_check_information&quot;: &#123;
        &quot;status&quot;: &#123;
            &quot;status&quot;: &quot;complete&quot;,
            &quot;matches_found&quot;: true
        &#125;,
        &quot;copyright_matches&quot;: [
            &#123;
                &quot;content_title&quot;: &quot;Title 1&quot;,
                &quot;owner_copyright_policy&quot;: &#123;
                    &quot;name&quot;: &quot;Owner name 1&quot;,
                    &quot;actions&quot;: [
                        &#123;
                            &quot;action&quot;: &quot;TRACK&quot;,
                            &quot;territories&quot;: &quot;3&quot;,
                            &quot;geos&quot;: [
                                &quot;United Arab Emirates&quot;,
                                &quot;Afghanistan&quot;,
                                &quot;Antigua and Barbuda&quot;,
                            ]
                        &#125;
                    ]
                &#125;,
                &quot;matched_segments&quot;: [
                    &#123;
                        &quot;start_time_in_seconds&quot;: 90.5,
                        &quot;duration_in_seconds&quot;: 35,
                        &quot;segment_type&quot;: &quot;AUDIO&quot;
                    &#125;
                ]
            &#125;,
            &#123;
                &quot;content_title&quot;: &quot;Title 2&quot;,
                &quot;owner_copyright_policy&quot;: &#123;
                    &quot;name&quot;: &quot;Owner name 2&quot;,
                    &quot;actions&quot;: [
                        &#123;
                            &quot;action&quot;: &quot;BLOCK&quot;,
                            &quot;territories&quot;: &quot;1&quot;,
                            &quot;geos&quot;: [
                                &quot;Italy&quot;
                            ]
                        &#125;
                    ]
                &#125;,
                &quot;matched_segments&quot;: [
                    &#123;
                        &quot;start_time_in_seconds&quot;: 90.5,
                        &quot;duration_in_seconds&quot;: 35,
                        &quot;segment_type&quot;: &quot;AUDIO&quot;
                    &#125;
                ]
            &#125;
        ]
    &#125;,
```

## Error Codes

Common error codes and possible mitigations.

| Error Code | Error Message | Possible Mitigation |
| --- | --- | --- |
| `100` | &quot;error&quot;: &#123;&lt;br&gt;&quot;message&quot;: &quot;(#100) Missing parameter: &#123;a list of missing parameters&#125;&quot;,&lt;br&gt;&quot;type&quot;: &quot;OAuthException&quot;,&lt;br&gt;&quot;code&quot;: 100,&lt;br&gt;&quot;fbtrace_id&quot;: &quot;----&quot;&lt;br&gt;&#125;&lt;br&gt;&#125; | A required parameter, such as `upload_phase`, is missing from your API call. Visit the endpoint reference to ensure all required parameters are included and be sure to check for typos. |
| `1363040` | The video you tried to upload has an aspect ratio that isn&#039;t supported on Facebook. Aspect ratios for videos need to be between 16x9 and 9x16. Please try uploading a video in a supported aspect ratio. | Aspect ratios for videos need to be between 16x9 and 9x16. |
| `1363127` | The video you tried to upload has resolution that isn&#039;t supported on Facebook for this product. Please try uploading a video with a supported resolution | Minimum resolution is 540 x 960 pixels. Recommended resolution is 1080 x 1920 pixels. |
| `1363128` | The video you tried to upload has a duration that isn&#039;t supported on Facebook for this product. Please try uploading a video with a supported duration. | Reels duration must be between 3 and 90 seconds. |
| `1363129` | The video you tried to upload has an average frame rate that isn&#039;t supported on Facebook for this product. Please try uploading a video with a supported frame rate | Reels frame rate must be between 24 and 60 frames per second. |

## Learn how to customize a reel

Customize your reel to create a richer reels experience for your viewers.

* [Add a custom cover photo for your reel](https://developers.facebook.com/docs/graph-api/reference/video/thumbnails#Creating)
* [Add your favorite music to your reel](https://developers.facebook.com/documentation/video-api/guides/music-recommendations#music-for-you)
* [Get music recommendations from Meta for new music](https://developers.facebook.com/documentation/video-api/guides/music-recommendations#new-music-on-facebook)
* [Get music recommendations from Meta for popular music on Facebook](https://developers.facebook.com/documentation/video-api/guides/music-recommendations#music-popular-on-facebook)

## See also

* [Get insights for your reels](https://developers.facebook.com/docs/graph-api/reference/video/video_insights#reels-metrics) to track engagement
- [Facebook Sharing to Reels From Android](https://developers.facebook.com/documentation/android/sharing-to-reels-facebook)
- [Facebook Sharing to Reels From iOS](https://developers.facebook.com/documentation/ios/sharing-to-reels-facebook)
* Check out the [Facebook Reels Publishing API Sample](https://github.com/fbsamples/reels_publishing_apis/tree/main/fb_reels_publishing_api_sample) available on Github.
