---
title: "Get message templates"
source: "https://docs.wati.io/reference/get_api-ext-v3-messagetemplates.md"
final_url: "https://docs.wati.io/reference/get_api-ext-v3-messagetemplates.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "73ecaf886c221b6d62fb0d25fed825ee815b35acba9afb069fdcde2d6c382ce1"
---

---
updatedAt: 2026-05-19T06:56:13.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Get message templates

# OpenAPI definition

```json
{
  "openapi": "3.0.4",
  "info": {
    "title": "WhatsApp chat API",
    "version": "v3"
  },
  "paths": {
    "/api/ext/v3/messageTemplates": {
      "get": {
        "tags": [
          "MessageTemplate"
        ],
        "summary": "Get message templates",
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
            "description": "Returns the message templates.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetMessageTemplatesResponse"
                },
                "example": {
                  "templates": [
                    {
                      "id": "template_123",
                      "name": "Welcome Message",
                      "category": "MARKETING",
                      "sub_category": "STANDARD",
                      "hsm": "Hello {{1}}, welcome to our service!",
                      "hsm_original": "Hello {{1}}, welcome to our service!",
                      "custom_params": [
                        {
                          "name": "name",
                          "value": "customer_name"
                        }
                      ],
                      "status": "APPROVED",
                      "language_option": {
                        "key": "English (US)",
                        "value": "en_US",
                        "text": "English (US)"
                      },
                      "last_modified": "2024-01-15T10:30:00Z",
                      "type": "TEXT",
                      "body": "Hello {{1}}, welcome to our service!",
                      "body_original": "Hello {{1}}, welcome to our service!",
                      "buttons": [],
                      "carousel_cards": [],
                      "expires_in": 0,
                      "include_expiry_time": false,
                      "add_security_recommendation": false,
                      "is_url_btn_click_tracking_enabled": false,
                      "quality": "GREEN",
                      "creation_method": "HUMAN"
                    }
                  ],
                  "page_number": 1,
                  "page_size": 10,
                  "total": 1
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
      "ButtonMessageTemplateComponentDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "The type of button component.",
            "nullable": true
          },
          "parameter": {
            "$ref": "#/components/schemas/ButtonMessageTemplateComponentParameterDto"
          }
        },
        "additionalProperties": false,
        "description": "Represents a button component for a message template."
      },
      "ButtonMessageTemplateComponentParameterDto": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string",
            "description": "The button text.",
            "nullable": true
          },
          "phone_number": {
            "type": "string",
            "description": "The phone number for call buttons.",
            "nullable": true
          },
          "url": {
            "type": "string",
            "description": "The URL for URL buttons.",
            "nullable": true
          },
          "url_original": {
            "type": "string",
            "description": "The original URL content.",
            "nullable": true
          },
          "url_type": {
            "type": "string",
            "description": "The type of URL.",
            "nullable": true
          },
          "button_param_mapping": {
            "$ref": "#/components/schemas/TemplateParamDto"
          },
          "copy_offer_code": {
            "type": "string",
            "description": "The copy offer code.",
            "nullable": true
          },
          "order_details": {
            "$ref": "#/components/schemas/OrderDetailsParametersDto"
          },
          "flow_id": {
            "type": "string",
            "description": "The WhatsApp Flow ID for flow buttons.",
            "nullable": true
          },
          "flow_action": {
            "type": "string",
            "description": "The flow action type (navigate or data_exchange).",
            "nullable": true
          },
          "navigate_screen": {
            "type": "string",
            "description": "The screen ID to navigate to when flow_action is navigate.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents parameters for a button component."
      },
      "CarouselMessageTemplateViewModelDto": {
        "type": "object",
        "properties": {
          "header": {
            "$ref": "#/components/schemas/HeaderMessageTemplateComponentDto"
          },
          "body": {
            "type": "string",
            "description": "The body content.",
            "nullable": true
          },
          "body_original": {
            "type": "string",
            "description": "The original body content.",
            "nullable": true
          },
          "body_param_mapping": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TemplateParamDto"
            },
            "description": "The body parameter mapping.",
            "nullable": true
          },
          "buttons": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ButtonMessageTemplateComponentDto"
            },
            "description": "The list of buttons.",
            "nullable": true
          },
          "buttons_type": {
            "type": "string",
            "description": "The type of buttons.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a carousel message template view model."
      },
      "CatalogInfoDto": {
        "type": "object",
        "properties": {
          "catalog_id": {
            "type": "string",
            "description": "The catalog identifier.",
            "nullable": true
          },
          "thumbnail_product": {
            "$ref": "#/components/schemas/CatalogProductDto"
          },
          "is_active": {
            "type": "boolean",
            "description": "Whether the catalog is active."
          }
        },
        "additionalProperties": false,
        "description": "Represents catalog information for a message template."
      },
      "CatalogProductDto": {
        "type": "object",
        "properties": {
          "product_retailer_id": {
            "type": "string",
            "description": "The product retailer identifier.",
            "nullable": true
          },
          "id": {
            "type": "string",
            "description": "The product identifier.",
            "nullable": true
          },
          "retailer_product_group_id": {
            "type": "string",
            "description": "The retailer product group identifier.",
            "nullable": true
          },
          "price": {
            "type": "string",
            "description": "The product price.",
            "nullable": true
          },
          "sale_price": {
            "type": "string",
            "description": "The sale price.",
            "nullable": true
          },
          "name": {
            "type": "string",
            "description": "The product name.",
            "nullable": true
          },
          "currency": {
            "type": "string",
            "description": "The currency.",
            "nullable": true
          },
          "image_url": {
            "type": "string",
            "description": "The image URL.",
            "nullable": true
          },
          "errors": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ProductErrorDto"
            },
            "description": "The list of product errors.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a catalog product."
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
      "GetMessageTemplatesResponse": {
        "type": "object",
        "properties": {
          "templates": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MessageTemplateDto"
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
          },
          "total": {
            "type": "integer",
            "description": "The total number of message templates available.",
            "format": "int64"
          }
        },
        "additionalProperties": false,
        "description": "Response model for getting message templates."
      },
      "HeaderMessageTemplateComponentDto": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "The type of header component.",
            "nullable": true
          },
          "text": {
            "type": "string",
            "description": "The text content of the header.",
            "nullable": true
          },
          "link": {
            "type": "string",
            "description": "The link associated with the header.",
            "nullable": true
          },
          "media_header_id": {
            "type": "string",
            "description": "The media header identifier.",
            "nullable": true
          },
          "media_from_pc": {
            "type": "string",
            "description": "The media from PC identifier.",
            "nullable": true
          },
          "header_original": {
            "type": "string",
            "description": "The original header content.",
            "nullable": true
          },
          "header_param_mapping": {
            "$ref": "#/components/schemas/TemplateParamDto"
          }
        },
        "additionalProperties": false,
        "description": "Represents a header component for a message template."
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
      "LanguageOptionDto": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "The language key identifier.",
            "nullable": true
          },
          "value": {
            "type": "string",
            "description": "The language value.",
            "nullable": true
          },
          "text": {
            "type": "string",
            "description": "The display text for the language option.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a language option for a message template."
      },
      "LimitedTimeOfferDto": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string",
            "description": "The offer text description.",
            "nullable": true
          },
          "has_expiration": {
            "type": "boolean",
            "description": "Whether the offer has an expiration time."
          },
          "expiration_time": {
            "type": "string",
            "description": "The expiration date and time of the offer.",
            "format": "date-time"
          }
        },
        "additionalProperties": false,
        "description": "Represents a limited time offer configuration for a message template."
      },
      "MessageTemplateDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The unique identifier of the message template.",
            "nullable": true
          },
          "name": {
            "type": "string",
            "description": "The name of the message template.",
            "nullable": true
          },
          "category": {
            "type": "string",
            "description": "The category of the template.",
            "nullable": true
          },
          "sub_category": {
            "type": "string",
            "description": "The subcategory of the template.",
            "nullable": true
          },
          "catalog_info": {
            "$ref": "#/components/schemas/CatalogInfoDto"
          },
          "hsm": {
            "type": "string",
            "description": "The HSM (Highly Structured Message) content.",
            "nullable": true
          },
          "hsm_original": {
            "type": "string",
            "description": "The original HSM content.",
            "nullable": true
          },
          "custom_params": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TemplateParameterDto"
            },
            "description": "The list of custom parameters associated with this template.",
            "nullable": true
          },
          "status": {
            "type": "string",
            "description": "The current status of the template.",
            "nullable": true
          },
          "language_option": {
            "$ref": "#/components/schemas/LanguageOptionDto"
          },
          "last_modified": {
            "type": "string",
            "description": "The last modification date of the template.",
            "format": "date-time"
          },
          "type": {
            "type": "string",
            "description": "The type of the message template.",
            "nullable": true
          },
          "header": {
            "$ref": "#/components/schemas/HeaderMessageTemplateComponentDto"
          },
          "body": {
            "type": "string",
            "description": "The body content of the template.",
            "nullable": true
          },
          "body_original": {
            "type": "string",
            "description": "The original body content of the template.",
            "nullable": true
          },
          "footer": {
            "type": "string",
            "description": "The footer content of the template.",
            "nullable": true
          },
          "buttons": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ButtonMessageTemplateComponentDto"
            },
            "description": "The list of button components.",
            "nullable": true
          },
          "buttons_type": {
            "type": "string",
            "description": "The type of buttons used in the template.",
            "nullable": true
          },
          "carousel_cards": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CarouselMessageTemplateViewModelDto"
            },
            "description": "The list of carousel cards for the template.",
            "nullable": true
          },
          "expires_in": {
            "type": "integer",
            "description": "Expiration time in seconds.",
            "format": "int32"
          },
          "include_expiry_time": {
            "type": "boolean",
            "description": "Whether to include expiry time."
          },
          "add_security_recommendation": {
            "type": "boolean",
            "description": "Whether to add security recommendation."
          },
          "is_url_btn_click_tracking_enabled": {
            "type": "boolean",
            "description": "Whether URL button click tracking is enabled."
          },
          "limited_time_offer": {
            "$ref": "#/components/schemas/LimitedTimeOfferDto"
          },
          "quality": {
            "type": "string",
            "description": "The quality rating of the template.",
            "nullable": true
          },
          "creation_method": {
            "type": "string",
            "description": "The method used to create the template.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a message template with its configuration and parameters."
      },
      "OrderDetailsParametersDto": {
        "type": "object",
        "properties": {
          "reference_id": {
            "type": "string",
            "description": "The reference identifier.",
            "nullable": true
          },
          "type": {
            "type": "string",
            "description": "The parameter type.",
            "nullable": true
          },
          "payment_configuration": {
            "type": "string",
            "description": "The payment configuration.",
            "nullable": true
          },
          "currency": {
            "type": "string",
            "description": "The currency.",
            "nullable": true
          },
          "total_amount": {
            "type": "string",
            "description": "The total amount.",
            "nullable": true
          },
          "order": {
            "type": "string",
            "description": "The order details.",
            "nullable": true
          },
          "payment_type": {
            "type": "string",
            "description": "The payment type.",
            "nullable": true
          },
          "beneficiaries": {
            "type": "string",
            "description": "The list of beneficiaries.",
            "nullable": true
          },
          "payment_settings": {
            "type": "string",
            "description": "The payment settings.",
            "nullable": true
          },
          "shipping_info": {
            "type": "string",
            "description": "The shipping information.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents order details parameters."
      },
      "ProductErrorDto": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "The error title.",
            "nullable": true
          },
          "type": {
            "type": "string",
            "description": "The error type.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a product error."
      },
      "TemplateParamDto": {
        "type": "object",
        "properties": {
          "index": {
            "type": "integer",
            "description": "The parameter index.",
            "format": "int32"
          },
          "param_name": {
            "type": "string",
            "description": "The parameter name.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a template parameter."
      },
      "TemplateParameterDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the template parameter.",
            "nullable": true
          },
          "value": {
            "type": "string",
            "description": "The value of the template parameter.",
            "nullable": true
          }
        },
        "additionalProperties": false,
        "description": "Represents a parameter used within a message template."
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
