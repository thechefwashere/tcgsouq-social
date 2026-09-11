---
title: "localPosts REST reference"
source: "https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts"
final_url: "https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "642ceef15b0b7e203bd7d409a2ca807db50113ed35190f48212ceba62558ab7c"
---

# REST Resource: accounts.locations.localPosts Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- `LocalPost` resource represents a local post for a business location, providing details like summary, call to action, event information, and media.
- `CallToAction` defines the action taken when a user interacts with a post, such as visiting a URL or booking an appointment.
- `LocalPostEvent` includes information about an event, like the title and schedule, featured in a local post.
- `LocalPostOffer` provides specific details for offer posts, such as coupon codes, online redemption links, and terms and conditions.
- Developers can manage local posts using methods like `create`, `delete`, `get`, `list`, `patch`, and `reportInsights`.

- [Resource: LocalPost](#LocalPost)
  - [JSON representation](#LocalPost.SCHEMA_REPRESENTATION)
- [CallToAction](#CallToAction)
  - [JSON representation](#CallToAction.SCHEMA_REPRESENTATION)
- [ActionType](#ActionType)
- [LocalPostEvent](#LocalPostEvent)
  - [JSON representation](#LocalPostEvent.SCHEMA_REPRESENTATION)
- [TimeInterval](#TimeInterval)
  - [JSON representation](#TimeInterval.SCHEMA_REPRESENTATION)
- [Date](#Date)
  - [JSON representation](#Date.SCHEMA_REPRESENTATION)
- [TimeOfDay](#TimeOfDay)
  - [JSON representation](#TimeOfDay.SCHEMA_REPRESENTATION)
- [RecurrenceInfo](#RecurrenceInfo)
  - [JSON representation](#RecurrenceInfo.SCHEMA_REPRESENTATION)
- [DailyOccurrencePattern](#DailyOccurrencePattern)
- [WeeklyOccurrencePattern](#WeeklyOccurrencePattern)
  - [JSON representation](#WeeklyOccurrencePattern.SCHEMA_REPRESENTATION)
- [DayOfWeek](#DayOfWeek)
- [MonthlyOccurrencePattern](#MonthlyOccurrencePattern)
  - [JSON representation](#MonthlyOccurrencePattern.SCHEMA_REPRESENTATION)
- [DayOfWeekOccurrence](#DayOfWeekOccurrence)
- [LocalPostState](#LocalPostState)
- [LocalPostTopicType](#LocalPostTopicType)
- [AlertType](#AlertType)
- [LocalPostOffer](#LocalPostOffer)
  - [JSON representation](#LocalPostOffer.SCHEMA_REPRESENTATION)
- [Methods](#METHODS_SUMMARY)

## Resource: LocalPost

Represents a [local post](https://support.google.com/business/answer/7662907) for a location.

| JSON representation |
| --- |
| ``` {   "name": string,   "languageCode": string,   "summary": string,   "callToAction": {     object (CallToAction)   },   "createTime": string,   "updateTime": string,   "scheduledTime": string,   "recurringInstanceTime": string,   "event": {     object (LocalPostEvent)   },   "state": enum (LocalPostState),   "media": [     {       object (MediaItem)     }   ],   "searchUrl": string,   "topicType": enum (LocalPostTopicType),   "alertType": enum (AlertType),    // Union field topic_type_specific_fields can be only one of the following:   "offer": {     object (LocalPostOffer)   }   // End of list of possible types for union field topic_type_specific_fields. } ``` |

| Fields | |
| --- | --- |
| `name` | `string`  Output only. Google identifier for this local post in the form: `accounts/{accountId}/locations/{locationId}/localPosts/{local_post_id}` |
| `languageCode` | `string`  The language of the local post. |
| `summary` | `string`  Description/body of the local post. |
| `callToAction` | `object (CallToAction)`  The URL that users are sent to when clicking through the promotion. Ignored for topic type `OFFER`. |
| `createTime` | `string (Timestamp format)`  Output only. Time of the creation of the post.  Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `updateTime` | `string (Timestamp format)`  Output only. Time of the last modification of the post made by the user.  Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `scheduledTime` | `string (Timestamp format)`  If set, determines when a post will be published. This can be set by the user to schedule posts in advance.  Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `recurringInstanceTime (deprecated)` | `string (Timestamp format)`  Output only. Deprecated: Use `event.recurring_instance_time` instead. This field will be removed in a future version. Output only. Time when the most recent recurring instance of the post was updated.  Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `event` | `object (LocalPostEvent)`  Event information. Required for topic types `EVENT` and `OFFER`. |
| `state` | `enum (LocalPostState)`  Output only. The state of the post, indicating what part of its lifecycle it is in. |
| `media[]` | `object (MediaItem)`  The media associated with the post. sourceUrl is the only supported data field for a LocalPost MediaItem. |
| `searchUrl` | `string`  Output only. The link to the local post in Google search. This link can be used to share the post via social media, email, text, etc. |
| `topicType` | `enum (LocalPostTopicType)`  Required. The topic type of the post: standard, event, offer, or alert. |
| `alertType` | `enum (AlertType)`  The type of alert the post is created for. This field is only applicable for posts of topicType Alert, and behaves as a sub-type of Alerts. |
| Union field `topic_type_specific_fields`. Specific fields for a topic type. `topic_type_specific_fields` can be only one of the following: | |
| `offer` | `object (LocalPostOffer)`  Additional data for offer posts. This should only be set when the topicType is OFFER. |

## CallToAction

An action that is performed when the user clicks through the post

| JSON representation |
| --- |
| ``` {   "actionType": enum (ActionType),   "url": string } ``` |

| Fields | |
| --- | --- |
| `actionType` | `enum (ActionType)`  The type of action that will be performed. |
| `url` | `string`  The URL the user will be directed to upon clicking. This field should be left unset for Call CTA. |

## ActionType

The type of action that will be performed.

| Enums | |
| --- | --- |
| `ACTION_TYPE_UNSPECIFIED` | Type unspecified. |
| `BOOK` | This post wants a user to book an appointment/table/etc. |
| `ORDER` | This post wants a user to order something. |
| `SHOP` | This post wants a user to browse a product catalog. |
| `LEARN_MORE` | This post wants a user to learn more (at their website). |
| `SIGN_UP` | This post wants a user to register/sign up/join something. |
| `GET_OFFER` | Deprecated. Use `OFFER` in `LocalPostTopicType` to create a post with offer content. |
| `CALL` | This post wants a user to call the business. |

## LocalPostEvent

All the information pertaining to an event featured in a local post.

| JSON representation |
| --- |
| ``` {   "title": string,   "schedule": {     object (TimeInterval)   },   "recurrenceInfo": {     object (RecurrenceInfo)   },   "recurringInstanceTime": string } ``` |

| Fields | |
| --- | --- |
| `title` | `string`  name of the event. |
| `schedule` | `object (TimeInterval)`  Event start and end date/time. |
| `recurrenceInfo` | `object (RecurrenceInfo)`  Optional. Stores info about the cadence of a recurring post. Will be set only if the post is a recurring post. |
| `recurringInstanceTime` | `string (Timestamp format)`  Output only. Time when the most recent recurring instance of the post was updated.  Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |

## TimeInterval

An interval of time, inclusive. It must contain all fields to be valid.

| JSON representation |
| --- |
| ``` {   "startDate": {     object (Date)   },   "startTime": {     object (TimeOfDay)   },   "endDate": {     object (Date)   },   "endTime": {     object (TimeOfDay)   } } ``` |

| Fields | |
| --- | --- |
| `startDate` | `object (Date)`  The start date of this period. |
| `startTime` | `object (TimeOfDay)`  The start time of this period. |
| `endDate` | `object (Date)`  The end date of this period. |
| `endTime` | `object (TimeOfDay)`  The end time of this period. |

## Date

Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following:

- A full date, with non-zero year, month, and day values.
- A month and day, with a zero year (for example, an anniversary).
- A year on its own, with a zero month and a zero day.
- A year and month, with a zero day (for example, a credit card expiration date).

Related types:

- `google.type.TimeOfDay`
- `google.type.DateTime`
- `google.protobuf.Timestamp`

| JSON representation |
| --- |
| ``` {   "year": integer,   "month": integer,   "day": integer } ``` |

| Fields | |
| --- | --- |
| `year` | `integer`  Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |
| `month` | `integer`  Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `day` | `integer`  Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |

## TimeOfDay

Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are `google.type.Date` and `google.protobuf.Timestamp`.

| JSON representation |
| --- |
| ``` {   "hours": integer,   "minutes": integer,   "seconds": integer,   "nanos": integer } ``` |

| Fields | |
| --- | --- |
| `hours` | `integer`  Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | `integer`  Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `seconds` | `integer`  Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |
| `nanos` | `integer`  Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |

## RecurrenceInfo

Represents the recurrence information for a local post.

| JSON representation |
| --- |
| ``` {   "seriesEndTime": string,    // Union field occurrence_pattern can be only one of the following:   "dailyPattern": {     object (DailyOccurrencePattern)   },   "weeklyPattern": {     object (WeeklyOccurrencePattern)   },   "monthlyPattern": {     object (MonthlyOccurrencePattern)   }   // End of list of possible types for union field occurrence_pattern. } ``` |

| Fields | |
| --- | --- |
| `seriesEndTime` | `string (Timestamp format)`  Optional. The end time of the recurrence series.  Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| Union field `occurrence_pattern`. The occurrence pattern for the recurring post. `occurrence_pattern` can be only one of the following: | |
| `dailyPattern` | `object (DailyOccurrencePattern)`  Daily occurrence pattern. |
| `weeklyPattern` | `object (WeeklyOccurrencePattern)`  Weekly occurrence pattern. |
| `monthlyPattern` | `object (MonthlyOccurrencePattern)`  Monthly occurrence pattern. |

## DailyOccurrencePattern

This type has no fields.

Represents a daily occurrence pattern.

## WeeklyOccurrencePattern

Represents a weekly occurrence pattern.

| JSON representation |
| --- |
| ``` {   "daysOfWeek": [     enum (DayOfWeek)   ] } ``` |

| Fields | |
| --- | --- |
| `daysOfWeek[]` | `enum (DayOfWeek)`  Optional. The list of the week days for the offer/event. If empty, the post will repeat on the same day of the week as the event's schedule.start\_time. |

## DayOfWeek

Represents a day of the week.

| Enums | |
| --- | --- |
| `DAY_OF_WEEK_UNSPECIFIED` | The day of the week is unspecified. |
| `MONDAY` | Monday |
| `TUESDAY` | Tuesday |
| `WEDNESDAY` | Wednesday |
| `THURSDAY` | Thursday |
| `FRIDAY` | Friday |
| `SATURDAY` | Saturday |
| `SUNDAY` | Sunday |

## MonthlyOccurrencePattern

Represents a monthly occurrence pattern.

| JSON representation |
| --- |
| ``` {    // Union field monthly_option can be only one of the following:   "dayOfMonth": integer,   "dayOfWeekOccurrence": enum (DayOfWeekOccurrence)   // End of list of possible types for union field monthly_option. } ``` |

| Fields | |
| --- | --- |
| Union field `monthly_option`. The recurrence option for the monthly occurrence pattern. `monthly_option` can be only one of the following: | |
| `dayOfMonth` | `integer`  The day of the month. |
| `dayOfWeekOccurrence` | `enum (DayOfWeekOccurrence)`  The day of the week occurrence in the month. The day of the week is implied by the day of the week of the event's start time. For example, if an event starts on a Friday and dayOfWeekOccurrence is SECOND, the event will repeat on the second Friday of every month. |

## DayOfWeekOccurrence

The day of the week occurrence in the month.

| Enums | |
| --- | --- |
| `DAY_OF_WEEK_OCCURRENCE_UNSPECIFIED` | Unspecified day of the week occurrence. |
| `FIRST` | First day of the week in the month. |
| `SECOND` | Second day of the week in the month. |
| `THIRD` | Third day of the week in the month. |
| `FOURTH` | Fourth day of the week in the month. |
| `LAST` | Last day of the week in the month. |

## LocalPostState

Indicates what state the post is in.

| Enums | |
| --- | --- |
| `LOCAL_POST_STATE_UNSPECIFIED` | State not specified. |
| `REJECTED` | This post was rejected due to content policy violation. |
| `LIVE` | This post is published and is currently appearing in search results. |
| `PROCESSING` | This post is being processed and is not appearing in search results. |
| `SCHEDULED` | This post is scheduled for the future and is not appearing in search results. |
| `RECURRING` | This post is a recurring post and is currently appearing in search results. |

## LocalPostTopicType

The topic type of the local post, which is used to select different templates to create and render a post.

| Enums | |
| --- | --- |
| `LOCAL_POST_TOPIC_TYPE_UNSPECIFIED` | No post type is specified. |
| `STANDARD` | Post contains basic information, like summary and images. |
| `EVENT` | Post contains basic information and an event. |
| `OFFER` | Post contains basic information, an event and offer related content (e.g. coupon code) |
| `ALERT` | High-priority, and timely announcements related to an ongoing event. These types of posts are not always available for authoring. |

## AlertType

The type of event for which the alert post was created.

| Enums | |
| --- | --- |
| `ALERT_TYPE_UNSPECIFIED` | No alert is specified. |
| `COVID_19` | Alerts related to the 2019 Coronavirus Disease pandemic. Covid posts only support a summary field and a call to action field. When these alerts are no longer relevant, new Alert post creation for type COVID-19 will be disabled. However, merchant will still be able to manage their existing COVID-19 posts. |

## LocalPostOffer

Specific fields for offer posts.

| JSON representation |
| --- |
| ``` {   "couponCode": string,   "redeemOnlineUrl": string,   "termsConditions": string } ``` |

| Fields | |
| --- | --- |
| `couponCode` | `string`  Optional. Offer code that is usable in store or online. |
| `redeemOnlineUrl` | `string`  Optional. Online link to redeem offer. |
| `termsConditions` | `string`  Optional. Offer terms and conditions. |

| Methods | |
| --- | --- |
| `create` | Creates a new local post associated with the specified location, and returns it. |
| `delete` | Deletes a local post. |
| `get` | Gets the specified local post. |
| `list` | Returns a list of local posts associated with a location. |
| `patch` | Updates the specified local post and returns the updated local post. |
