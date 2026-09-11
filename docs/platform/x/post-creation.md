---
title: "Create a post"
source: "https://docs.x.com/x-api/posts/creation-of-a-post"
final_url: "https://docs.x.com/x-api/posts/create-post"
platform: "x"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "395ce7648c66989b7d2660357c5806c60102d57147d7811a55321f71311ea9e7"
---

POST

/

2

/

tweets

Create Posts

```
curl --request POST \
  --url https://api.x.com/2/tweets \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "card_uri": "<string>",
  "community_id": "<string>",
  "direct_message_deep_link": "<string>",
  "for_super_followers_only": true,
  "made_with_ai": true,
  "nullcast": true,
  "paid_partnership": true,
  "quote_tweet_id": "<string>",
  "share_with_followers": true,
  "text": ""
}
'
```

```
import requests

url = "https://api.x.com/2/tweets"

payload = {
    "card_uri": "<string>",
    "community_id": "<string>",
    "direct_message_deep_link": "<string>",
    "for_super_followers_only": True,
    "made_with_ai": True,
    "nullcast": True,
    "paid_partnership": True,
    "quote_tweet_id": "<string>",
    "share_with_followers": True,
    "text": ""
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
```

```
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: JSON.stringify({
    card_uri: '<string>',
    community_id: '<string>',
    direct_message_deep_link: '<string>',
    for_super_followers_only: true,
    made_with_ai: true,
    nullcast: true,
    paid_partnership: true,
    quote_tweet_id: '<string>',
    share_with_followers: true,
    text: ''
  })
};

fetch('https://api.x.com/2/tweets', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.x.com/2/tweets",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    'card_uri' => '<string>',
    'community_id' => '<string>',
    'direct_message_deep_link' => '<string>',
    'for_super_followers_only' => true,
    'made_with_ai' => true,
    'nullcast' => true,
    'paid_partnership' => true,
    'quote_tweet_id' => '<string>',
    'share_with_followers' => true,
    'text' => ''
  ]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer <token>",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

```
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.x.com/2/tweets"

	payload := strings.NewReader("{\n  \"card_uri\": \"<string>\",\n  \"community_id\": \"<string>\",\n  \"direct_message_deep_link\": \"<string>\",\n  \"for_super_followers_only\": true,\n  \"made_with_ai\": true,\n  \"nullcast\": true,\n  \"paid_partnership\": true,\n  \"quote_tweet_id\": \"<string>\",\n  \"share_with_followers\": true,\n  \"text\": \"\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

```
HttpResponse<String> response = Unirest.post("https://api.x.com/2/tweets")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"card_uri\": \"<string>\",\n  \"community_id\": \"<string>\",\n  \"direct_message_deep_link\": \"<string>\",\n  \"for_super_followers_only\": true,\n  \"made_with_ai\": true,\n  \"nullcast\": true,\n  \"paid_partnership\": true,\n  \"quote_tweet_id\": \"<string>\",\n  \"share_with_followers\": true,\n  \"text\": \"\"\n}")
  .asString();
```

```
require 'uri'
require 'net/http'

url = URI("https://api.x.com/2/tweets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"card_uri\": \"<string>\",\n  \"community_id\": \"<string>\",\n  \"direct_message_deep_link\": \"<string>\",\n  \"for_super_followers_only\": true,\n  \"made_with_ai\": true,\n  \"nullcast\": true,\n  \"paid_partnership\": true,\n  \"quote_tweet_id\": \"<string>\",\n  \"share_with_followers\": true,\n  \"text\": \"\"\n}"

response = http.request(request)
puts response.read_body
```

```
{
  "data": {
    "id": "<string>",
    "text": "<string>",
    "edit_history_post_ids": [
      "<string>"
    ]
  },
  "errors": [
    {
      "detail": "<string>",
      "resource_type": "<string>",
      "title": "<string>",
      "type": "https://api.x.com/2/problems/resource-not-found",
      "parameter": "<string>",
      "resource_id": "<string>",
      "status": 123,
      "value": "<string>"
    }
  ]
}
```

```
{
  "code": 123,
  "message": "<string>"
}
```

Quote-posting (using the `quote_tweet_id` parameter) requires an [Enterprise plan](/enterprise-api/introduction). It is not available on self-serve (pay-per-use) tiers.

## [​](#media-attachments) Media attachments

Upload media first with the [chunked upload](/x-api/media/quickstart/media-upload-chunked) endpoints, then pass the returned `media_id` in `media.media_ids`.
A Post may include **up to 4 photos**, **1 animated GIF**, or **1 video**.
Duration and file size are checked again at Post create. They follow the **posting user’s** X Premium / verified status and the `media_category` used at upload — not your developer API plan.

| Posting account | Video cap when attaching to a Post |
| --- | --- |
| Default (no Premium) | 20 minutes, 8 GB |
| X Premium / verified | 125 minutes, 16 GB |

These caps apply to `tweet_video` and `amplify_video`. If the video is longer than that user is allowed to post, the response is **403 Forbidden**:

```
{
  "title": "Forbidden",
  "detail": "This user is not allowed to post a video longer than 20 minutes.",
  "type": "about:blank",
  "status": 403
}
```

A successful upload does not guarantee the media can be attached. See [size and duration limits](/x-api/media/introduction#size-and-duration-limits).

#### Authorizations

OAuth2UserTokenUserTokenOAuth2UserTokenUserToken

[​](#authorization-authorization)

Authorization

string

header

required

The access token received from the authorization server in the OAuth 2.0 flow.

#### Body

application/json

[​](#body-card-uri)

card\_uri

string

Card URI parameter.

[​](#body-community-id)

community\_id

string

Community to post the tweet to.

Pattern: `^[0-9]{1,19}$`

[​](#body-direct-message-deep-link)

direct\_message\_deep\_link

string

Direct message deep link.

[​](#body-edit-options)

edit\_options

object

Edit an existing tweet rather than creating a new one.

Show child attributes

[​](#body-for-super-followers-only)

for\_super\_followers\_only

boolean

Restrict tweet to super followers.

[​](#body-geo)

geo

object

Geo location for the tweet.

Show child attributes

[​](#body-made-with-ai)

made\_with\_ai

boolean

Disclose that the tweet contains AI-generated media.

[​](#body-media)

media

object

Media attachments.

Show child attributes

[​](#body-nullcast)

nullcast

boolean

If true, the tweet is not shown in the public timeline.

[​](#body-paid-partnership)

paid\_partnership

boolean

Disclose that the tweet is a paid partnership.

[​](#body-poll)

poll

object

Poll configuration.

Show child attributes

[​](#body-quote-tweet-id)

quote\_tweet\_id

string

Tweet ID to quote.

Pattern: `^[0-9]{1,19}$`

[​](#body-reply)

reply

object

Tweet reply configuration.

Show child attributes

[​](#body-reply-settings)

reply\_settings

enum<string>

Who can reply to this tweet.

Available options:

`following`,

`mentionedUsers`,

`subscribers`,

`verified`

[​](#body-share-with-followers)

share\_with\_followers

boolean

Share an exclusive (super-follower) tweet with all followers.

[​](#body-text)

text

string

default:""

Text of the tweet. Required unless media is provided. Defaulted to an empty string so it is always sent: the backend's `tweet_text` variable is non-null and rejects an absent value.

#### Response

The request has succeeded.

[​](#response-data)

data

object

Show child attributes

[​](#response-errors)

errors

object[]

- Option 1
- Option 2
- Option 3
- Option 4
- Option 5
- Option 6
- Option 7
- Option 8
- Option 9

Show child attributes

⌘I

Create Posts

```
curl --request POST \
  --url https://api.x.com/2/tweets \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "card_uri": "<string>",
  "community_id": "<string>",
  "direct_message_deep_link": "<string>",
  "for_super_followers_only": true,
  "made_with_ai": true,
  "nullcast": true,
  "paid_partnership": true,
  "quote_tweet_id": "<string>",
  "share_with_followers": true,
  "text": ""
}
'
```

```
import requests

url = "https://api.x.com/2/tweets"

payload = {
    "card_uri": "<string>",
    "community_id": "<string>",
    "direct_message_deep_link": "<string>",
    "for_super_followers_only": True,
    "made_with_ai": True,
    "nullcast": True,
    "paid_partnership": True,
    "quote_tweet_id": "<string>",
    "share_with_followers": True,
    "text": ""
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
```

```
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: JSON.stringify({
    card_uri: '<string>',
    community_id: '<string>',
    direct_message_deep_link: '<string>',
    for_super_followers_only: true,
    made_with_ai: true,
    nullcast: true,
    paid_partnership: true,
    quote_tweet_id: '<string>',
    share_with_followers: true,
    text: ''
  })
};

fetch('https://api.x.com/2/tweets', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.x.com/2/tweets",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    'card_uri' => '<string>',
    'community_id' => '<string>',
    'direct_message_deep_link' => '<string>',
    'for_super_followers_only' => true,
    'made_with_ai' => true,
    'nullcast' => true,
    'paid_partnership' => true,
    'quote_tweet_id' => '<string>',
    'share_with_followers' => true,
    'text' => ''
  ]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer <token>",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

```
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.x.com/2/tweets"

	payload := strings.NewReader("{\n  \"card_uri\": \"<string>\",\n  \"community_id\": \"<string>\",\n  \"direct_message_deep_link\": \"<string>\",\n  \"for_super_followers_only\": true,\n  \"made_with_ai\": true,\n  \"nullcast\": true,\n  \"paid_partnership\": true,\n  \"quote_tweet_id\": \"<string>\",\n  \"share_with_followers\": true,\n  \"text\": \"\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}
```

```
HttpResponse<String> response = Unirest.post("https://api.x.com/2/tweets")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"card_uri\": \"<string>\",\n  \"community_id\": \"<string>\",\n  \"direct_message_deep_link\": \"<string>\",\n  \"for_super_followers_only\": true,\n  \"made_with_ai\": true,\n  \"nullcast\": true,\n  \"paid_partnership\": true,\n  \"quote_tweet_id\": \"<string>\",\n  \"share_with_followers\": true,\n  \"text\": \"\"\n}")
  .asString();
```

```
require 'uri'
require 'net/http'

url = URI("https://api.x.com/2/tweets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"card_uri\": \"<string>\",\n  \"community_id\": \"<string>\",\n  \"direct_message_deep_link\": \"<string>\",\n  \"for_super_followers_only\": true,\n  \"made_with_ai\": true,\n  \"nullcast\": true,\n  \"paid_partnership\": true,\n  \"quote_tweet_id\": \"<string>\",\n  \"share_with_followers\": true,\n  \"text\": \"\"\n}"

response = http.request(request)
puts response.read_body
```

```
{
  "data": {
    "id": "<string>",
    "text": "<string>",
    "edit_history_post_ids": [
      "<string>"
    ]
  },
  "errors": [
    {
      "detail": "<string>",
      "resource_type": "<string>",
      "title": "<string>",
      "type": "https://api.x.com/2/problems/resource-not-found",
      "parameter": "<string>",
      "resource_id": "<string>",
      "status": 123,
      "value": "<string>"
    }
  ]
}
```

```
{
  "code": 123,
  "message": "<string>"
}
```
