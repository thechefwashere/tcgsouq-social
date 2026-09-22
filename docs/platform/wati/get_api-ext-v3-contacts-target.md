---
title: "Contact detail"
source: "https://docs.wati.io/reference/get_api-ext-v3-contacts-target.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-contacts-target.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "7d582cc070190451abfc0b0c04199d2f1e184f44d01aeda5ac835b6d7d062994"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get contact details

> 📘 **BSUID Support:** The `target` path/body parameter now supports additional identifier formats:
>
> | Format            | Example                     | Description                                    |
> | ----------------- | --------------------------- | ---------------------------------------------- |
> | Phone Number      | `14155552671`               | Contact by phone (existing)                    |
> | Contact ID        | `507f1f77bcf86cd799439011`  | Contact by MongoDB ID (existing)               |
> | **BSUID**         | `US.123124141512`           | Contact by Business Solution User ID (**new**) |
> | Channel:Phone     | `MyChannel:14155552671`     | Contact scoped to channel (existing)           |
> | Channel:ContactId | `MyChannel:507f...`         | Contact + channel (existing)                   |
> | **Channel:BSUID** | `MyChannel:US.123124141512` | Contact by BSUID + channel (**new**)           |
>
> The system auto-detects the format. Existing callers using phone numbers or Contact IDs continue to work.

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/contacts/{target}": {
      "get": {
        "tags": [
          "Contacts"
        ],
        "summary": "Get contact details",
        "parameters": [
          {
            "name": "target",
            "in": "path",
            "description": "The target contact in the following formats:\n*   **`ContactId`**: The unique ID of a contact.\n*   **`PhoneNumber`**: The contact's phone number (e.g., `14155552671`).\n*   **`Channel:PhoneNumber`**: A combination of the channel (name or phone number) and the recipient's phone number (e.g., `MyChannel:1415552671`, `123456789:1415552671`).",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Returns the contact details.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ContactDto"
                },
                "example": {
                  "id": "507f1f77bcf86cd799439011",
                  "wa_id": "1234567890",
                  "name": "John Doe",
                  "phone": "+1234567890",
                  "photo": "https://example.com/photos/johndoe.jpg",
                  "created": "2024-01-15T10:30:00Z",
                  "last_updated": "2024-02-10T14:45:00Z",
                  "contact_status": "active",
                  "source": "manual",
                  "channel_id": "channel_123",
                  "ig_phone_source": "profile",
                  "mg_phone_source": "profile",
                  "opted_in": true,
                  "allow_broadcast": true,
                  "allow_sms": false,
                  "teams": [
                    "Team A",
                    "Team B"
                  ],
                  "segments": [],
                  "custom_params": [
                    {
                      "name": "customer_tier",
                      "value": "gold"
                    },
                    {
                      "name": "preferred_language",
                      "value": "en"
                    }
                  ],
                  "channel_type": "whatsapp",
                  "display_name": "John D.",
                  "contact_link": {
                    "whats_app_contact_id": "507f191e810c19729de860ec",
                    "instagram_contact_id": "507f191e810c19729de860ed",
                    "messenger_contact_id": "507f191e810c19729de860ee"
                  },
                  "is_broadcast_limit_reached": false
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
      "ContactDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the contact.",
            "nullable": true
          },
          "wa_id": {
            "type": "string",
            "description": "WhatsApp identifier for the contact.",
            "nullable": true
          },
          "name": {
            "type": "string",
            "description": "The contact's name.",
            "nullable": true
          },
          "phone": {
            "type": "string",
            "description": "The contact's phone number.",
            "nullable": true
          },
          "photo": {
            "type": "string",
            "description": "URL or path to the contact's photo.",
            "nullable": true
          },
          "created": {
            "type": "string",
            "description": "The date and time when the contact was created.",
            "format": "date-time"
          },
          "last_updated": {
            "type": "string",
            "description": "The date and time when the contact was last updated.",
            "format": "date-time"
          },
          "contact_status": {
            "type": "string",
            "description": "The current status of the contact.",
            "nullable": true
          },
          "source": {
            "type": "string",
            "description": "The source where the contact originated from.",
            "nullable": true
          },
          "channel_id": {
            "type": "string",
            "description": "The identifier of the channel associated with the contact.",
            "nullable": true
          },
          "ig_phone_source": {
            "type": "string",
            "description": "Instagram phone source information.",
            "nullable": true
          },
          "mg_phone_source": {
            "type": "string",
            "description": "Messenger phone source information.",
            "nullable": true
          },
          "opted_in": {
            "type": "boolean",
            "description": "Indicates whether the contact has opted in for communications."
          },
          "allow_broadcast": {
            "type": "boolean",
            "description": "Indicates whether the contact allows broadcast messages."
          },
          "allow_sms": {
            "type": "boolean",
            "description": "Indicates whether the contact allows SMS messages."
          },
          "teams": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of team associated with the contact.",
            "nullable": true
          },
          "segments": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of segments the contact belongs to.",
            "nullable": true
          },
          "custom_params": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CustomParamDto"
            },
            "description": "List of custom parameters associated with the contact.",
            "nullable": true
          },
          "channel_type": {
            "type": "string",
            "description": "The type of channel (e.g., whatsapp, instagram, messenger).",
            "nullable": true
          },
          "display_name": {
            "type": "string",
            "description": "The display name for the contact.",
            "nullable": true
          },
          "contact_link": {
            "$ref": "#/components/schemas/ContactLinkDto"
          },
          "is_broadcast_limit_reached": {
            "type": "string",
            "description": "Indicates whether the broadcast limit has been reached for this contact.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a contact object."
      },
      "ContactLinkDto": {
        "type": "object",
        "properties": {
          "whats_app_contact_id": {
            "type": "string",
            "description": "The contact identifier for WhatsApp.",
            "nullable": true
          },
          "instagram_contact_id": {
            "type": "string",
            "description": "The contact identifier for Instagram.",
            "nullable": true
          },
          "messenger_contact_id": {
            "type": "string",
            "description": "The contact identifier for Messenger.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents linked contact information across different messaging platforms."
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
