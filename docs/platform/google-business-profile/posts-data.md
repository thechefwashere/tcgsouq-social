---
title: "Work with local posts"
source: "https://developers.google.com/my-business/content/posts-data"
final_url: "https://developers.google.com/my-business/content/posts-data"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "e75873398c7c3af887b5a3673639e8d31dbd034baa99be630e308caed9d8c080"
---

# Create Posts on Google Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The Google My Business API allows you to create and manage posts for your business directly on Google Search and Maps, including Event, Call to Action, and Offer posts, to engage with your customers.
- Before using the API, you must register your application and obtain OAuth 2.0 credentials, following the setup instructions provided in the documentation.
- You can create posts with various features, like event schedules, call-to-action buttons with customizable actions (book, order, shop, etc.), and offer details like coupon codes and terms.
- After creating posts, the API enables you to edit their content or delete them entirely using dedicated HTTP methods and specifying the desired changes or target post ID.
- Product posts cannot be created using the Google My Business API at this time.

The Google My Business API provides you with the ability to create Posts in
Google Search within several categories, such as news, events, and offers.

This tutorial shows you how to do the following:

- Create [Event Posts](#event-posts).
- Create [Call to action Posts](#call-to-action-posts).
- Create [Offer Posts](#offer-posts).
- [Edit Posts](#edit-posts).
- [Delete Posts](#delete-posts).

## Before you begin

Before you use the Google My Business API, you need to register your application
and obtain OAuth 2.0 credentials.

For details on how to get started with the Google My Business API, see [Basic
setup](/my-business/content/basic-setup).

## Event Posts

Notify your customers about the next event at your business with a Post. Your
Post for an event includes start and end dates and times, which display
prominently on the Post.

To make a Post to an account associated with a user, use the
[`accounts.locations.localPosts`](/my-business/reference/rest/v4/accounts.locations.localPosts#LocalPost)
API.

To create a Post for an authenticated user, use the following:

```
$ POST
https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts
{
  "languageCode": "en-US",
  "summary": "Come in for our spooky Halloween event!",
  "event": {
    "title": "Halloween Spook-tacular!",
    "schedule": {
        "startDate": {
            "year": 2017,
            "month": 10,
            "day": 31,
          },
          "startTime": {
              "hours": 9,
              "minutes": 0,
              "seconds": 0,
              "nanos": 0,
          },
          "endDate": {
            "year": 2017,
            "month": 10,
            "day": 31,
          },
          "endTime": {
              "hours": 17,
              "minutes": 0,
              "seconds": 0,
              "nanos": 0,
          },
    }
  },
  "media": [
    {
      "mediaFormat": "PHOTO",
      "sourceUrl": "https://www.google.com/real-image.jpg",
    }
  ],
  "topicType": "EVENT"
}
```

## Call to action Posts

Posts with a call to action include a button. The text on the call to action
button is determined by the `actionType` field of the Post. A link to a
user-provided URL is added to the button.

To create a Post with a call to action button, use the following:

```
$ POST
https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts
{
  "languageCode": "en-US",
  "summary": "Order your Thanksgiving turkeys now!!",
  "callToAction": {
    "actionType": "ORDER",
    "url": "http://google.com/order_turkeys_here",
  },
  "media": [
    {
      "mediaFormat": "PHOTO",
      "sourceUrl": "https://www.google.com/real-turkey-photo.jpg",
    }
  ],
  "topicType": "OFFER"
}
```

### Action types

The call to action Posts can have different action types that determine the type
of call to action Post.

The following are the supported call to action types:

| Action types | |
| --- | --- |
| `BOOK` | Creates a Post that prompts a user to book an appointment, table, or something similar. |
| `ORDER` | Creates a Post that prompts a user to order something. |
| `SHOP` | Creates a Post that prompts a user to browse a product catalog. |
| `LEARN_MORE` | Creates a Post that prompts a user to see additional details on a website. |
| `SIGN_UP` | Creates a Post that prompts a user to register, sign up, or join something. |
| `CALL` | Creates a Post that prompts a user to call a business. |

## Offer Posts

To create an Offer Post, use the following:

```
$ POST
https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts
{
  "languageCode": "en-US",
  "summary": "Buy one Google jetpack, get a second one free!!",
  "offer": {
       "couponCode": "BOGO-JET-CODE",
       "redeemOnlineUrl": "https://www.google.com/redeem",
       "termsConditions": "Offer only valid if you can prove you are a time traveler"
  },
  "media": [
    {
      "mediaFormat": "PHOTO",
      "sourceUrl": "https://www.google.com/real-jetpack-photo.jpg",
    }
  ],
  "topicType": "OFFER"
}
```

## Edit Posts

Once a post is created, you can edit it with a `PATCH` request.

To edit a Post, use the following:

```
$ PATCH
https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts/{localPostId}?updateMask=summary
{
  "summary": "Order your Christmas turkeys now!!"
}
```

## Delete Posts

After a Post is created, you can delete it with a `DELETE` request.

To delete a Post, use the following:

```
$ DELETE
https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts/{localPostId}
```
