---
title: "Resize design"
source: "https://www.canva.dev/docs/connect/api-reference/resizes/create-design-resize-job/"
final_url: "https://www.canva.dev/docs/connect/api-reference/resizes/create-design-resize-job/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "3d4d0cb2a0d3e3bf2b958c571138d95b1dd0519b883ae7fcaf5bc64fb856d371"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/connect/llms.txt
> Use this file to discover all available pages before exploring further.

# Create design resize job

<Availability>
  To use this API, your integration must act on behalf of a user that's on a Canva plan with premium features (such as Canva Pro).

  Users on the Canva Free plan have access to a limited trial. For more information, see [Trial quotas](https://www.canva.dev/docs/connect/api-requests-responses/#trial-quotas).
</Availability>

Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
to create a resized copy of a design. The new resized design is
added to the top level of the user's
[projects](https://www.canva.com/help/find-designs-and-folders/) (`root` folder).

To resize a design into a new design, you can either:

* Use a preset design type.
* Set height and width dimensions for a custom design.

Note the following behaviors and restrictions when resizing designs:

* Designs can be resized to a maximum area of 25,000,000 pixels squared.
* Resizing designs using the Connect API always creates a new design. In-place resizing is currently not available in the Connect API, but can be done in the Canva UI.
* Resizing a multi-page design results in all pages of the design being resized. Resizing a section of a design is only available in the Canva UI.
* [Canva docs](https://www.canva.com/create/documents/) and [emails](https://www.canva.com/emails/) can't be resized, and other design types can't be resized to a Canva doc or email.
* Canva Code designs can't be resized, and other design types can't be resized to a Canva Code design.

<Note>
  For more information on the workflow for using asynchronous jobs,
  see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
  You can check the status and get the results of resize jobs created with this API using the
  [Get design resize job API](https://www.canva.dev/docs/connect/api-reference/resizes/get-design-resize-job/).
</Note>

## HTTP method and URL path

POST https\://api.canva.com/rest/v1/resizes

This operation is rate limited to 20 requests per minute for each user of your integration.

## Authentication and authorization

This endpoint requires a valid access token that acts on behalf of a user.

### Scopes

The access token must have all the following [scopes](/docs/connect/appendix/scopes) (permissions):

* `design:content:read`
* `design:content:write`

### Capabilities

The user must have at least one of the following [capabilities](/docs/connect/capabilities):

* `resize`

## Header parameters

<Prop.List>
  <Prop name="Authorization" type="string" required>
    Provides credentials to authenticate the request, in the form of a `Bearer` token.

    For example: `Authorization: Bearer {token}`
  </Prop>

  <Prop name="Content-Type" type="string" required>
    Indicates the media type of the information sent in the request. This must be set to `application/json`.

    For example: `Content-Type: application/json`
  </Prop>
</Prop.List>

## Body parameters

<Prop.List>
  <Prop name="design_id" type="string" required>
    The design ID.
  </Prop>

  <Prop name="design_type" type="DesignTypeInput" required>
    The desired design type.

    <Tabs>
      <Tab name="preset">
        Provide the common design type.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `preset`.
            </Prop.Extras>
          </Prop>

          <Prop name="name" type="string" required>
            The name of the design type.

            <Prop.Extras>
              **Available values:**

              * `doc`: A [Canva doc](https://www.canva.com/docs/); a document for Canva's online text editor.
              * `email`: An [email](https://www.canva.com/emails/); for creating email campaign designs.
              * `presentation`: A [presentation](https://www.canva.com/presentations/); lets you create and collaborate for presenting to an audience.
              * `whiteboard`: A [whiteboard](https://www.canva.com/online-whiteboard/); a design which gives you infinite space to collaborate.
            </Prop.Extras>
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="custom">
        Provide the width and height to define a custom design type.

        Each dimension must be between 40 and 8000 pixels, and the
        total area (width × height) must not exceed 25,000,000 pixels
        squared. For example, a design with a width of 8000 pixels can
        have a maximum height of 3125 pixels.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `custom`.
            </Prop.Extras>
          </Prop>

          <Prop name="width" type="integer" required>
            The width of the design, in pixels.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `8000`
            </Prop.Extras>
          </Prop>

          <Prop name="height" type="integer" required>
            The height of the design, in pixels.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `8000`
            </Prop.Extras>
          </Prop>
        </Prop.List>
      </Tab>
    </Tabs>
  </Prop>
</Prop.List>

## Example request

Examples for using the `/v1/resizes` endpoint:

<Tabs storageKey="example.language" disableContentTransition>
  <Tab name="cURL">
    ```sh
    curl --request POST 'https://api.canva.com/rest/v1/resizes' \
    --header 'Authorization: Bearer {token}' \
    --header 'Content-Type: application/json' \
    --data '{
      "design_id": "DAGirp_1ZUA",
      "design_type": {
        "type": "custom",
        "width": 1000,
        "height": 1500
      }
    }'
    ```
  </Tab>

  <Tab name="Node.js">
    ```js
    const fetch = require("node-fetch");

    fetch("https://api.canva.com/rest/v1/resizes", {
      method: "POST",
      headers: {
        "Authorization": "Bearer {token}",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "design_id": "DAGirp_1ZUA",
        "design_type": {
          "type": "custom",
          "width": 1000,
          "height": 1500
        }
      }),
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
                .uri(URI.create("https://api.canva.com/rest/v1/resizes"))
                .header("Authorization", "Bearer {token}")
                .header("Content-Type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString("{\"design_id\": \"DAGirp_1ZUA\", \"design_type\": {\"type\": \"custom\", \"width\": 1000, \"height\": 1500}}"))
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
        "Authorization": "Bearer {token}",
        "Content-Type": "application/json"
    }

    data = {
        "design_id": "DAGirp_1ZUA",
        "design_type": {
            "type": "custom",
            "width": 1000,
            "height": 1500
        }
    }

    response = requests.post("https://api.canva.com/rest/v1/resizes",
        headers=headers,
        json=data
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
      Method = HttpMethod.Post,
      RequestUri = new Uri("https://api.canva.com/rest/v1/resizes"),
      Headers =
      {
        { "Authorization", "Bearer {token}" },
      },
      Content = new StringContent(
        "{\"design_id\": \"DAGirp_1ZUA\", \"design_type\": {\"type\": \"custom\", \"width\": 1000, \"height\": 1500}}",
        Encoding.UTF8,
        "application/json"
      ),
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
    	"strings"
    )

    func main() {
    	payload := strings.NewReader(`{
    	  "design_id": "DAGirp_1ZUA",
    	  "design_type": {
    	    "type": "custom",
    	    "width": 1000,
    	    "height": 1500
    	  }
    	}`)

    	url := "https://api.canva.com/rest/v1/resizes"
    	req, _ := http.NewRequest("POST", url, payload)
    	req.Header.Add("Authorization", "Bearer {token}")
    	req.Header.Add("Content-Type", "application/json")

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
      CURLOPT_URL => "https://api.canva.com/rest/v1/resizes",
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer {token}',
        'Content-Type: application/json',
      ),
      CURLOPT_POSTFIELDS => json_encode([
        "design_id" => "DAGirp_1ZUA",
        "design_type" => [
          "type" => "custom",
          "width" => 1000,
          "height" => 1500
        ]
      ])
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

    url = URI('https://api.canva.com/rest/v1/resizes')
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request['Authorization'] = 'Bearer {token}'
    request['Content-Type'] = 'application/json'
    request.body = <<REQUEST_BODY
    {
      "design_id": "DAGirp_1ZUA",
      "design_type": {
        "type": "custom",
        "width": 1000,
        "height": 1500
      }
    }
    REQUEST_BODY

    response = http.request(request)
    puts response.read_body
    ```
  </Tab>
</Tabs>

## Success response

If successful, the endpoint returns a `200` response with a JSON body with the following parameters:

<Prop.List>
  <Prop name="job" type="DesignResizeJob" required mode="output">
    Details about the design resize job.

    <PillAccordion title={<>Properties of <strong>job</strong></>} defaultExpanded={true}>
      <Prop.List>
        <Prop name="id" type="string" required mode="output">
          The design resize job ID.
        </Prop>

        <Prop name="status" type="string" required mode="output">
          Status of the design resize job.

          <Prop.Extras>
            **Available values:**

            * `in_progress`
            * `success`
            * `failed`
          </Prop.Extras>
        </Prop>

        <Prop name="result" type="DesignResizeJobResult" mode="output">
          Design has been created and saved to user's root
          ([projects](https://www.canva.com/help/find-designs-and-folders/)) folder.

          <PillAccordion title={<>Properties of <strong>result</strong></>}>
            <Prop.List>
              <Prop name="design" type="DesignSummary" required mode="output">
                Basic details about the design, such as the design's ID, title, and URL.

                <PillAccordion title={<>Properties of <strong>design</strong></>}>
                  <Prop.List>
                    <Prop name="id" type="string" required mode="output">
                      The design ID.
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

                    <Prop name="title" type="string" mode="output">
                      The design title.
                    </Prop>

                    <Prop name="url" type="string" mode="output">
                      URL of the design.
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

              <Prop name="trial_information" type="TrialInformation" mode="output">
                WARNING: Trials and trial information are a [preview feature](https://www.canva.dev/docs/connect/#preview-apis).
                There might be unannounced breaking changes to this feature which won't produce a new API version.

                Trial information for non-qualifying users. Non-qualifying users have a limited number of
                resize uses. Once the trial is exhausted, users must upgrade to a Canva plan with premium
                features (such as Canva Pro) to continue using the Resize API.

                <PillAccordion title={<>Properties of <strong>trial_information</strong></>}>
                  <Prop.List>
                    <Prop name="uses_remaining" type="integer" required mode="output">
                      The number of uses remaining in the free trial.
                    </Prop>

                    <Prop name="upgrade_url" type="string" required mode="output">
                      The URL for a user to upgrade their Canva account.
                    </Prop>
                  </Prop.List>
                </PillAccordion>
              </Prop>
            </Prop.List>
          </PillAccordion>
        </Prop>

        <Prop name="error" type="DesignResizeError" mode="output">
          If the design resize job fails, this object provides details about the error.

          <PillAccordion title={<>Properties of <strong>error</strong></>}>
            <Prop.List>
              <Prop name="code" type="string" required mode="output">
                <Prop.Extras>
                  **Available values:**

                  * `thumbnail_generation_error`
                  * `design_resize_error`
                  * `create_design_error`
                  * `trial_quota_exceeded`
                </Prop.Extras>
              </Prop>

              <Prop name="message" type="string" required mode="output">
                A human-readable description of what went wrong.
              </Prop>
            </Prop.List>
          </PillAccordion>
        </Prop>
      </Prop.List>
    </PillAccordion>
  </Prop>
</Prop.List>

## Example responses

### In progress job

```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "in_progress"
  }
}
```

### Successfully completed job

```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "success",
    "result": {
      "design": {
        "id": "DAGirp_1ZUA",
        "title": "My summer holiday",
        "thumbnail": {
          "width": 595,
          "height": 335,
          "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?<query-string>"
        },
        "urls": {
          "edit_url": "https://www.canva.com/design/DAGhRehVa2c/0L_1s4UXSpZhls8EtPaRKw/edit",
          "view_url": "https://www.canva.com/design/DAGhRehVa2c/0L_1s4UXSpZhls8EtPaRKw/view"
        },
        "created_at": 1742856750,
        "updated_at": 1742856752,
        "page_count": 5
      },
      "trial_information": {
        "uses_remaining": 0,
        "upgrade_url": "https://www.canva.com/?tailoringUpsellDialog=GENERIC_C4W"
      }
    }
  }
}
```

### Failed job

```json
{
  "job": {
    "id": "450a76e7-f96f-43ae-9c37-0e1ce492ac72",
    "status": "failed",
    "error": {
      "code": "design_resize_error",
      "message": "Failed to resize the design"
    }
  }
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

##### Unsupported design type

```json
{
  "code": "bad_request_params",
  "message": "Canva designs can't be resized to the selected design type: `{designTypeName}`"
}
```

##### The requested preset design type is not available.

```json
{
  "code": "bad_request_body",
  "message": "Design type '{name}' is invalid."
}
```

##### The design type must be custom or preset

```json
{
  "code": "bad_request_params",
  "message": "Invalid design type provided. Design type must be one of custom or preset, but was {designType}"
}
```

##### The requested dimensions are below the minimum size

```json
{
  "code": "invalid_request",
  "message": "width or height cannot be less than {minDimension}px"
}
```

##### The requested dimensions are above the maximum size

```json
{
  "code": "invalid_request",
  "message": "width or height cannot be more than {maxDimension}px"
}
```

##### The requested dimensions exceed the maximum design area

```json
{
  "code": "invalid_request",
  "message": "width and height is above the maximum allowed area for a design"
}
```

##### The design can't be resized to the desired type

```json
{
  "code": "bad_request_params",
  "message": "The Canva design provided can't be resized to the desired type"
}
```

##### The page number is out of bounds

```json
{
  "code": "bad_request_params",
  "message": "The page number provided is out of bounds."
}
```

##### Responsive pages can't be resized

```json
{
  "code": "bad_request_params",
  "message": "Responsive type pages are not supported to Magic Resize"
}
```

##### Controlled pages can't be resized

```json
{
  "code": "bad_request_params",
  "message": "Controlled type pages are not supported to Magic Resize"
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

##### The user's plan does not include the resize feature

```json
{
  "code": "permission_denied",
  "message": "Not allowed to access createDesignResizeJob, requires one of capabilities [resize]."
}
```

##### Not allowed to resize the design

```json
{
  "code": "permission_denied",
  "message": "Not allowed to resize document with ID {designId}"
}
```

### 404 Not Found

<Prop.List>
  <Prop name="code" type="string" required mode="output">
    A short string indicating what failed. This field can be used to handle errors programmatically. For a complete list of error codes, see [Error responses](/docs/connect/error-responses/).
  </Prop>

  <Prop name="message" type="string" required mode="output">
    A human-readable description of what went wrong.
  </Prop>
</Prop.List>

#### Example error response

##### The design to resize was not found

```json
{
  "code": "design_not_found",
  "message": "Design with id '{designId}' not found"
}
```

### 429 Too Many Requests

<Prop.List>
  <Prop name="code" type="string" required mode="output">
    A short string indicating what failed. This field can be used to handle errors programmatically. For a complete list of error codes, see [Error responses](/docs/connect/error-responses/).
  </Prop>

  <Prop name="message" type="string" required mode="output">
    A human-readable description of what went wrong.
  </Prop>

  <Prop name="upsell_url" type="string" required mode="output">
    URL to redirect users to upgrade their Canva account and reset their quota.
  </Prop>
</Prop.List>

#### Example error response

##### Feature quota exceeded

```json
{
  "code": "quota_exceeded",
  "message": "Free resize quota has been exceeded. Present the `upsell_url` to the user and prompt them to upgrade their Canva account to continue using the resize feature.",
  "upsell_url": "{upsellUrl}"
}
```
