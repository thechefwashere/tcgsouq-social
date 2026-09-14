---
title: "Create webhooks"
source: "https://docs.wati.io/reference/post_api-v2-webhookendpoints.md"
final_url: "https://docs.wati.io/reference/post_api-v2-webhookendpoints.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "034a4a2cda81d6d4f4b535fa27a08c91a41ef62456fcddd5c69659394748875b"
---

---
updatedAt: 2026-05-19T06:59:15.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Create webhooks

# OpenAPI definition

```json
{
  "info": {
    "title": "WATI api",
    "version": "v1"
  },
  "paths": {
    "/api/v2/webhookEndpoints": {
      "post": {
        "tags": [
          "Webhooks"
        ],
        "summary": "Create webhooks",
        "responses": {
          "200": {
            "description": "Create webhooks success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "ok": {
                      "type": "boolean",
                      "description": "Indicates whether webhook creation was successful."
                    },
                    "result": {
                      "type": "array",
                      "description": "List of created or existing webhook endpoint configurations.",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Unique identifier of the webhook endpoint."
                          },
                          "tenantId": {
                            "type": "string",
                            "description": "Tenant identifier that owns this webhook endpoint."
                          },
                          "channelId": {
                            "type": "string",
                            "description": "Channel ID associated with this webhook, indicating which WhatsApp channel it belongs to."
                          },
                          "channelPhoneNumber": {
                            "type": "string",
                            "description": "Phone number of the channel for which this webhook is configured."
                          },
                          "url": {
                            "type": "string",
                            "description": "Destination URL where webhook events will be delivered."
                          },
                          "status": {
                            "type": "integer",
                            "description": "Status code of the webhook endpoint (e.g. 0 for active)."
                          },
                          "created": {
                            "type": "string",
                            "description": "Creation timestamp of the webhook endpoint."
                          },
                          "lastUpdated": {
                            "type": "string",
                            "description": "Last update timestamp of the webhook endpoint."
                          },
                          "failedIterationCount": {
                            "type": "integer",
                            "description": "Number of consecutive failed attempts for this webhook."
                          },
                          "isSentNotify": {
                            "type": "boolean",
                            "description": "Indicates whether a failure notification has been sent."
                          },
                          "eventTypes": {
                            "type": "array",
                            "description": "List of event types that will trigger this webhook (e.g. 'message', 'newContactMessageReceived').",
                            "items": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "example": {
                  "ok": true,
                  "result": [
                    {
                      "id": "68bfcbdcfb4c1ea18e30212b",
                      "tenantId": "100138",
                      "channelId": "687f6cf72b1ccf26eda76fce",
                      "channelPhoneNumber": "1650-937-9611",
                      "url": "https://google.com",
                      "status": 0,
                      "created": "2025-09-09T06:40:28.9638502Z",
                      "lastUpdated": "2025-09-09T06:40:28.9638502Z",
                      "failedIterationCount": 0,
                      "isSentNotify": false,
                      "eventTypes": [
                        "message"
                      ]
                    },
                    {
                      "id": "68bfcbdcfb4c1ea18e30212c",
                      "tenantId": "100138",
                      "channelId": "68831a430d62daa5211c30b1",
                      "channelPhoneNumber": "15557857193",
                      "url": "https://google.com",
                      "status": 0,
                      "created": "2025-09-09T06:40:28.9638502Z",
                      "lastUpdated": "2025-09-09T06:40:28.9638502Z",
                      "failedIterationCount": 0,
                      "isSentNotify": false,
                      "eventTypes": [
                        "message",
                        "newContactMessageReceived"
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        "parameters": [],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "phoneNumber": {
                      "type": "string"
                    },
                    "status": {
                      "type": "integer",
                      "format": "int32",
                      "description": "Webhook status type: 0 = Disabled, 1 = Enabled, 2 = Defective."
                    },
                    "url": {
                      "type": "string"
                    },
                    "eventTypes": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "example": [
                {
                  "phoneNumber": "1650-937-9611",
                  "status": 0,
                  "url": "https://google.com",
                  "eventTypes": [
                    "message"
                  ]
                },
                {
                  "phoneNumber": "1978-949-8353",
                  "status": 0,
                  "url": "https://google.com",
                  "eventTypes": [
                    "message",
                    "newContactMessageReceived"
                  ]
                }
              ]
            }
          }
        }
      }
    }
  },
  "openapi": "3.0.1",
  "servers": [
    {
      "url": "{WATI_API_ENDPOINT}"
    }
  ],
  "security": [
    {
      "Bearer": []
    }
  ],
  "components": {
    "securitySchemes": {
      "Bearer": {
        "in": "header",
        "name": "Authorization",
        "type": "apiKey",
        "description": "Enter 'Bearer' [space] and then your token in the text input below.\n                      Example: 'Bearer 12345abcdef'"
      }
    }
  },
  "x-samples-languages": [
    "curl",
    "python",
    "go",
    "node",
    "php",
    "java",
    "csharp"
  ],
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  }
}
```
