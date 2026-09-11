---
title: "Get export job"
source: "https://www.canva.dev/docs/connect/api-reference/exports/get-design-export-job/"
final_url: "https://www.canva.dev/docs/connect/api-reference/exports/get-design-export-job/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "3180cbc311bdb88f05db45405a2f0bc1645d1e5a9c08906f3386ed143b557984"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/connect/llms.txt
> Use this file to discover all available pages before exploring further.

# Get design export job

Get the status and results of an export job, including link(s) to the downloadable file(s).

Gets the result of a design export job that was created using the [Create design export job API](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).

If the job is successful, the response includes an array
of download URLs. Depending on the design type and export format, there is a download URL for each page in the design. The download URLs are only valid for 24 hours.

You might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).

## HTTP method and URL path

GET https\://api.canva.com/rest/v1/exports/\{exportId}

This operation is rate limited to 120 requests per minute for each user of your integration.

## Authentication and authorization

This endpoint requires a valid access token that acts on behalf of a user.

### Scopes

The access token must have all the following [scopes](/docs/connect/appendix/scopes) (permissions):

* `design:content:read`

## Header parameters

<Prop.List>
  <Prop name="Authorization" type="string" required>
    Provides credentials to authenticate the request, in the form of a `Bearer` token.

    For example: `Authorization: Bearer {token}`
  </Prop>
</Prop.List>

## Path parameters

<Prop.List>
  <Prop name="exportId" type="string" required>
    The export job ID.
  </Prop>
</Prop.List>

## Example request

Examples for using the `/v1/exports/{exportId}` endpoint:

<Tabs storageKey="example.language" disableContentTransition>
  <Tab name="cURL">
    ```sh
    curl --request GET 'https://api.canva.com/rest/v1/exports/{exportId}' \
    --header 'Authorization: Bearer {token}'
    ```
  </Tab>

  <Tab name="Node.js">
    ```js
    const fetch = require("node-fetch");

    fetch("https://api.canva.com/rest/v1/exports/{exportId}", {
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
                .uri(URI.create("https://api.canva.com/rest/v1/exports/{exportId}"))
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

    response = requests.get("https://api.canva.com/rest/v1/exports/{exportId}",
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
      RequestUri = new Uri("https://api.canva.com/rest/v1/exports/{exportId}"),
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
    	url := "https://api.canva.com/rest/v1/exports/{exportId}"
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
      CURLOPT_URL => "https://api.canva.com/rest/v1/exports/{exportId}",
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

    url = URI('https://api.canva.com/rest/v1/exports/{exportId}')
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
  <Prop name="job" type="ExportJob" required mode="output">
    The status of the export job.

    <PillAccordion title={<>Properties of <strong>job</strong></>} defaultExpanded={true}>
      <Prop.List>
        <Prop name="id" type="string" required mode="output">
          The export job ID.
        </Prop>

        <Prop name="status" type="string" required mode="output">
          The export status of the job. A newly created job will be `in_progress` and will eventually
          become `success` or `failed`.

          <Prop.Extras>
            **Available values:**

            * `failed`
            * `in_progress`
            * `success`
          </Prop.Extras>
        </Prop>

        <Prop name="urls" type="string[]" mode="output">
          Download URL(s) for the completed export job. These URLs expire after 24 hours.

          Depending on the design type and export format, there is a download URL for each page in the design. The list is sorted by page order.
        </Prop>

        <Prop name="error" type="ExportError" mode="output">
          If the export fails, this object provides details about the error.

          <PillAccordion title={<>Properties of <strong>error</strong></>}>
            <Prop.List>
              <Prop name="code" type="string" required mode="output">
                If the export failed, this specifies the reason why it failed.

                <Prop.Extras>
                  **Available values:**

                  * `license_required`: The design contains [premium elements](https://www.canva.com/help/premium-elements/) that haven't been purchased. You can either buy the elements or upgrade to a Canva plan (such as Canva Pro) that has premium features, then try again. Alternatively, you can set `export_quality` to `regular` to export your document in regular quality.
                  * `approval_required`: The design requires [reviewer approval](https://www.canva.com/en_au/help/design-approval/) before it can be exported.
                  * `internal_failure`: The service encountered an error when exporting your design.
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
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "in_progress"
  }
}
```

### Successfully completed job

```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "success",
    "urls": [
      "https://export-download.canva.com/..."
    ]
  }
}
```

### Failed job

```json
{
  "job": {
    "id": "e08861ae-3b29-45db-8dc1-1fe0bf7f1cc8",
    "status": "failed",
    "error": {
      "code": "license_required",
      "message": "User doesn't have the required license to export in PRO quality."
    }
  }
}
```

## Error responses

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

##### Not allowed to access export job.

```json
{
  "code": "permission_denied",
  "message": "Not allowed to access export job"
}
```

##### Not allowed to access export job result.

```json
{
  "code": "permission_denied",
  "message": "Not allowed to access export job result"
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

##### Export job result has expired.

```json
{
  "code": "not_found",
  "message": "export job result has expired"
}
```
