---
title: "Account credit balance"
source: "https://docs.wati.io/reference/get_api-ext-v3-account-credits.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-account-credits.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "6acc87a9cc8e06a17401d65b0ff638acc48ac1dd4684cb3a101bd91441df972e"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get the authenticated tenant's credit balance.

Returns the caller's own credit balance only — identity is derived from the
authenticated tenant context, never from caller-supplied fields, so one tenant
cannot query another tenant's balance.

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/account/credits": {
      "get": {
        "tags": [
          "Account"
        ],
        "summary": "Get the authenticated tenant's credit balance.",
        "description": "Returns the caller's own credit balance only — identity is derived from the\nauthenticated tenant context, never from caller-supplied fields, so one tenant\ncannot query another tenant's balance.",
        "responses": {
          "200": {
            "description": "Returns the tenant's credit balance.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountCreditsDto"
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
      "AccountCreditsDto": {
        "type": "object",
        "properties": {
          "credit": {
            "type": "number",
            "description": "Remaining paid credit balance.",
            "format": "double"
          },
          "welcome_credit": {
            "type": "number",
            "description": "Remaining welcome (trial) credit balance.",
            "format": "double"
          },
          "remaining_free_conversations_count": {
            "type": "integer",
            "description": "Number of free conversations remaining in the current cycle.",
            "format": "int32"
          },
          "currency": {
            "type": "string",
            "description": "Currency of the credit balance.",
            "nullable": true
          },
          "auto_charge_enabled": {
            "type": "boolean",
            "description": "Whether auto-recharge is enabled for the tenant."
          }
        },
        "additionalProperties": false,
        "description": "Credits and free-conversation balance for the authenticated tenant."
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
