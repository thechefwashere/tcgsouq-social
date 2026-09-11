---
title: "Webhooks"
source: "https://www.canva.dev/docs/connect/webhooks/"
final_url: "https://www.canva.dev/docs/connect/webhooks/"
platform: "canva"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "markdown-served"
sha256: "b934347136d187eb60419a858f26154335afba18243b88fa4a2dba248ee24e7e"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/connect/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhooks

Receive real-time notification data for your users.

Webhooks allow Canva to send real-time information to your integration, without polling or manual intervention. Your integration will receive webhooks for events relevant to the authenticated user. Here's how a webhook typically works:

1. An event occurs in Canva. For example, John comments on Jane's design.
2. Canva sends the event information to the integration as a `POST` request.
3. The request contains event information, such as John's comment, when John made the comment, and what design it was made on.
4. The integration receives the request, and sends a `200` status code back to Canva in response, which indicates the webhook was successfully received and processed (other status codes indicate an error).

When receiving requests, your integration can perform further actions based on the event information. For example, sending an auto-reply to John's comment.

**Note:** Canva only supports outgoing webhooks. For information on responding to comments, check the [Comments API documentation](https://www.canva.dev/docs/connect/api-reference/comments/).

## Scopes

If you want your integration to receive specific web notifications from Canva, enable the following scopes:

| Notification type       | Required scopes                                                                           |
| ----------------------- | :---------------------------------------------------------------------------------------- |
| Comments                | <ul><li>`collaboration:event`</li><li>`design:meta:read`</li><li>`comment:read`</li></ul> |
| Design access requests  | <ul><li>`collaboration:event`</li><li>`design:meta:read`</li></ul>                        |
| Design approvals        | <ul><li>`collaboration:event`</li><li>`design:meta:read`</li></ul>                        |
| Design sharing events   | <ul><li>`collaboration:event`</li><li>`design:meta:read`</li></ul>                        |
| Folder access requests  | <ul><li>`collaboration:event`</li><li>`folder:permission:write`</li></ul>                 |
| Folder sharing events   | <ul><li>`collaboration:event`</li><li>`folder:read`</li></ul>                             |
| Team access invitations | <ul><li>`collaboration:event`</li></ul>                                                   |

<Note>
  When enabling and using scopes, you must be explicit.

  For example, the `asset:write` scope doesn't grant `asset:read` permissions. To get both read and write permissions for assets, you must enable both scopes in your integration settings, and request both scopes during the authorization process.
</Note>

## Notification

A notification is generated once an event occurs in Canva. The webhook payload object consists of the required information about the event that has occurred.

The content depends on the `type` of the notification. For:

* `comment`, see [Comment](/docs/connect/webhooks/comment-notification/).
* `design_access_requested`, see [Design access requested](/docs/connect/webhooks/design-access-requested-notification/).
* `design_approval_requested`, see [Design approval requested](/docs/connect/webhooks/design-approval-requested-notification/).
* `design_approval_response`, see [Design approval response](/docs/connect/webhooks/design-approval-response-notification/).
* `design_approval_reviewer_invalidated`, see [Design approval reviewer invalidated](/docs/connect/webhooks/design-approval-reviewer-invalidated-notification/).
* `design_mention`, see [Design mention](/docs/connect/webhooks/design-mention-notification/).
* `folder_access_requested`, see [Folder access requested](/docs/connect/webhooks/folder-access-requested-notification/).
* `share_design`, see [Share design](/docs/connect/webhooks/share-design-notification/).
* `share_folder`, see [Share folder](/docs/connect/webhooks/share-folder-notification/).
* `suggestion`, see [Suggestion](/docs/connect/webhooks/suggestion-notification/).
* `team_invite`, see [Team invite](/docs/connect/webhooks/team-invite-notification/).
