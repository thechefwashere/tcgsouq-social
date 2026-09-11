---
title: "Scopes"
source: "https://www.canva.dev/docs/connect/appendix/scopes/"
final_url: "https://www.canva.dev/docs/connect/appendix/scopes/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "e478229e5733cd92bb2f01a02152293335b29c785457793cc37441f300c18828"
---

# Scopes
The `scope` parameter specifies the types of access that your integration needs for a user's account. The list of possible scopes used in the Connect APIs are shown below:

| Scope | Description |
| --- | --- |
| `asset:read` | View the metadata for the user's assets, such as uploaded images. |
| `asset:write` | Upload, update, or delete assets on the user's behalf. |
| `brandtemplate:content:read` | Read the content of the brand templates associated with the user's brand. |
| `brandtemplate:content:write` | Publish brand templates associated with the user's brand. |
| `brandtemplate:meta:read` | View the metadata of the brand templates associated with the user's brand. |
| `collaboration:event` | Receive webhook notifications about events relevant to the user. |
| `comment:read` | View the comments on the user's designs, and the associated metadata. |
| `comment:write` | Create comments and replies on the user's designs. |
| `design:content:read` | View the contents of the user's designs. |
| `design:content:write` | Create designs on the user's behalf. |
| `design:meta:read` | View the metadata of the user's designs. |
| `email` | Read user email address through OIDC. |
| `folder:permission:write` | Set, update, or remove permissions assigned to the user's folders. |
| `folder:read` | View the metadata and contents of the user's folders, including their \*\*Projects\*\* folder. |
| `folder:write` | Add, move, or remove the user's folders. It also lets you edit folder metadata, such as the folder's name. |
| `openid` | Read user information through Open ID Connect (OIDC). |
| `profile` | Read user profile information through OIDC. |
| `profile:read` | Read a user's profile and account information. |

For example, if you just require your integration to read design metadata, you can use the `design:meta:read` scope. If you require your integration to read designs, as well as write to any folder, you can use both the `design:meta:read` and the `folder:write` scopes.
When enabling and using scopes, you must be explicit.
For example, the `asset:write` scope doesn't grant `asset:read` permissions. To get both read and write permissions for assets, you must enable both scopes in your integration settings, and request both scopes during the authorization process.
