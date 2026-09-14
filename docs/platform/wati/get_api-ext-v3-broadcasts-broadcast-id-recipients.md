---
title: "Campaign recipients"
source: "https://docs.wati.io/reference/get_api-ext-v3-broadcasts-broadcast-id-recipients.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-broadcasts-broadcast-id-recipients.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "8f31cf3f6c6968c71c0f0547f2500674fd40129e75d1893066c83efdd41c5cfe"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get the campaign recipients by ID

> 📘 **BSUID Support — Response Enrichment:** Broadcast recipient objects now include:
>
> | New Field | Type        | Description                                |
> | --------- | ----------- | ------------------------------------------ |
> | `bsuid`   | string/null | Business Solution User ID of the recipient |

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/broadcasts/{broadcast_id}/recipients": {
      "get": {
        "tags": [
          "Campaigns"
        ],
        "summary": "Get the campaign recipients by ID",
        "parameters": [
          {
            "name": "broadcast_id",
            "in": "path",
            "description": "The unique identifier of the broadcast to retrieve.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_number",
            "in": "query",
            "description": "Page number (1-based).",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Number of items per page (max 100).",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Returns the broadcast recipients.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetBroadcastRecipientsResponse"
                },
                "example": {
                  "recipients": [
                    {
                      "id": "recipient-123",
                      "contact_id": "contact-456",
                      "contact_name": "John Doe",
                      "contact_phone": "+1234567890",
                      "status": "processing",
                      "local_message_id": "local-msg-789",
                      "message_id": "msg-101112",
                      "custom_params": [
                        {
                          "name": "firstName",
                          "value": "John"
                        },
                        {
                          "name": "lastName",
                          "value": "Doe"
                        }
                      ],
                      "created": "2024-01-15T10:30:00Z"
                    }
                  ],
                  "page_number": 1,
                  "page_size": 10,
                  "total_count": 1
                }
              }
            }
          },
          "400": {
            "description": "The request is invalid.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InvalidRequestResponse"
                }
              }
            }
          },
          "401": {
            "description": "The request is unauthorized."
          },
          "403": {
            "description": "The request is forbidden.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForbiddenRequestResponse"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests. Either the rate limit has been exceeded or usage limits have been reached."
          },
          "500": {
            "description": "Unexpected error occurred. Please try again.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UnexpectedErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "BroadcastRecipientDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The identifier of the broadcast recipient",
            "nullable": true
          },
          "contact_id": {
            "type": "string",
            "description": "The identifier of the contact associated with the recipient",
            "nullable": true
          },
          "contact_name": {
            "type": "string",
            "description": "The name of the contact",
            "nullable": true
          },
          "contact_phone": {
            "type": "string",
            "description": "The phone number of the contact",
            "nullable": true
          },
          "status": {
            "type": "string",
            "description": "The status of the broadcast recipient",
            "nullable": true
          },
          "failed_code": {
            "type": "string",
            "description": "The failure code if the message failed to send",
            "nullable": true
          },
          "local_message_id": {
            "type": "string",
            "description": "The local message identifier",
            "nullable": true
          },
          "message_id": {
            "type": "string",
            "description": "The message identifier from the messaging platform",
            "nullable": true
          },
          "custom_params": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CustomParamDto"
            },
            "description": "The custom parameters associated with the recipient",
            "nullable": true
          },
          "created": {
            "type": "string",
            "description": "The creation timestamp of the broadcast recipient",
            "format": "date-time"
          }
        },
        "additionalProperties": false,
        "description": "Represents a broadcast recipient."
      },
      "CustomParamDto": {
        "required": [
          "name",
          "value"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the custom parameter."
          },
          "value": {
            "type": "string",
            "description": "The value of the custom parameter."
          }
        },
        "additionalProperties": false,
        "description": "Custom parameter key-value pair."
      },
      "ForbiddenRequestResponse": {
        "required": [
          "code",
          "message"
        ],
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "description": "The error code associated with the error.",
            "format": "int32"
          },
          "message": {
            "type": "string",
            "description": "The descriptive error message explaining what went wrong.",
            "nullable": true
          },
          "timestamp": {
            "type": "string",
            "description": "The timestamp indicating when the error was recorded.",
            "format": "date-time"
          }
        },
        "additionalProperties": false,
        "description": "Represents the result of a forbidden request, containing error details."
      },
      "GetBroadcastRecipientsResponse": {
        "type": "object",
        "properties": {
          "recipients": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BroadcastRecipientDto"
            },
            "description": "The list of broadcast recipients",
            "nullable": true
          },
          "page_number": {
            "type": "integer",
            "description": "The current page number",
            "format": "int32"
          },
          "page_size": {
            "type": "integer",
            "description": "The number of items per page",
            "format": "int32"
          },
          "total_count": {
            "type": "integer",
            "description": "The total number of recipients",
            "format": "int64"
          }
        },
        "additionalProperties": false,
        "description": "Response model for getting the recipients of a specific broadcast."
      },
      "InvalidRequestResponse": {
        "required": [
          "code",
          "message"
        ],
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "description": "The error code associated with the error.",
            "format": "int32"
          },
          "message": {
            "type": "string",
            "description": "The descriptive error message explaining what went wrong.",
            "nullable": true
          },
          "timestamp": {
            "type": "string",
            "description": "The timestamp indicating when the error was recorded.",
            "format": "date-time"
          }
        },
        "additionalProperties": false,
        "description": "Represents the result of a bad request, containing error details."
      },
      "UnexpectedErrorResponse": {
        "required": [
          "code",
          "message"
        ],
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "description": "The error code associated with the error.",
            "format": "int32"
          },
          "message": {
            "type": "string",
            "description": "The descriptive error message explaining what went wrong.",
            "nullable": true
          },
          "timestamp": {
            "type": "string",
            "description": "The timestamp indicating when the error was recorded.",
            "format": "date-time"
          }
        },
        "additionalProperties": false,
        "description": "Represents an unexpected error."
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "apiKey",
        "description": "Enter 'Bearer' [space] and then your token in the text input below.\n                      Example: 'Bearer 12345abcdef'",
        "name": "Authorization",
        "in": "header"
      }
    }
  },
  "security": [
    {
      "Bearer": []
    }
  ]
}
```
