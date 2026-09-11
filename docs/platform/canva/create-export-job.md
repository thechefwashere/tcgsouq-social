---
title: "Create export job"
source: "https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/"
final_url: "https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "1226986ca1c6999410b24776edc0c78ecaedf8f24daf944db15d537b8aedfddb"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/connect/llms.txt
> Use this file to discover all available pages before exploring further.

# Create design export job

Create an asynchronous job to export a design from Canva.

Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to export a file from Canva. Once the exported file is generated, you can download
it using the URL(s) provided. The download URLs are only valid for 24 hours.

The request requires the design ID and the exported file format type.

Supported file formats (and export file type values): JPG (`jpg`), PNG (`png`), GIF (`gif`), Microsoft PowerPoint (`pptx`), MP4 (`mp4`), PDF (`pdf`), CSV (`csv`), HTML bundle (`html_bundle`), and standalone HTML (`html_standalone`).

<Note>
  This endpoint has the following additional rate limits:

  * **Integration throttle:** Each integration can export a maximum of 750 times per 5-minute window, and 5,000 times per 24-hour window.
  * **Document throttle:** Each document can be exported a maximum of 75 times per 5-minute window.
  * **User throttle:** Each user can export a maximum of 75 times per 5-minute window, and 500 times per 24-hour window.
</Note>

<Note>
  For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of export jobs created with this API using the [Get design export job API](https://www.canva.dev/docs/connect/api-reference/exports/get-design-export-job/).
</Note>

## HTTP method and URL path

POST https\://api.canva.com/rest/v1/exports

This operation is rate limited to 20 requests per minute for each user of your integration.

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

  <Prop name="format" type="ExportFormat" required>
    Details about the desired export format.

    <Tabs>
      <Tab name="pdf">
        Export the design as a PDF. Providing a paper size is optional.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `pdf`.
            </Prop.Extras>
          </Prop>

          <Prop name="export_quality" type="string">
            Specifies the export quality of the design.

            <Prop.Extras>
              **Default value:** `regular`

              **Available values:**

              * `regular`: Regular quality export.
              * `pro`: Premium quality export.

                NOTE: A `pro` export might fail if the design contains [premium elements](https://www.canva.com/help/premium-elements/) and the calling user either hasn't purchased the elements or isn't on a Canva plan (such as Canva Pro) that has premium features.
            </Prop.Extras>
          </Prop>

          <Prop name="size" type="string">
            The paper size of the export PDF file. The `size` attribute is only supported for Documents (Canva Docs).

            <Prop.Extras>
              **Default value:** `a4`

              **Available values:**

              * `a4`
              * `a3`
              * `letter`
              * `legal`
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="jpg">
        Export the design as a JPEG. Compression quality must be provided. Height or width (or both)
        may be specified, otherwise the file will be exported at it's default size.

        If the user is on the Canva Free plan, the export height and width for a fixed-dimension design can't be upscaled by more than a factor of `1.125`.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `jpg`.
            </Prop.Extras>
          </Prop>

          <Prop name="quality" type="integer" required>
            For the `jpg` type, the `quality` of the exported JPEG determines how compressed the exported file should be. A *low* `quality` value will create a file with a smaller file size, but the resulting file will have pixelated artifacts when compared to a file created with a *high* `quality` value.

            <Prop.Extras>
              **Minimum:** `1`

              **Maximum:** `100`
            </Prop.Extras>
          </Prop>

          <Prop name="export_quality" type="string">
            Specifies the export quality of the design.

            <Prop.Extras>
              **Default value:** `regular`

              **Available values:**

              * `regular`: Regular quality export.
              * `pro`: Premium quality export.

                NOTE: A `pro` export might fail if the design contains [premium elements](https://www.canva.com/help/premium-elements/) and the calling user either hasn't purchased the elements or isn't on a Canva plan (such as Canva Pro) that has premium features.
            </Prop.Extras>
          </Prop>

          <Prop name="height" type="integer">
            Specify the height in pixels of the exported image. Note the following behavior:

            * If no height or width is specified, the image is exported using the dimensions of the design.
            * If only one of height or width is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.
            * If both the height and width are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `25000`
            </Prop.Extras>
          </Prop>

          <Prop name="width" type="integer">
            Specify the width in pixels of the exported image. Note the following behavior:

            * If no width or height is specified, the image is exported using the dimensions of the design.
            * If only one of width or height is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.
            * If both the width and height are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `25000`
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="png">
        Export the design as a PNG. Height or width (or both) may be specified, otherwise
        the file will be exported at it's default size. You may also specify whether to export the
        file losslessly, and whether to export a multi-page design as a single image.

        If the user is on the Canva Free plan, the export height and width for a fixed-dimension design can't be upscaled by more than a factor of `1.125`.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `png`.
            </Prop.Extras>
          </Prop>

          <Prop name="export_quality" type="string">
            Specifies the export quality of the design.

            <Prop.Extras>
              **Default value:** `regular`

              **Available values:**

              * `regular`: Regular quality export.
              * `pro`: Premium quality export.

                NOTE: A `pro` export might fail if the design contains [premium elements](https://www.canva.com/help/premium-elements/) and the calling user either hasn't purchased the elements or isn't on a Canva plan (such as Canva Pro) that has premium features.
            </Prop.Extras>
          </Prop>

          <Prop name="height" type="integer">
            Specify the height in pixels of the exported image. Note the following behavior:

            * If no height or width is specified, the image is exported using the dimensions of the design.
            * If only one of height or width is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.
            * If both the height and width are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `25000`
            </Prop.Extras>
          </Prop>

          <Prop name="width" type="integer">
            Specify the width in pixels of the exported image. Note the following behavior:

            * If no width or height is specified, the image is exported using the dimensions of the design.
            * If only one of width or height is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.
            * If both the width and height are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `25000`
            </Prop.Extras>
          </Prop>

          <Prop name="lossless" type="boolean">
            If set to `true` (default), the PNG is exported without compression.

            If set to `false`, the PNG is compressed using a lossy compression algorithm.

            AVAILABILITY: Lossy PNG compression is only available to users on a Canva plan that has premium features, such as Canva Pro. If the user is on the Canva Free plan and this parameter is set to `false`, the export operation will fail.

            <Prop.Extras>
              **Default value:** `true`
            </Prop.Extras>
          </Prop>

          <Prop name="transparent_background" type="boolean">
            If set to `true`, the PNG is exported with a transparent background.

            AVAILABILITY: This option is only available to users on a Canva plan that has premium features, such as Canva Pro. If the user is on the Canva Free plan and this parameter is set to `true`, the export operation will fail.

            <Prop.Extras>
              **Default value:** `false`
            </Prop.Extras>
          </Prop>

          <Prop name="as_single_image" type="boolean">
            When `true`, multi-page designs are merged into a single image.
            When `false` (default), each page is exported as a separate image.

            <Prop.Extras>
              **Default value:** `false`
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="pptx">
        Export the design as a PPTX.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `pptx`.
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="gif">
        Export the design as a GIF. Height or width (or both) may be specified, otherwise the file
        will be exported at it's default size. Large designs will be scaled down, and aspect ratio
        will always be maintained.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `gif`.
            </Prop.Extras>
          </Prop>

          <Prop name="export_quality" type="string">
            Specifies the export quality of the design.

            <Prop.Extras>
              **Default value:** `regular`

              **Available values:**

              * `regular`: Regular quality export.
              * `pro`: Premium quality export.

                NOTE: A `pro` export might fail if the design contains [premium elements](https://www.canva.com/help/premium-elements/) and the calling user either hasn't purchased the elements or isn't on a Canva plan (such as Canva Pro) that has premium features.
            </Prop.Extras>
          </Prop>

          <Prop name="height" type="integer">
            Specify the height in pixels of the exported image. Note the following behavior:

            * If no height or width is specified, the image is exported using the dimensions of the design.
            * If only one of height or width is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.
            * If both the height and width are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `25000`
            </Prop.Extras>
          </Prop>

          <Prop name="width" type="integer">
            Specify the width in pixels of the exported image. Note the following behavior:

            * If no width or height is specified, the image is exported using the dimensions of the design.
            * If only one of width or height is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.
            * If both the width and height are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.

            <Prop.Extras>
              **Minimum:** `40`

              **Maximum:** `25000`
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="mp4">
        Export the design as an MP4. You must specify the quality of the exported video.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `mp4`.
            </Prop.Extras>
          </Prop>

          <Prop name="quality" type="string" required>
            The orientation and resolution of the exported video. Orientation is either `horizontal` or
            `vertical`, and resolution is one of `480p`, `720p`, `1080p` or `4k`.

            <Prop.Extras>
              **Available values:**

              * `horizontal_480p`
              * `horizontal_720p`
              * `horizontal_1080p`
              * `horizontal_4k`
              * `vertical_480p`
              * `vertical_720p`
              * `vertical_1080p`
              * `vertical_4k`
            </Prop.Extras>
          </Prop>

          <Prop name="export_quality" type="string">
            Specifies the export quality of the design.

            <Prop.Extras>
              **Default value:** `regular`

              **Available values:**

              * `regular`: Regular quality export.
              * `pro`: Premium quality export.

                NOTE: A `pro` export might fail if the design contains [premium elements](https://www.canva.com/help/premium-elements/) and the calling user either hasn't purchased the elements or isn't on a Canva plan (such as Canva Pro) that has premium features.
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="html_bundle">
        Export the email design as an HTML bundle. An HTML bundle is a zip file that contains an HTML file and the associated assets.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `html_bundle`.
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            The pages of the design to export. Currently only a single page can be exported. If not provided,
            the first page of the design is used.

            <Prop.Extras>
              **Minimum items:** `1`

              **Maximum items:** `1`
            </Prop.Extras>
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="html_standalone">
        Export the email design as a standalone HTML file with hosted assets.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `html_standalone`.
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            The pages of the design to export. Currently only a single page can be exported. If not provided,
            the first page of the design is used.

            <Prop.Extras>
              **Minimum items:** `1`

              **Maximum items:** `1`
            </Prop.Extras>
          </Prop>
        </Prop.List>
      </Tab>

      <Tab name="csv">
        Export the design as a CSV file. CSV export is only available for designs that contain
        tabular data, such as Canva Sheets.

        <Prop.List>
          <Prop name="type" type="string" required>
            <Prop.Extras>
              **Available values:** The only valid value is `csv`.
            </Prop.Extras>
          </Prop>

          <Prop name="pages" type="integer[]">
            To specify which pages to export in a multi-page design, provide the page numbers as
            an array. The first page in a design is page `1`.
            If `pages` isn't specified, all the pages are exported.
          </Prop>
        </Prop.List>
      </Tab>
    </Tabs>
  </Prop>
</Prop.List>

## Example request

Examples for using the `/v1/exports` endpoint:

<Tabs storageKey="example.language" disableContentTransition>
  <Tab name="cURL">
    ```sh
    curl --request POST 'https://api.canva.com/rest/v1/exports' \
    --header 'Authorization: Bearer {token}' \
    --header 'Content-Type: application/json' \
    --data '{
      "design_id": "DAVZr1z5464",
      "format": {
        "type": "pdf",
        "size": "a4",
        "pages": [
          2,
          3,
          4
        ]
      }
    }'
    ```
  </Tab>

  <Tab name="Node.js">
    ```js
    const fetch = require("node-fetch");

    fetch("https://api.canva.com/rest/v1/exports", {
      method: "POST",
      headers: {
        "Authorization": "Bearer {token}",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "design_id": "DAVZr1z5464",
        "format": {
          "type": "pdf",
          "size": "a4",
          "pages": [
            2,
            3,
            4
          ]
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
                .uri(URI.create("https://api.canva.com/rest/v1/exports"))
                .header("Authorization", "Bearer {token}")
                .header("Content-Type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString("{\"design_id\": \"DAVZr1z5464\", \"format\": {\"type\": \"pdf\", \"size\": \"a4\", \"pages\": [2, 3, 4]}}"))
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
        "design_id": "DAVZr1z5464",
        "format": {
            "type": "pdf",
            "size": "a4",
            "pages": [
                2,
                3,
                4
            ]
        }
    }

    response = requests.post("https://api.canva.com/rest/v1/exports",
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
      RequestUri = new Uri("https://api.canva.com/rest/v1/exports"),
      Headers =
      {
        { "Authorization", "Bearer {token}" },
      },
      Content = new StringContent(
        "{\"design_id\": \"DAVZr1z5464\", \"format\": {\"type\": \"pdf\", \"size\": \"a4\", \"pages\": [2, 3, 4]}}",
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
    	  "design_id": "DAVZr1z5464",
    	  "format": {
    	    "type": "pdf",
    	    "size": "a4",
    	    "pages": [
    	      2,
    	      3,
    	      4
    	    ]
    	  }
    	}`)

    	url := "https://api.canva.com/rest/v1/exports"
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
      CURLOPT_URL => "https://api.canva.com/rest/v1/exports",
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer {token}',
        'Content-Type: application/json',
      ),
      CURLOPT_POSTFIELDS => json_encode([
        "design_id" => "DAVZr1z5464",
        "format" => [
          "type" => "pdf",
          "size" => "a4",
          "pages" => [
            2,
            3,
            4
          ]
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

    url = URI('https://api.canva.com/rest/v1/exports')
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request['Authorization'] = 'Bearer {token}'
    request['Content-Type'] = 'application/json'
    request.body = <<REQUEST_BODY
    {
      "design_id": "DAVZr1z5464",
      "format": {
        "type": "pdf",
        "size": "a4",
        "pages": [
          2,
          3,
          4
        ]
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

##### Request design ID does not match expected format.

```json
{
  "code": "invalid_request",
  "message": "{designId} does not match expected format for designId"
}
```

##### Export not supported for this design type.

```json
{
  "code": "bad_request_body",
  "message": "{formatType} export not supported for this design type"
}
```

##### Export format not supported for requested page(s).

```json
{
  "code": "bad_request_body",
  "message": "{formatType} export not supported for requested page(s) [{pageNumbers}]"
}
```

##### Requested invalid page range for design.

```json
{
  "code": "bad_request_body",
  "message": "Requested page(s) [{badPageNumbers}] of a design with {maxPageNumber} page(s)"
}
```

##### User's plan does not allow exporting PNGs with transparent background.

```json
{
  "code": "bad_request_params",
  "message": "Users on the Canva Free plan can not export PNGs with transparent background."
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

##### Not allowed to access design.

```json
{
  "code": "permission_denied",
  "message": "Not allowed to access design with id {designId}"
}
```

##### User doesn't have the required license to export in PRO quality.

```json
{
  "code": "license_required",
  "message": "User doesn't have the required license to export in PRO quality"
}
```

##### SVG export is currently unavailable.

```json
{
  "code": "feature_not_available",
  "message": "SVG Export is currently unavailable"
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

##### Design not found.

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
</Prop.List>

#### Example error responses

##### Too many requests for client.

```json
{
  "code": "too_many_requests",
  "message": "Too many export requests for client"
}
```

##### Too many daily requests for client.

```json
{
  "code": "too_many_requests",
  "message": "Too many daily export requests for client"
}
```

##### Too many requests for user.

```json
{
  "code": "too_many_requests",
  "message": "Too many export requests for user"
}
```

##### Too many daily requests for user.

```json
{
  "code": "too_many_requests",
  "message": "Too many daily export requests for user"
}
```

##### Too many requests for design.

```json
{
  "code": "too_many_requests",
  "message": "Too many export requests for design"
}
```
