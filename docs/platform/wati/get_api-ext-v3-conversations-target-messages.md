---
title: "Get messages"
source: "https://docs.wati.io/reference/get_api-ext-v3-conversations-target-messages.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-conversations-target-messages.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "a7c5c03ce82e8a9b308d30243d0c3eb213a163a674e34387e93634893c234666"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get messages

> 📘 **BSUID Support:** The conversation `target` parameter now supports additional identifier formats:
>
> | Format                | Example                     | Description                                         |
> | --------------------- | --------------------------- | --------------------------------------------------- |
> | Conversation ID       | `685bd235e6119686e693a093`  | Direct conversation lookup (existing)               |
> | Phone Number          | `14155552671`               | Most recent open conversation for phone (existing)  |
> | **Contact ID**        | `507f1f77bcf86cd799439011`  | Most recent open conversation for contact (**new**) |
> | **BSUID**             | `US.123124141512`           | Most recent open conversation for BSUID (**new**)   |
> | Channel:Phone         | `MyChannel:14155552671`     | Channel-scoped conversation (existing)              |
> | **Channel:ContactId** | `MyChannel:507f...`         | Channel-scoped by contact ID (**new**)              |
> | **Channel:BSUID**     | `MyChannel:US.123124141512` | Channel-scoped by BSUID (**new**)                   |
>
> **Note:** Returns `409 Conflict` if multiple open conversations exist for the contact without a channel specified.

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/conversations/{target}/messages": {
      "get": {
        "tags": [
          "Conversations"
        ],
        "summary": "Get messages",
        "parameters": [
          {
            "name": "target",
            "in": "path",
            "description": "The target conversation in the following formats:\n*   **`ConversationId`**: The unique ID of a conversation.\n*   **`PhoneNumber`**: The conversation's phone number (e.g., `14155552671`).\n*   **`Channel:PhoneNumber`**: A combination of the channel (name or phone number) and the recipient's phone number (e.g., `MyChannel:1415552671`, `123456789:1415552671`).\n*   **`BSUID`**: The recipient's Business-Scoped User ID (e.g., `ML.2011135123094924`).\n*   **`Channel:BSUID`**: A combination of the channel (name or phone number) and the recipient's BSUID (e.g., `MyChannel:ML.2011135123094924`, `123456789:ML.2011135123094924`).",
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
            "description": "Returns the message list.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetMessagesByConversationIdResponse"
                },
                "example": {
                  "message_list": [
                    {
                      "text": "Hello, this is a sample message!",
                      "type": "text",
                      "timestamp": "2026-08-25T01:29:40.4082882Z",
                      "owner": true,
                      "status": "delivered",
                      "avatar_url": "https://example.com/avatar.png",
                      "assigned_id": "6858f59a3374901cc1c8223f",
                      "operator_name": "John Doe",
                      "bot_type": "regular",
                      "local_message_id": "88aed3c93a050b3c53978463",
                      "id": "507f1f77bcf86cd799439011",
                      "created": "2026-08-25T01:29:40.4082876Z",
                      "conversation_id": "685bd235e6119686e693a093",
                      "ticket_id": "68aed3c93a050b3c53978463",
                      "event_type": "message"
                    }
                  ],
                  "page_number": 1,
                  "page_size": 10
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
      "ConversationEventDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The unique identifier of the conversation event.",
            "nullable": true
          },
          "created": {
            "type": "string",
            "description": "The creation timestamp of the event.",
            "format": "date-time"
          },
          "conversation_id": {
            "type": "string",
            "description": "The associated conversation identifier.",
            "nullable": true
          },
          "ticket_id": {
            "type": "string",
            "description": "The associated ticket identifier.",
            "nullable": true
          },
          "event_type": {
            "type": "string",
            "description": "The type of event (e.g., message, ticket, broadcast).",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a base conversation event."
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
      "GetMessagesByConversationIdResponse": {
        "type": "object",
        "properties": {
          "message_list": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ConversationEventDto"
            },
            "description": "The list of conversation message",
            "nullable": true
          },
          "page_number": {
            "type": "integer",
            "description": "The current page number.",
            "format": "int32"
          },
          "page_size": {
            "type": "integer",
            "description": "The number of items per page.",
            "format": "int32"
          }
        },
        "additionalProperties": false,
        "description": "Response model for getting the message list."
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
