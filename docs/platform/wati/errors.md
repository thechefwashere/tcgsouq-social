---
title: "Errors and rate limits"
source: "https://docs.wati.io/reference/errors.md"
final_url: "https://docs.wati.io/reference/errors.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "995aaacd9070d5c56de863da0e32068b29ca454fa414e84d601ef6c39a5b0041"
---

---
updatedAt: 2026-05-19T06:54:26.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Errors & Rate Limits

WATI uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the 5xx range indicate an error with Wati servers (these are rare).

| HTTP Code | Description                                                                                             |
| :-------- | :------------------------------------------------------------------------------------------------------ |
| 200       | Everything worked as expected.                                                                          |
| 401       | No valid API key provided.                                                                              |
| 403       | The API key doesn't have permissions to perform the request.                                            |
| 404       | The requested resource doesn't exist.                                                                   |
| 405       | Please see if you are using the correct request method POST vs GET. Many of our APIs are POST requests. |
| 500       | Something went wrong on WATI's end. (These are rare.)                                                   |

If you call certain endpoints too frequently, you may run into the rate limit or see the error 429. Below are some rate limits that you may face, depending on your use case.

| Endpoint                         | Growth Plan | Pro Plan    | Business Plan | Note                                                                                                             |
| :------------------------------- | :---------- | :---------- | :------------ | :--------------------------------------------------------------------------------------------------------------- |
| */addContact*   , */getContacts* | 10 / 10 sec | 10 / 10 sec | 10 / 10 sec   | You don't have to add contacts before sending your first message, the new contact is added to Wati automatically |
| */getMessages*                   | 10 / 10 sec | 10 / 10 sec | 10 / 10 sec   | We recommend using a webhook to receive incoming messages instead                                                |
| */sendTemplateMessage*           | 30 / 10 sec | 60 / 10 sec | 100 / 10 sec  | If you are sending the same template to multiple contact at once, we recommend using /sendTemplateMessage**s**.  |
| */sendTemplateMessages*          | 30 / 10 sec | 60 / 10 sec | 100 / 10 sec  | You can add up to 1000 contacts in 1 call.                                                                       |

<br />

**For higher limits, please reach out to us about your use case!**

\*These limits refer to how quickly your application can call Wati APIs, message requests are then processed in a queue.
