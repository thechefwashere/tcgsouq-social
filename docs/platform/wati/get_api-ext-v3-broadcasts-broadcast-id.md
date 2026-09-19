---
title: "Campaign detail"
source: "https://docs.wati.io/reference/get_api-ext-v3-broadcasts-broadcast-id.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-broadcasts-broadcast-id.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "46706b0ffd37e1d6bc1fdc5b6a160df25dcf5d316c7bfbdc50474ebb14c6f0d9"
---

---
updatedAt: 2026-05-19T06:54:53.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get the campaign details by ID

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/broadcasts/{broadcast_id}": {
      "get": {
        "tags": [
          "Campaigns"
        ],
        "summary": "Get the campaign details by ID",
        "parameters": [
          {
            "name": "broadcast_id",
            "in": "path",
            "description": "The unique identifier of the broadcast to retrieve.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Returns the broadcast details.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BroadcastDetailsDto"
                },
                "example": {
                  "id": "broadcast-123",
                  "channel_id": "channel-456",
                  "name": "Spring Sale Campaign",
                  "status": "processing",
                  "template_id": "template-789",
                  "fallback_templates": [
                    {
                      "templateId": "sms-template-101",
                      "type": 0,
                      "providerType": 0
                    }
                  ],
                  "created": "2024-01-15T10:30:00Z",
                  "last_updated": "2024-01-20T12:00:00Z",
                  "scheduled_at": "2024-02-01T09:00:00Z",
                  "statistics": {
                    "total_recipients": 1000,
                    "total_pending": 0,
                    "total_queued": 950,
                    "total_sending": 20,
                    "total_sent": 900,
                    "total_delivered": 850,
                    "total_read": 800,
                    "total_replied": 50,
                    "total_failed": 50,
                    "total_stopped": 0
                  }
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
      "BroadcastDetailsDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The identifier of the broadcast",
            "nullable": true
          },
          "channel_id": {
            "type": "string",
            "description": "The identifier of the channel associated with the broadcast",
            "nullable": true
          },
          "name": {
            "type": "string",
            "description": "The name of the broadcast",
            "nullable": true
          },
          "status": {
            "type": "string",
            "description": "The status of the broadcast",
            "nullable": true
          },
          "template_id": {
            "type": "string",
            "description": "The identifier of the message template used in the broadcast",
            "nullable": true
          },
          "fallback_templates": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/FallbackTemplate"
            },
            "description": "The fallback templates used in the broadcast",
            "nullable": true
          },
          "created": {
            "type": "string",
            "description": "The creation timestamp of the broadcast",
            "format": "date-time"
          },
          "last_updated": {
            "type": "string",
            "description": "The last updated timestamp of the broadcast",
            "format": "date-time"
          },
          "scheduled_at": {
            "type": "string",
            "description": "The scheduled time for the broadcast",
            "format": "date-time"
          },
          "statistics": {
            "$ref": "#/components/schemas/BroadcastStatisticsDto"
          }
        },
        "additionalProperties": false,
        "description": "Represents a detailed broadcast object."
      },
      "BroadcastStatisticsDto": {
        "type": "object",
        "properties": {
          "total_recipients": {
            "type": "integer",
            "description": "The total number of recipients for the broadcast",
            "format": "int32"
          },
          "total_pending": {
            "type": "integer",
            "description": "The total number of messages pending to be processed",
            "format": "int32"
          },
          "total_queued": {
            "type": "integer",
            "description": "The total number of messages queued for sending",
            "format": "int32"
          },
          "total_sending": {
            "type": "integer",
            "description": "The total number of messages currently being sent",
            "format": "int32"
          },
          "total_sent": {
            "type": "integer",
            "description": "The total number of messages sent",
            "format": "int32"
          },
          "total_delivered": {
            "type": "integer",
            "description": "The total number of messages delivered",
            "format": "int32"
          },
          "total_read": {
            "type": "integer",
            "description": "The total number of messages read by recipients",
            "format": "int32"
          },
          "total_replied": {
            "type": "integer",
            "description": "The total number of replies received from recipients",
            "format": "int32"
          },
          "total_failed": {
            "type": "integer",
            "description": "The total number of messages that failed to send",
            "format": "int32"
          },
          "total_stopped": {
            "type": "integer",
            "description": "The total number of messages that were stopped",
            "format": "int32"
          }
        },
        "additionalProperties": false,
        "description": "Represents statistics related to a broadcast."
      },
      "FallbackTemplate": {
        "type": "object",
        "properties": {
          "templateId": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "integer",
            "format": "int32"
          },
          "providerType": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
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
