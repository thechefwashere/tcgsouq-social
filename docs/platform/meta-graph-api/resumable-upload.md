---
title: "Resumable Upload API"
source: "https://developers.facebook.com/docs/graph-api/guides/upload"
final_url: "https://developers.facebook.com/docs/graph-api/guides/upload"
platform: "meta-graph-api"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "e321cbfc200af59d6a224db349a338905f2f0241e8082d41160cf18e9f1b0827"
---

# Upload a file

The Resumable Upload API allows you to upload large files to Meta's social graph and resume interrupted upload sessions without having to start over. Once you have uploaded your file, you can publish it.

References for endpoints that support uploaded file handles will indicate if the endpoints support handles returned by the Resumable Upload API.

### Before you start

This guide assumes you have read the [Graph API Overview](/docs/graph-api/overview) and the [Meta Development](/docs/development) guides and performed the necessary actions needed to develop with Meta.

You will need:

- A Meta app ID
- A file in one of the following formats:
  - `pdf`
  - `jpeg`
  - `jpg`
  - `png`
  - `mp4`
- A User access token

## Step 1: Start an upload session

To start an upload session send a `POST` request to the `/<APP_ID>/uploads` endpoint, where `<APP_ID>` is your app's Meta ID, with the following required parameters:

- `file_name` - the name of your file
- `file_length` - file size in bytes
- `file_type` - The file's MIME type. Valid values are: `application/pdf`, `image/jpeg`, `image/jpg`, `image/png`, and `video/mp4`

#### Request Syntax

*Formatted for readability.*

```
curl -i -X POST "https://graph.facebook.com/v26.0/<APP_ID>/uploads
  ?file_name=<FILE_NAME>
  &file_length=<FILE_LENGTH>
  &file_type=<FILE_TYPE>
  &access_token=<USER_ACCESS_TOKEN>"
```

Upon success, your app will receive a JSON response with the upload session ID.

```
{
  "id": "upload:<UPLOAD_SESSION_ID>"
}
```

## Step 2: Start the upload

Start uploading the file by sending a `POST` request to the `/upload:<UPLOAD_SESSION_ID>` endpoint with the following `file_offset` set to `0`.

#### Request Syntax

```
curl -i -X POST "https://graph.facebook.com/v26.0/upload:<UPLOAD_SESSION_ID>"
  --header "Authorization: OAuth <USER_ACCESS_TOKEN>"
  --header "file_offset: 0"
  --data-binary @<FILE_NAME>
```

You must include the access token in the header or the call will fail.

On success, your app receives the file handle which you will use in your API calls to publish the file to your endpoint.

```
{
  "h": "<UPLOADED_FILE_HANDLE>"
}
```

#### Sample Response

```
{
    "h": "2:c2FtcGxl..."
}
```

### Resume an interrupted upload

If you have initiated an upload session but it is taking longer than expected or has been interrupted, send a `GET` request to the `/upload:<UPLOAD_SESSION_ID>` endpoint from [Step 1](#step-1).

```
curl -i -X GET "https://graph.facebook.com/v26.0/upload:<UPLOAD_SESSION_ID>"
  --header "Authorization: OAuth <USER_ACCESS_TOKEN>"
```

Upon success, your app will receive a JSON response with the `file_offset` value that you can use to resume the upload process from the point of interruption.

```
{
  "id": "upload:<UPLOAD_SESSION_ID>"
  "file_offset": "<FILE_OFFSET>"
}
```

Send another `POST` request, like the you sent in [Step 2](#step-2), with `file_offset` set to this `file_offset` value you just received. This will resume the upload process from the point of interruption.

```
curl -i -X POST "https://graph.facebook.com/v26.0/upload:<UPLOAD_SESSION_ID>"
  --header "Authorization: OAuth <USER_ACCESS_TOKEN>"
  --header "file_offset: <FILE_OFFSET>"
  --data-binary @<FILE_NAME>
```

## Next Steps

- Visit the [Video API documentation](https://developers.facebook.com/docs/video-api/guides/publishing) to publish a video to a Facebook Page.
