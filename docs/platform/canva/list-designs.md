---
title: "List designs"
source: "https://www.canva.dev/docs/connect/api-reference/designs/list-designs/"
final_url: "https://www.canva.dev/docs/connect/api-reference/designs/list-designs/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "de892d48b13342809c84cb2551b041fe36f3b116c9d3da30cbac0d5790b83b81"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/connect/llms.txt
> Use this file to discover all available pages before exploring further.

# List designs

List all the user's designs.

Lists metadata for all the designs in a Canva user's
[projects](https://www.canva.com/help/find-designs-and-folders/). You can also:

* Use search terms to filter the listed designs.
* Show designs either created by, or shared with the user.
* Sort the results.

## HTTP method and URL path

GET https\://api.canva.com/rest/v1/designs

This operation is rate limited to 100 requests per minute for each user of your integration.

## Authentication and authorization

This endpoint requires a valid access token that acts on behalf of a user.

### Scopes

The access token must have all the following [scopes](/docs/connect/appendix/scopes) (permissions):

* `design:meta:read`

## Header parameters

<Prop.List>
  <Prop name="Authorization" type="string" required>
    Provides credentials to authenticate the request, in the form of a `Bearer` token.

    For example: `Authorization: Bearer {token}`
  </Prop>
</Prop.List>

## Query parameters

<Prop.List>
  <Prop name="query" type="string">
    Lets you search the user's designs, and designs shared with the user, using a search term or terms.

    <Prop.Extras>
      **Maximum length:** `255`
    </Prop.Extras>
  </Prop>

  <Prop name="continuation" type="string">
    If the success response contains a continuation token, the list contains more designs
    you can list. You can use this token as a query parameter and retrieve more
    designs from the list, for example
    `/v1/designs?continuation={continuation}`.

    To retrieve all of a user's designs, you might need to make multiple requests.
  </Prop>

  <Prop name="ownership" type="string">
    Filter the list of designs based on the user's ownership of the designs.

    <Prop.Extras>
      **Default value:** `any`

      **Available values:**

      * `any`: Owned by and shared with the user.
      * `owned`: Owned by the user.
      * `shared`: Shared with the user.
    </Prop.Extras>
  </Prop>

  <Prop name="sort_by" type="string">
    Sort the list of designs.

    <Prop.Extras>
      **Default value:** `relevance`

      **Available values:**

      * `relevance`: Sort results using a relevance algorithm.
      * `modified_descending`: Sort results by the date last modified in descending order.
      * `modified_ascending`: Sort results by the date last modified in ascending order.
      * `title_descending`: Sort results by title in descending order.
      * `title_ascending`: Sort results by title in ascending order
    </Prop.Extras>
  </Prop>

  <Prop name="limit" type="integer">
    The number of designs to return.

    <Prop.Extras>
      **Minimum:** `1`

      **Maximum:** `100`

      **Default value:** `25`
    </Prop.Extras>
  </Prop>
</Prop.List>

## Example request

Examples for using the `/v1/designs` endpoint:

<Tabs storageKey="example.language" disableContentTransition>
  <Tab name="cURL">
    ```sh
    curl --request GET 'https://api.canva.com/rest/v1/designs' \
    --header 'Authorization: Bearer {token}'
    ```
  </Tab>

  <Tab name="Node.js">
    ```js
    const fetch = require("node-fetch");

    fetch("https://api.canva.com/rest/v1/designs", {
      method: "GET",
      headers: {
        "Authorization": "Bearer {token}",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch(err => console.error(err));
    ```
  </Tab>

  <Tab name="Java">
    ```java
    import java.io.IOException;
    import java.net.URI;
    import java.net.http.*;

    public class ApiExample {
        public static void main(String[] args) throws IOException, InterruptedException {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.canva.com/rest/v1/designs"))
                .header("Authorization", "Bearer {token}")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );
            System.out.println(response.body());
        }
    }
    ```
  </Tab>

  <Tab name="Python">
    ```py
    import requests

    headers = {
        "Authorization": "Bearer {token}"
    }

    response = requests.get("https://api.canva.com/rest/v1/designs",
        headers=headers
    )
    print(response.json())
    ```
  </Tab>

  <Tab name="C#">
    ```csharp
    using System.Net.Http;

    var client = new HttpClient();
    var request = new HttpRequestMessage
    {
      Method = HttpMethod.Get,
      RequestUri = new Uri("https://api.canva.com/rest/v1/designs"),
      Headers =
      {
        { "Authorization", "Bearer {token}" },
      },
    };

    using (var response = await client.SendAsync(request))
    {
      response.EnsureSuccessStatusCode();
      var body = await response.Content.ReadAsStringAsync();
      Console.WriteLine(body);
    };
    ```
  </Tab>

  <Tab name="Go">
    ```go
    package main

    import (
    	"fmt"
    	"io"
    	"net/http"
    )

    func main() {
    	url := "https://api.canva.com/rest/v1/designs"
    	req, _ := http.NewRequest("GET", url, nil)
    	req.Header.Add("Authorization", "Bearer {token}")

    	res, _ := http.DefaultClient.Do(req)
    	defer res.Body.Close()
    	body, _ := io.ReadAll(res.Body)
    	fmt.Println(string(body))
    }
    ```
  </Tab>

  <Tab name="PHP">
    ```php
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://api.canva.com/rest/v1/designs",
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer {token}',
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if (empty($err)) {
      echo $response;
    } else {
      echo "Error: " . $err;
    }
    ```
  </Tab>

  <Tab name="Ruby">
    ```ruby
    require 'net/http'
    require 'uri'

    url = URI('https://api.canva.com/rest/v1/designs')
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request['Authorization'] = 'Bearer {token}'

    response = http.request(request)
    puts response.read_body
    ```
  </Tab>
</Tabs>

## Success response

If successful, the endpoint returns a `200` response with a JSON body with the following parameters:

<Prop.List>
  <Prop name="items" type="Design[]" required mode="output">
    The list of designs.

    <PillAccordion title={<>Properties of <strong>items</strong></>} defaultExpanded={true}>
      <Prop.List>
        <Prop name="id" type="string" required mode="output">
          The design ID.
        </Prop>

        <Prop name="owner" type="TeamUserSummary" required mode="output">
          Metadata for the user, consisting of the User ID and Team ID.

          <PillAccordion title={<>Properties of <strong>owner</strong></>}>
            <Prop.List>
              <Prop name="user_id" type="string" required mode="output">
                The ID of the user.
              </Prop>

              <Prop name="team_id" type="string" required mode="output">
                The ID of the user's Canva Team.
              </Prop>
            </Prop.List>
          </PillAccordion>
        </Prop>

        <Prop name="urls" type="DesignLinks" required mode="output">
          A temporary set of URLs for viewing or editing the design.

          <PillAccordion title={<>Properties of <strong>urls</strong></>}>
            <Prop.List>
              <Prop name="edit_url" type="string" required mode="output">
                A temporary editing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.

                NOTE: This is not a permanent URL, it is only valid for 30 days.
              </Prop>

              <Prop name="view_url" type="string" required mode="output">
                A temporary viewing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.

                NOTE: This is not a permanent URL, it is only valid for 30 days.
              </Prop>
            </Prop.List>
          </PillAccordion>
        </Prop>

        <Prop name="created_at" type="integer" required mode="output">
          When the design was created in Canva, as a Unix timestamp (in seconds since the Unix
          Epoch).
        </Prop>

        <Prop name="updated_at" type="integer" required mode="output">
          When the design was last updated in Canva, as a Unix timestamp (in seconds since the
          Unix Epoch).
        </Prop>

        <Prop name="design_types" type="string[]" required mode="output">
          The type of content a design or page contains. The list of design types may grow over time. The `unknown` value represents design types that haven't been added to the list.

          <Prop.Extras>
            **Available values:**

            * `doc`
            * `email`
            * `presentation`
            * `sheet`
            * `whiteboard`
            * `custom`
            * `unknown`
          </Prop.Extras>
        </Prop>

        <Prop name="title" type="string" mode="output">
          The design title.
        </Prop>

        <Prop name="thumbnail" type="Thumbnail" mode="output">
          A thumbnail image representing the object.

          <PillAccordion title={<>Properties of <strong>thumbnail</strong></>}>
            <Prop.List>
              <Prop name="width" type="integer" required mode="output">
                The width of the thumbnail image in pixels.
              </Prop>

              <Prop name="height" type="integer" required mode="output">
                The height of the thumbnail image in pixels.
              </Prop>

              <Prop name="url" type="string" required mode="output">
                A URL for retrieving the thumbnail image.
                This URL expires after 15 minutes. This URL includes a query string
                that's required for retrieving the thumbnail.
              </Prop>
            </Prop.List>
          </PillAccordion>
        </Prop>

        <Prop name="page_count" type="integer" mode="output">
          The total number of pages in the design. Some design types don't have pages (for example, Canva docs).
        </Prop>
      </Prop.List>
    </PillAccordion>
  </Prop>

  <Prop name="continuation" type="string" mode="output">
    A continuation token.
    If the success response contains a continuation token, the list contains more designs
    you can list. You can use this token as a query parameter and retrieve more
    designs from the list, for example
    `/v1/designs?continuation={continuation}`.

    To retrieve all of a user's designs, you might need to make multiple requests.
  </Prop>
</Prop.List>

## Example response

```json
{
  "continuation": "RkFGMgXlsVTDbMd:MR3L0QjiaUzycIAjx0yMyuNiV0OildoiOwL0x32G4NjNu4FwtAQNxowUQNMMYN",
  "items": [
    {
      "id": "DAFVztcvd9z",
      "title": "My summer holiday",
      "owner": {
        "user_id": "auDAbliZ2rQNNOsUl5OLu",
        "team_id": "Oi2RJILTrKk0KRhRUZozX"
      },
      "thumbnail": {
        "width": 595,
        "height": 335,
        "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?<query-string>"
      },
      "urls": {
        "edit_url": "https://www.canva.com/api/design/eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiZXhwaXJ5IjoxNzQyMDk5NDAzMDc5fQ..GKLx2hrJa3wSSDKQ.hk3HA59qJyxehR-ejzt2DThBW0cbRdMBz7Fb5uCpwD-4o485pCf4kcXt_ypUYX0qMHVeZ131YvfwGPIhbk-C245D8c12IIJSDbZUZTS7WiCOJZQ.sNz3mPSQxsETBvl_-upMYA/edit",
        "view_url": "https://www.canva.com/api/design/eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiZXhwaXJ5IjoxNzQyMDk5NDAzMDc5fQ..GKLx2hrJa3wSSDKQ.hk3HA59qJyxehR-ejzt2DThBW0cbRdMBz7Fb5uCpwD-4o485pCf4kcXt_ypUYX0qMHVeZ131YvfwGPIhbk-C245D8c12IIJSDbZUZTS7WiCOJZQ.sNz3mPSQxsETBvl_-upMYA/view"
      },
      "created_at": 1377396000,
      "updated_at": 1692928800,
      "page_count": 5,
      "design_types": [
        "presentation"
      ]
    }
  ]
}
```

## Error responses

### 400 Bad Request

<Prop.List>
  <Prop name="code" type="string" required mode="output">
    A short string indicating what failed. This field can be used to handle errors programmatically. For a complete list of error codes, see [Error responses](/docs/connect/error-responses/).
  </Prop>

  <Prop name="message" type="string" required mode="output">
    A human-readable description of what went wrong.
  </Prop>
</Prop.List>

#### Example error responses

##### The continuation token is invalid

```json
{
  "code": "bad_query_params",
  "message": "Invalid continuation: {continuation}"
}
```

##### The ownership value is invalid

```json
{
  "code": "invalid_field",
  "message": "Invalid ownership"
}
```

##### The sort\_by value is invalid

```json
{
  "code": "invalid_field",
  "message": "Invalid sort by value: {sortBy}"
}
```

##### The design\_types filter contains an unavailable design type

```json
{
  "code": "invalid_field",
  "message": "'design_types' contains a design type that isn't available: {designType}."
}
```

##### Unable to fetch designs

```json
{
  "code": "bad_query_params",
  "message": "Unable to fetch designs"
}
```

### 403 Forbidden

<Prop.List>
  <Prop name="code" type="string" required mode="output">
    A short string indicating what failed. This field can be used to handle errors programmatically. For a complete list of error codes, see [Error responses](/docs/connect/error-responses/).
  </Prop>

  <Prop name="message" type="string" required mode="output">
    A human-readable description of what went wrong.
  </Prop>
</Prop.List>

#### Example error responses

##### Not allowed to access the design list

```json
{
  "code": "permission_denied",
  "message": "Not allowed to access design list"
}
```

##### Not allowed to find documents

```json
{
  "code": "permission_denied",
  "message": "Not allowed to find documents"
}
```
