---
title: "Get contacts"
source: "https://docs.wati.io/reference/get_api-ext-v3-contacts.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-contacts.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "84f7ea8c9bac4493dd563f35e995d2f441556a22e32a9eb92f8a5177b797dcf1"
---

---
updatedAt: 2026-08-25T01:36:18.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get contacts

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
    "/api/ext/v3/contacts": {
      "get": {
        "tags": [
          "Contacts"
        ],
        "summary": "Get contacts",
        "parameters": [
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
            "description": "Returns the contact list.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetContactListResponse"
                },
                "example": {
                  "contact_list": [
                    {
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
      "GetContactListResponse": {
        "type": "object",
        "properties": {
          "contact_list": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContactDto"
            },
            "description": "The list of message templates.",
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
        "description": "Response model for getting contact list."
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
