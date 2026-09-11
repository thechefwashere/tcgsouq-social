---
title: "Notifications setup"
source: "https://developers.google.com/my-business/content/notification-setup"
final_url: "https://developers.google.com/my-business/content/notification-setup"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "c61fe74e26d0becfb0f8dab54139155288bb9145947d9ee119776dd09fbf75ba"
---

# Manage real-time notifications Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The My Business Notifications API uses Cloud Pub/Sub to deliver notifications about various business events, such as new reviews, Q&As, and location updates.
- To receive notifications, you must set up a Cloud Pub/Sub topic, grant necessary permissions, and link your Business Profile account to the topic using the API.
- You can manage your notification settings using the API to retrieve, update (including setting a new topic or deleting the setting), or delete them.
- The API provides endpoints for retrieving, updating, and deleting notification settings associated with your Business Profile account.
- Refer to the provided links for detailed instructions on setting up Cloud Pub/Sub and using the My Business Notifications API.

In the My Business Notifications API, notifications are published in
the [Cloud Pub/Sub](https://cloud.google.com/pubsub/) service. After
you set up Cloud Pub/Sub and create a topic, you can perform the following
operations on notifications:

- [Retrieve notification settings.](#retrieve-notification-settings)
- [Update notification settings.](#update-notification-settings)
- [Delete notification settings.](#delete-notification-settings)

New or updated reviews, media uploads,
Google updates for review, location state changes, and more are supported.
The
[NotificationType](/my-business/reference/notifications/rest/v1/NotificationSetting#NotificationType)
object lists and describes the available notification types.

## Before you begin

To use the My Business Notifications API, register your application and obtain
OAuth 2.0 credentials. For details on how to get started with the API,
see [Basic setup](/my-business/content/basic-setup).

## Cloud Pub/Sub setup

To set up API notifications with
[Cloud Pub/Sub](https://cloud.google.com/pubsub/), perform the following steps:

1. Follow the Cloud Pub/Sub guide to
   [set up your application](https://cloud.google.com/pubsub/docs/quickstart-client-libraries).
2. [Create a topic](https://cloud.google.com/pubsub/docs/admin#create_a_topic)
   in your Cloud Pub/Sub project and note the name of the created topic.
3. Give at least [`pubsub.topics.publish`](https://cloud.google.com/pubsub/docs/access-control#tbl_roles)
   permissions to mybusiness-api-pubsub@system.gserviceaccount.com.
4. Follow the [Subscriber overview](https://cloud.google.com/pubsub/docs/subscriber)
   guide to set up either push or pull notifications.
5. To receive notifications, call the
   [`accounts.updateNotificationSetting`](/my-business/reference/notifications/rest/v1/accounts/updateNotificationSetting)
   endpoint in the My Business Notifications API. In the call, use the topic
   name you created in Cloud Pub/Sub to link your Business Profile account to the
   topic.
6. (Optional) Repeat step 5 for each Business Profile account that you want to
   receive notifications for.

## Retrieve notification settings

The [`accounts.getNotificationSetting`](/my-business/reference/notifications/rest/v1/accounts/getNotificationSetting)
endpoint returns the current Cloud Pub/Sub notification settings for an
account. The following table shows how to call it:

```
GET
https://mybusinessnotifications.googleapis.com/v1/accounts/{accountId}/notificationSetting
```

## Update notification settings

The [`accounts.updateNotificationSetting`](/my-business/reference/notifications/rest/v1/accounts/updateNotificationSetting)
endpoint updates the Cloud Pub/Sub notification settings associated with an
account. The following table shows how to call it:

```
PATCH
https://mybusinessnotifications.googleapis.com/v1/accounts/{accountId}/notificationSetting?updateMask={commaSeparatedFieldsToUpdate}

{
  pubsubTopic: your/pubsub/topicName
}
```

## Delete notification settings

Calling the
[`accounts.updateNotificationSetting`](/my-business/reference/notifications/rest/v1/accounts/updateNotificationSetting)
with an empty `pubsubTopic` deletes the Cloud Pub/Sub notification settings
from an account. The following table shows how to call it:

```
PATCH
https://mybusinessnotifications.googleapis.com/v1/accounts/{accountId}/notificationSetting?updateMask=pubsubTopic
```
