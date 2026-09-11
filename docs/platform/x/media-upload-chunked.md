---
title: "Media upload (chunked)"
source: "https://docs.x.com/x-api/media/quickstart/media-upload-chunked"
final_url: "https://docs.x.com/x-api/media/quickstart/media-upload-chunked"
platform: "x"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "97f1de7bef8705e132acc8446a9ab73b3f0ab467bbbc45353dea9f2b5f0ffc50"
---

This guide walks you through uploading videos and large media files using the v2 chunked upload endpoints.
For video or large media uploads, you must:

1. **INIT** — `POST /2/media/upload/initialize` — start the session and get a `media_id`
2. **APPEND** — `POST /2/media/upload/{id}/append` — upload each chunk
3. **FINALIZE** — `POST /2/media/upload/{id}/finalize` — complete the upload
4. **STATUS** — `GET /2/media/upload` — wait for processing when `processing_info` is returned

Do not send `command=INIT`, `command=APPEND`, or `command=FINALIZE` to `POST /2/media/upload`. Those command-style parameters were the previous upload protocol. The v2 flow uses the dedicated paths above. `command=STATUS` is still used only on the status GET.

Video duration and file size are limited by the authenticated user’s Premium / verified status and by `media_category`. See [size and duration limits](/x-api/media/introduction#size-and-duration-limits). A successful upload can still be rejected when you attach the `media_id` to [`POST /2/tweets`](/x-api/posts/create-post).

---

## [​](#step-1-initialize-upload-init) Step 1: Initialize upload (INIT)

Start the upload session. Send a JSON body — not multipart form fields.

cURL

```
curl -X POST "https://api.x.com/2/media/upload/initialize" \
  -H "Authorization: Bearer $USER_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "media_type": "video/mp4",
    "total_bytes": 1048576,
    "media_category": "tweet_video"
  }'
```

```
from xdk import Client

client = Client(bearer_token="YOUR_USER_ACCESS_TOKEN")

response = client.media.initialize_upload(
    media_type="video/mp4",
    total_bytes=1048576,
    media_category="tweet_video",
)

media_id = response.data.id
print(f"Media ID: {media_id}")
```

```
import { Client } from "@xdevplatform/xdk";

const client = new Client({ accessToken: "YOUR_USER_ACCESS_TOKEN" });

const response = await client.media.initializeUpload({
  mediaType: "video/mp4",
  totalBytes: 1048576,
  mediaCategory: "tweet_video",
});

const mediaId = response.data?.id;
console.log(`Media ID: ${mediaId}`);
```

**Response:**

```
{
  "data": {
    "id": "1880028106020515840",
    "media_key": "13_1880028106020515840",
    "expires_after_secs": 86400
  }
}
```

Use `tweet_video` for a regular Post. Use `amplify_video` for Ads creatives. See [media categories](#media-categories).

---

## [​](#step-2-upload-chunks-append) Step 2: Upload chunks (APPEND)

Upload each chunk to `POST /2/media/upload/{id}/append`. Keep each segment at or below **5 MB** (the server maximum is 8 MB). Segments are indexed from `0`.

cURL

```
curl -X POST "https://api.x.com/2/media/upload/1880028106020515840/append" \
  -H "Authorization: Bearer $USER_ACCESS_TOKEN" \
  -F "segment_index=0" \
  -F "media=@/path/to/chunk0.mp4"
```

```
from xdk import Client

client = Client(bearer_token="YOUR_USER_ACCESS_TOKEN")

chunk_size = 4 * 1024 * 1024  # 4 MB chunks

with open("video.mp4", "rb") as f:
    segment_index = 0
    while True:
        chunk = f.read(chunk_size)
        if not chunk:
            break

        client.media.append_upload(
            id=media_id,
            segment_index=segment_index,
            media=chunk,
        )
        segment_index += 1
        print(f"Uploaded chunk {segment_index}")
```

```
import { Client } from "@xdevplatform/xdk";
import fs from "fs";

const client = new Client({ accessToken: "YOUR_USER_ACCESS_TOKEN" });

const chunkSize = 4 * 1024 * 1024; // 4 MB chunks
const fileBuffer = fs.readFileSync("video.mp4");

let segmentIndex = 0;
for (let offset = 0; offset < fileBuffer.length; offset += chunkSize) {
  const chunk = fileBuffer.slice(offset, offset + chunkSize);

  await client.media.appendUpload(mediaId, {
    segmentIndex,
    media: chunk,
  });

  console.log(`Uploaded chunk ${segmentIndex + 1}`);
  segmentIndex++;
}
```

**Chunking advantages:**

- Improved reliability on slow networks
- Uploads can be paused and resumed
- Failed chunks can be retried individually

---

## [​](#step-3-finalize-upload-finalize) Step 3: Finalize upload (FINALIZE)

Complete the upload after all chunks are sent:

cURL

```
curl -X POST "https://api.x.com/2/media/upload/1880028106020515840/finalize" \
  -H "Authorization: Bearer $USER_ACCESS_TOKEN"
```

```
from xdk import Client

client = Client(bearer_token="YOUR_USER_ACCESS_TOKEN")

response = client.media.finalize_upload(id=media_id)

print(f"Processing state: {response.data.processing_info.state}")
```

```
import { Client } from "@xdevplatform/xdk";

const client = new Client({ accessToken: "YOUR_USER_ACCESS_TOKEN" });

const response = await client.media.finalizeUpload(mediaId);

console.log(`Processing state: ${response.data?.processing_info?.state}`);
```

**Response:**

Example response

```
{
  "data": {
    "id": "1880028106020515840",
    "media_key": "13_1880028106020515840",
    "size": 1048576,
    "expires_after_secs": 86400,
    "processing_info": {
      "state": "pending",
      "check_after_secs": 1
    }
  }
}
```

If `processing_info` is returned, proceed to Step 4 to wait for processing. If not, the media is ready to use.

---

## [​](#step-4-check-status-status) Step 4: Check status (STATUS)

If `processing_info` was returned, poll until processing completes:

cURL

```
curl "https://api.x.com/2/media/upload?command=STATUS&media_id=1880028106020515840" \
  -H "Authorization: Bearer $USER_ACCESS_TOKEN"
```

```
from xdk import Client
import time

client = Client(bearer_token="YOUR_USER_ACCESS_TOKEN")

while True:
    response = client.media.get_upload_status(
        media_id=media_id,
        command="STATUS",
    )
    state = response.data.processing_info.state

    if state == "succeeded":
        print("Media ready!")
        break
    elif state == "failed":
        print("Processing failed")
        break
    else:
        check_after = response.data.processing_info.check_after_secs
        print(f"Processing... checking again in {check_after}s")
        time.sleep(check_after)
```

```
import { Client } from "@xdevplatform/xdk";

const client = new Client({ accessToken: "YOUR_USER_ACCESS_TOKEN" });

while (true) {
  const response = await client.media.getUploadStatus(mediaId, {
    command: "STATUS",
  });
  const state = response.data?.processing_info?.state;

  if (state === "succeeded") {
    console.log("Media ready!");
    break;
  } else if (state === "failed") {
    console.log("Processing failed");
    break;
  } else {
    const checkAfter = response.data?.processing_info?.check_after_secs ?? 1;
    console.log(`Processing... checking again in ${checkAfter}s`);
    await new Promise((r) => setTimeout(r, checkAfter * 1000));
  }
}
```

**Processing states:** `pending` → `in_progress` → `succeeded` or `failed`

---

## [​](#step-5-create-post-with-media) Step 5: Create Post with media

Once processing is complete, create a Post with the media. Duration and size are checked again against the posting user’s entitlement.

cURL

```
curl -X POST "https://api.x.com/2/tweets" \
  -H "Authorization: Bearer $USER_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Check out this video!",
    "media": {
      "media_ids": ["1880028106020515840"]
    }
  }'
```

```
from xdk import Client

client = Client(bearer_token="YOUR_USER_ACCESS_TOKEN")

response = client.posts.create(
    text="Check out this video!",
    media={"media_ids": [media_id]},
)

print(f"Posted: {response.data.id}")
```

```
import { Client } from "@xdevplatform/xdk";

const client = new Client({ accessToken: "YOUR_USER_ACCESS_TOKEN" });

const response = await client.posts.create({
  text: "Check out this video!",
  media: { mediaIds: [mediaId] },
});

console.log(`Posted: ${response.data?.id}`);
```

If the video is longer than the posting user is allowed to attach, the response is **403 Forbidden**:

```
{
  "title": "Forbidden",
  "detail": "This user is not allowed to post a video longer than 20 minutes.",
  "type": "about:blank",
  "status": 403
}
```

`N` is the posting user’s duration cap (20 minutes by default, 125 minutes for Premium / verified).

---

## [​](#media-categories) Media categories

| Category | Use for | Typical max (default / Premium) |
| --- | --- | --- |
| `tweet_image` | Image on a Post | 5 MB |
| `tweet_gif` | Animated GIF on a Post | 15 MB |
| `tweet_video` | Video on a Post | 20 min / 8 GB · Premium: 125 min / 16 GB |
| `amplify_video` | Ads / promoted video | 20 min / 8 GB · Premium: 125 min / 16 GB |
| `dm_image` | Image in a Direct Message | 5 MB |
| `dm_gif` | Animated GIF in a Direct Message | 15 MB |
| `dm_video` | Video in a Direct Message | 140 s / 512 MB · Premium: 10 min / 1 GB |
| `subtitles` | Subtitle file | 1 MB |

If you omit `media_category`, the upload is treated as Post media (`tweet_image`, `tweet_video`, or `tweet_gif`) based on content type.

---

## [​](#next-steps) Next steps

## Best practices

File constraints, codecs, and duration limits

## Create Posts

Post with media

## Initialize

INIT endpoint reference

## Create Post

POST /2/tweets reference

⌘I
