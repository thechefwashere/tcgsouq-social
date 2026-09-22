---
title: "Estimate broadcast cost"
source: "https://docs.wati.io/reference/post_api-ext-v3-broadcasts-estimate-cost.md"
final_url: "https://docs.wati.io/reference/post_api-ext-v3-broadcasts-estimate-cost.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "cba70ecbfa8999fab6e6c9d5301a05ba58c902b30bf1e6a60985b836c5a8dfea"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Estimate the cost of sending a template to the given contacts.

Returns the estimated credits needed (and the current balance) for a template
broadcast to the supplied contacts. The estimate is read-only — no message is
sent.

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/broadcasts/estimate-cost": {
      "post": {
        "tags": [
          "Campaigns"
        ],
        "summary": "Estimate the cost of sending a template to the given contacts.",
        "description": "Returns the estimated credits needed (and the current balance) for a template\nbroadcast to the supplied contacts. The estimate is read-only — no message is\nsent.",
        "requestBody": {
          "content": {
            "application/json-patch+json": {
              "schema": {
                "$ref": "#/components/schemas/EstimateBroadcastCostRequest"
              },
              "example": {
                "template_id": "tpl_abc123",
                "contact_ids": [
                  "contact_1",
                  "contact_2"
                ]
              }
            },
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EstimateBroadcastCostRequest"
              },
              "example": {
                "template_id": "tpl_abc123",
                "contact_ids": [
                  "contact_1",
                  "contact_2"
                ]
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/EstimateBroadcastCostRequest"
              },
              "example": {
                "template_id": "tpl_abc123",
                "contact_ids": [
                  "contact_1",
                  "contact_2"
                ]
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/EstimateBroadcastCostRequest"
              },
              "example": {
                "template_id": "tpl_abc123",
                "contact_ids": [
                  "contact_1",
                  "contact_2"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Returns the estimated cost.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EstimateBroadcastCostResponse"
                },
                "example": {
                  "estimated_cost": 12.5,
                  "current_credit": 100,
                  "current_welcome_credit": 10,
                  "result": true,
                  "is_request_succeeded": true
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
      "EstimateBroadcastCostRequest": {
        "type": "object",
        "properties": {
          "template_id": {
            "type": "string",
            "description": "The template to send.",
            "nullable": true
          },
          "contact_ids": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "The contacts to send to. At least one contact id is required.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Request model for estimating the cost of a template broadcast."
      },
      "EstimateBroadcastCostResponse": {
        "type": "object",
        "properties": {
          "estimated_cost": {
            "type": "number",
            "description": "Estimated credits needed for the send.",
            "format": "double"
          },
          "current_credit": {
            "type": "number",
            "description": "Current paid credit balance.",
            "format": "double"
          },
          "current_welcome_credit": {
            "type": "number",
            "description": "Current welcome (trial) credit balance.",
            "format": "double"
          },
          "result": {
            "type": "boolean",
            "description": "Whether the current balance and the template category allow the send."
          },
          "is_request_succeeded": {
            "type": "boolean",
            "description": "Whether the cost estimation succeeded."
          },
          "failed_detail": {
            "type": "string",
            "description": "Failure reason when the estimation failed.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Response model for estimating the cost of a template broadcast."
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
