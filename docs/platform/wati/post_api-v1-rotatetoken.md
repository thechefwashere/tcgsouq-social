---
title: "Rotate token"
source: "https://docs.wati.io/reference/post_api-v1-rotatetoken.md"
final_url: "https://docs.wati.io/reference/post_api-v1-rotatetoken.md"
platform: "wati"
fetched_at: "2026-09-14T14:01:25Z"
previous_fetched_at: ""
http_status: "200"
format: "raw"
sha256: "d37073e03ac283c74a52bd06c1c674002c7c5a4969ed25c24aa7d3e371b27d89"
---

---
updatedAt: 2026-05-19T06:58:01.000Z
---

Fetch the complete documentation index at: https://docs.wati.io/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# Rotate Token

# OpenAPI definition

```json
{
  "info": {
    "title": "WATI api",
    "version": "v1"
  },
  "paths": {
    "/api/v1/rotateToken": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Rotate Token",
        "responses": {
          "200": {
            "description": "Success"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true,
            "description": "Token to block"
          }
        ]
      }
    }
  },
  "openapi": "3.0.1",
  "servers": [
    {
      "url": "{WATI_API_ENDPOINT}"
    }
  ],
  "security": [
    {
      "Bearer": []
    }
  ],
  "components": {
    "securitySchemes": {
      "Bearer": {
        "in": "header",
        "name": "Authorization",
        "type": "apiKey",
        "description": "Enter 'Bearer' [space] and then your token in the text input below.\n                      Example: 'Bearer 12345abcdef'"
      }
    }
  },
  "x-samples-languages": [
    "curl",
    "python",
    "go",
    "node",
    "php",
    "java",
    "csharp"
  ],
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  }
}
```
