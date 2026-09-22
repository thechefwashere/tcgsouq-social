---
title: "Contact count"
source: "https://docs.wati.io/reference/get_api-ext-v3-contacts-count.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-contacts-count.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "c1f8f60ce80332b1779135545e3e558f489de29c083335546816ac1a8837fdd4"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get contact count

> 📘 **BSUID Support — Response Enrichment:** Contact objects in the response now include additional identifiers:
>
> | New Field     | Type        | Description                                                 |
> | ------------- | ----------- | ----------------------------------------------------------- |
> | `bsuid`       | string/null | Business Solution User ID — stable cross-channel identifier |
> | `username`    | string/null | Human-readable username handle                              |
> | `parentBsuid` | string/null | Parent BSUID — enterprise-level identifier                  |
>
> The existing `phone` field remains present but is now nullable (omitted via `NullValueHandling.Ignore` when null). The `id` field (Contact ID) continues to be always present.

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/contacts/count": {
      "get": {
        "tags": [
          "Contacts"
        ],
        "summary": "Get contact count",
        "parameters": [
          {
            "name": "date_from",
            "in": "query",
            "description": "The start date of the contact.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date_to",
            "in": "query",
            "description": "The end date of the contact.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Returns the contact count.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetContactCountResponse"
                },
                "example": {
                  "contact_count": 100
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
      "GetContactCountResponse": {
        "type": "object",
        "properties": {
          "contact_count": {
            "type": "integer",
            "description": "The contact count.",
            "format": "int64"
          }
        },
        "additionalProperties": false,
        "description": "Response model for getting contact count."
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
