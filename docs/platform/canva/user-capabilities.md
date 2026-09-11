---
title: "User capabilities"
source: "https://www.canva.dev/docs/connect/api-reference/users/get-user-capabilities/"
final_url: "https://www.canva.dev/docs/connect/api-reference/users/get-user-capabilities/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "0bd42b33c26b7f1735f5d9f84e9dc7324ee40ae59839862b87cc3a775ba126b1"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/connect/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user capabilities

Lists the API capabilities for the user account associated with the provided access token. For more information, see [Capabilities](https://www.canva.dev/docs/connect/capabilities/).

## HTTP method and URL path

GET https\://api.canva.com/rest/v1/users/me/capabilities

This operation is rate limited to 10 requests per minute for each user of your integration.

## Authentication and authorization

This endpoint requires a valid access token that acts on behalf of a user.

### Scopes

The access token must have all the following [scopes](/docs/connect/appendix/scopes) (permissions):

* `profile:read`

## Header parameters

<Prop.List>
  <Prop name="Authorization" type="string" required>
    Provides credentials to authenticate the request, in the form of a `Bearer` token.

    For example: `Authorization: Bearer {token}`
  </Prop>
</Prop.List>

## Example request

Examples for using the `/v1/users/me/capabilities` endpoint:

<Tabs storageKey="example.language" disableContentTransition>
  <Tab name="cURL">
    ```sh
    curl --request GET 'https://api.canva.com/rest/v1/users/me/capabilities' \
    --header 'Authorization: Bearer {token}'
    ```
  </Tab>

  <Tab name="Node.js">
    ```js
    const fetch = require("node-fetch");

    fetch("https://api.canva.com/rest/v1/users/me/capabilities", {
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
                .uri(URI.create("https://api.canva.com/rest/v1/users/me/capabilities"))
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

    response = requests.get("https://api.canva.com/rest/v1/users/me/capabilities",
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
      RequestUri = new Uri("https://api.canva.com/rest/v1/users/me/capabilities"),
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
    	url := "https://api.canva.com/rest/v1/users/me/capabilities"
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
      CURLOPT_URL => "https://api.canva.com/rest/v1/users/me/capabilities",
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

    url = URI('https://api.canva.com/rest/v1/users/me/capabilities')
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
  <Prop name="capabilities" type="string[]" mode="output">
    Some APIs are annotated with required capabilities. These endpoints require the user to
    possess the required capabilities in order to be called successfully.

    <Prop.Extras>
      **Available values:**

      * `analytics`: Capability required to call the Design analytics APIs. Users that are members of a [Canva Enterprise](https://www.canva.com/enterprise/) organization have this capability.
      * `autofill`: Capability required to call autofill APIs Users that are members of a [Canva Enterprise](https://www.canva.com/enterprise/) organization have this capability.
      * `brand_template`: Capability required to use brand template APIs. Users on a Canva plan with access to brand templates (such as Canva Pro, Canva Teams, or Canva Enterprise) have this capability.
      * `export_png_transparency`: Capability required to export designs in PNG with a transparent background. Users on a paid Canva plan (such as Canva Pro) have this capability.
      * `resize`: Capability required to create design resize jobs. Users on a Canva plan with premium features (such as Canva Pro) have this capability.
      * `team_restricted_app`: Capability required to create a team-restricted app. Users that are members of the [Canva Enterprise](https://www.canva.com/enterprise/) or the [Canva for Education](https://www.canva.com/education/) organization have this capability.
    </Prop.Extras>
  </Prop>
</Prop.List>

## Example response

```json
{
  "capabilities": [
    "analytics"
  ]
}
```
