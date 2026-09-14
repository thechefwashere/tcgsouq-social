---
title: "Campaign overview (analytics)"
source: "https://docs.wati.io/reference/get_api-ext-v3-broadcasts-overview.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-broadcasts-overview.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "cfe351cbf7da92f22bfc041b7116fb099f1e438d273aba23425116f47aae932b"
---

---
updatedAt: 2026-05-19T06:55:00.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get the campaign overview

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/broadcasts/overview": {
      "get": {
        "tags": [
          "Campaigns"
        ],
        "summary": "Get the campaign overview",
        "parameters": [
          {
            "name": "channel",
            "in": "query",
            "description": "Name or phone number of the channel (null for default channel).",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date_from",
            "in": "query",
            "description": "The start date of the broadcast.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "date_to",
            "in": "query",
            "description": "The end date of the broadcast.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "search_string",
            "in": "query",
            "description": "The page number of the broadcast.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Returns the broadcast overview.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetBroadcastsOverviewResponse"
                },
                "example": {
                  "total_links": 0,
                  "total_processing": 0,
                  "total_queued": 0,
                  "total_sent": 0,
                  "total_delivered": 0,
                  "total_open": 0,
                  "total_replied": 0,
                  "total_failed": 0,
                  "total_stopped": 0,
                  "total_sending": 0
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
      "GetBroadcastsOverviewResponse": {
        "type": "object",
        "properties": {
          "total_links": {
            "type": "integer",
            "description": "The total number of links.",
            "format": "int64"
          },
          "total_processing": {
            "type": "integer",
            "description": "The total number of processing links.",
            "format": "int64"
          },
          "total_queued": {
            "type": "integer",
            "description": "The total number of queued links.",
            "format": "int64"
          },
          "total_sent": {
            "type": "integer",
            "description": "The total number of sent links.",
            "format": "int64"
          },
          "total_delivered": {
            "type": "integer",
            "description": "The total number of delivered links.",
            "format": "int64"
          },
          "total_open": {
            "type": "integer",
            "description": "The total number of open links.",
            "format": "int64"
          },
          "total_replied": {
            "type": "integer",
            "description": "The total number of replied links.",
            "format": "int64"
          },
          "total_failed": {
            "type": "integer",
            "description": "The total number of failed links.",
            "format": "int64"
          },
          "total_stopped": {
            "type": "integer",
            "description": "The total number of stopped links.",
            "format": "int64"
          },
          "total_sending": {
            "type": "integer",
            "description": "The total number of sending links.",
            "format": "int64"
          }
        },
        "additionalProperties": false,
        "description": "Response model for getting broadcasts overview."
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
