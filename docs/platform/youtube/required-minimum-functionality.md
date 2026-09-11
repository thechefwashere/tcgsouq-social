---
title: "Required minimum functionality"
source: "https://developers.google.com/youtube/terms/required-minimum-functionality"
final_url: "https://developers.google.com/youtube/terms/required-minimum-functionality"
platform: "youtube"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "00357b96a38f7b60213b85e09561fe45951b0d01c31dd347463d54779f2d1d70"
---

# YouTube API Services - Required Minimum Functionality Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- This document outlines the minimum functional requirements for API clients accessing YouTube API services, ensuring a consistent user experience for users, content owners, and advertisers.
- API clients using embedded YouTube players must adhere to specific size constraints, automatic playback rules, and restrictions on overlays or modifications to the player's appearance.
- When allowing video uploads, API clients must enable users to define specific properties, such as the video's title, description, and privacy settings.
- API clients must provide full or truncated comment text, display channel or video titles depending on the content of the comment and be able to identify when comments are held for moderation.
- API clients must clearly identify the YouTube account associated with any comment or action such as adding a ban to a user.

**Note:** [Complying with the YouTube Developer Policies](/youtube/terms/developer-policies-guide) provides guidance and examples to help you ensure that your API clients follow specific portions of the YouTube API Services [Terms](/youtube/terms/api-services-terms-of-service) and [Policies](/youtube/terms/developer-policies) (API TOS). The guide offers insight into how YouTube enforces certain aspects of the API TOS, but it does not replace any existing documents.

This document defines minimum functional requirements for API clients that implement or provide access to specific features of YouTube API services ("API Clients").

These requirements and guidelines ensure that API clients provide a consistent user experience that protects the interests of YouTube users, content owners, and advertisers. These rules are an integral part of the [YouTube API Terms of Service](/youtube/terms) and must be followed in the development and implementation of any API Clients.

You should expect the requirements in this document to change so that we can ensure better user experiences with existing YouTube features. They will also change in response to new and updated YouTube features. At times, such changes may require you to update your API Clients to address new requirements. The [Terms of Service revision history](/youtube/terms/revision-history) will document any changes, so please check that document frequently, or subscribe to its [RSS feed](/static/youtube/terms/feeds/api-services-terms-of-service-revision-history.xml), to ensure that you can quickly learn about changes that may affect your API Clients.

In addition to the requirements in this document, we highly recommend that you follow best practices described in the [YouTube API Services Policies](/youtube/terms/developer-policies) and discussed elsewhere in YouTube API services' documentation. Even when not strictly required, these practices help your API Clients to recover more quickly from errors and to optimize their quota usage if they use YouTube API services that allocate quota. At the same time, these practices help to ensure the health of the YouTube ecosystem and, above all, to provide the best experience possible to users of your API Clients and of YouTube Applications.

## YouTube embedded player and video playback

The requirements in this section relate specifically to embedded YouTube players. The [YouTube API Services Policies](/youtube/terms/developer-policies) also includes several policies relevant to API Clients that play YouTube audiovisual content.

### API Client Identity and Credentials

API Clients that use the YouTube embedded player (including the YouTube IFrame Player API) must provide identification through the `HTTP Referer` request header. In some environments, the browser will automatically set `HTTP Referer`, and API Clients need only ensure they are not setting the [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy) in a way that suppresses the `Referer` value. YouTube recommends using `strict-origin-when-cross-origin` Referrer-Policy, which is already the default in many browsers.

Similarly, if integrating the YouTube embedded player in a window created by using JavaScript `window.open`, API Clients must not use the [`noreferrer`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noreferrer) feature, which suppresses the `Referer` value.

#### Set the Referer

In environments where `HTTP Referer` is empty by default and not automatically set by the browser, API Clients must take action to provide their identity through alternative means. In WebView integrations such as a mobile app or desktop app, `HTTP Referer` is empty by default and the `Referer` is typically set using one of these techniques:

- **Mobile app with player inside a local HTML file**

  In this configuration, the player is loaded in an HTML file that is bundled with the app. When loading this HTML file, setting the `baseUrl` parameter will set the `Referer`.

  - Android [`loadDataWithBaseURL`](https://developer.android.com/reference/android/webkit/WebView#loadDataWithBaseURL(java.lang.String,%20java.lang.String,%20java.lang.String,%20java.lang.String,%20java.lang.String))
  - iOS [`loadHTMLString:baseURL:`](https://developer.apple.com/documentation/webkit/wkwebview/1415004-loadhtmlstring?language=objc)
- **Mobile app without local HTML file**

  In this configuration, the player is loaded directly from `https://www.youtube.com/embed/VIDEO_ID` without any enclosing HTML file. You set the `Referer` by adding it as an HTTP Header:

  - Android [`loadUrl`](https://developer.android.com/reference/android/webkit/WebView#loadUrl(java.lang.String,%20java.util.Map%3Cjava.lang.String,java.lang.String%3E)) with the `Referer` HTTP Header added to the `additionalHttpHeaders` parameter
  - iOS [`loadRequest:`](https://developer.apple.com/documentation/webkit/wkwebview/load(_:)?language=objc) with the `Referer` HTTP Header added to the request. For example:

    ```
    NSString *bundleId = [[NSBundle mainBundle] bundleIdentifier];
    NSString *referrer = [[NSString stringWithFormat:@"https://%@", bundleId] lowercaseString];
    NSURL *referrerUrl = [NSURL URLWithString:referrer];

    NSString *destination = @"https://www.youtube.com/embed/VIDEO_ID";
    NSURL *destinationUrl = [NSURL URLWithString:destination];

    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:destinationUrl];
    [request addValue:referrerUrl forHTTPHeaderField:@"Referer"];

    // Create an instance of WKWebView (omitted for simplicity), then load the NSMutableURLRequest.
    [webView loadRequest:request];
    ```
- **Mobile app with player inside a native browser tab**

  - Android `CustomTabs`

    Use [`Intent.EXTRA_REFERRER`](https://developer.android.com/reference/kotlin/android/content/Intent#EXTRA_REFERRER_NAME:kotlin.String) to set the referrer. Be sure to use the `android-app://` scheme instead of `https://` when creating the `Uri`. For example:

    ```
    String destinationUrl = "https://www.youtube.com/embed/VIDEO_ID";
    CustomTabsIntent customTabsIntent = new CustomTabsIntent.Builder().build()
    customTabsIntent.intent.putExtra(Intent.EXTRA_REFERRER, Uri.parse("android-app://" + context.getPackageName()));
    customTabsIntent.launchUrl(this, Uri.parse(destinationUrl));
    ```
  - iOS `SFSafariViewController`

    `SFSafariViewController` does not support setting the `Referer`. In this case, set the [`origin`](/youtube/player_parameters#origin) player parameter instead.
- **Desktop app**

  In this configuration, set the `Referer` by adding it as an HTTP Header:

  - Microsoft .NET - use [`HttpRequestHeaders.Referrer`](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.headers.httprequestheaders.referrer?view=net-9.0) or [`CoreWebView2HttpRequestHeaders.SetHeader`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2httprequestheaders.setheader?view=webview2-dotnet-1.0.3296.44#microsoft-web-webview2-core-corewebview2httprequestheaders-setheader(system-string-system-string))
  - macOS - follow the same instructions described above for iOS mobile apps

For other platforms where `HTTP Referer` is empty by default, set the `Referer` value by configuring the WebView in which the player is loaded. The exact technique might vary by platform.

If you are the owner of a library, framework, plugin, service, or wrapper used by developers to integrate the YouTube embedded player, you must retrieve the app ID from the environment (this may not be possible, depending on the platform) or allow developers to pass-in their app ID so that `Referer` (and the [`widget_referrer`](/youtube/player_parameters#widget_referrer) player parameter, if appropriate) can be set as described above.

#### Referer format

When you explicitly provide Referer by setting a WebView parameter or adding an HTTP Header, the format is typically a fully qualified URL. Specify `HTTPS` as the protocol. Within the URL, the domain name must be your application identifier ("app ID") that is registered with the store that distributed your app to end users. If your app is provided to users through an alternative distribution channel, use the app ID that is registered with the operating system during app install. In most cases, your app ID will be a reversed domain name (also known as "reverse-DNS format"), like `com.google.android.youtube`. Representative examples:

- Android OS and Android apps on ChromeOS: [App ID](https://developer.android.com/studio/build/configure-app-module#set_the_application_id)
- Apple platforms, including iOS, iPadOS, macOS: [Bundle ID](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier)
- Samsung Tizen: [App ID](https://docs.tizen.org/application/native/#package-id-and-application-id)
- Linux distributions:
  - Fedora: [App ID](https://docs.fedoraproject.org/en-US/flatpak/concepts/#application_id)
  - Gnome: [App ID](https://developer.gnome.org/documentation/tutorials/application-id.html)
  - Ubuntu: [App ID](https://wiki.ubuntu.com/AppStore/Interfaces/ApplicationId)

On some platforms the app ID is not a reversed domain name. In these cases, use the unique app ID assigned by the store that distributes the app. When the store app ID is a generated alphanumeric string (assigned by the store or development tools, not chosen by the app developer), include both the app display name (replacing spaces with hyphens) and the store app ID, delimited by a period. For example: `<my-app-name>.<AppID>`. This value should be stable across app version changes. If the app is not hosted on a store, use the app ID that is registered with the operating system during app install; this is typically a unique identifier in the app manifest. Exclude any details about app version and supported architecture. Representative examples:

- **Chrome Web Store: store-hosted**

  The store app ID is typically the last part of the path in the app url `https://chromewebstore.google.com/detail/<hyphenated-app-name>/<AppID>`. Use the hyphenated app name and the store app ID to build the `<my-app-name>.<AppID>` string described above.
- **Windows: store-hosted**

  The store app ID is typically the last part of the path in the app url `https://apps.microsoft.com/detail/<AppID>`. Use the store app ID to build the `<my-app-name>.<AppID>` string described above. The hyphenated app name must be included as well.
- **Windows: non-store distribution**

  Windows apps contain a [package identity](https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/package-identity-overview) in the app manifest: `Name_Version_Architecture_ResourceID_PublisherID`. Use only the `Name` attribute.
- **Xbox: store-hosted**

  The store app ID is typically the last part of the path in the app url `https://www.xbox.com/<region>/games/store/<hyphenated-app-name>/<AppID>`. Use the hyphenated app name and the store app ID to build the `<my-app-name>.<AppID>` string described above.

For API Clients with a high number of requests to YouTube (see [Usage and Quotas](/youtube/terms/developer-policies#usage-and-quotas)), additional credentials might be required to access the YouTube embedded player.

Failure to comply with these requirements might result in reduced functionality in the YouTube embedded player.

### WebView Type

When integrating the YouTube embedded player in a WebView, use one of the OS-provided WebView types when available. For example:

- Android OS: [`WebView`](https://developer.android.com/reference/android/webkit/WebView) or [`CustomTabs`](https://developer.android.com/reference/androidx/browser/customtabs/package-summary)
- Apple platforms, including iOS, iPadOS, macOS: [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) or [`SFSafariViewController`](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller)

### Embedded YouTube Player size

Embedded players must have a viewport that is at least 200px by 200px. If the player displays controls, it must be large enough to fully display the controls without shrinking the viewport below the minimum size. We recommend 16:9 players be at least 480 pixels wide and 270 pixels tall.

### Autoplay and scripted playbacks

This section covers automatic playbacks. It applies to YouTube embedded players that either use the `autoplay` player parameter or programmatically initiate automatic playback using the YouTube IFrame Player API service or another YouTube API service.

- Embedded players that automatically play a video should initiate playback immediately when the page loads or as soon as the embedded player is fully visible. However, an API Client must not initiate an automatic playback until the player is visible and more than half of the player is visible on the page or screen.
- A page or screen must not have more than one YouTube player that automatically plays content simultaneously.
- Any YouTube thumbnail that initiates a playback must be at least 120 pixels wide and 70 pixels tall.

### YouTube Player attributes

Attributes and parameters of the YouTube player – including, for example, the appearance of YouTube branding in the player – are specified in YouTube API documentation and specifications (https://developers.google.com/youtube). You must not make changes to the YouTube player that are not explicitly described by the API documentation.

### Overlays and frames

You must not display overlays, frames, or other visual elements in front of any part of a YouTube embedded player, including player controls. Similarly, you must not use overlays, frames or other visual elements to obscure any part of an embedded player, including player controls.

### Mouseovers

You must not use mouseovers or touch events on a YouTube player to initiate any action on the user's behalf, such as opening a window or subscribing to a channel.

## Uploading videos

If API Clients allow users to upload content to multiple platforms, users should be able to select and deselect the platforms to which they want to upload their videos.

### Data requirements

API clients that enable users to upload videos to YouTube must enable *users* to set the values in the following list. Any properties that are not listed are optional.

|  | Name | Description |
| --- | --- | --- |
| **Resource properties** | | |
|  | `snippet.title` | **Required**. The video's title. YouTube returns an error if the value exceeds 100 characters. YouTube supports all valid UTF-8 characters except `<` and `>`. |
|  | `snippet.description` | **Required**. The video's description. YouTube returns an error if the value exceeds 5000 bytes. YouTube supports all valid UTF-8 characters except `<` and `>`. |
|  | `status.privacyStatus` | **Required**. The video's [privacy setting](https://support.google.com/youtube/answer/157177). Users must be able to choose whether the uploaded video will be public, private, or unlisted. |
| **Request parameters** | | |
|  | `onBehalfOfContentOwnerChannel` | **Conditionally required**. If the request's authorization credentials identify a content owner and the `onBehalfOfContentOwner` parameter is set, the API user must also be able to specify the YouTube channel to which the video is being uploaded. |

## Displaying comments

|  | Name | Description |
| --- | --- | --- |
| **Resource properties** | | |
|  | `snippet.textDisplay` | **Required**. The comment's text. The API client must either (a) display the full text of a comment or comment reply, or (b) truncate the text and provide a way for the viewer to easily access the full text from the truncated version.  This requirement applies to all comments and comment replies, regardless of which type of resource the comments are associated with (videos, channels, etc.).  Note that the `commentThread` resource's `snippet.topLevelComment` property value is a `comment` resource and the `replies.comments[]` property is a list of `comment` resources. As such, this requirement also applies to the `snippet.topLevelComment.snippet.textDisplay` and `replies.comments[].snippet.textDisplay` properties. |
|  | `snippet.title` (`channel`) | **Required (suggestion)**. The channel's title.  - If the comment pertains to a channel, the API client must display the channel's name. - If the comment pertains to a video, the API client must display the name of the channel that uploaded the video. |
|  | `snippet.title` (`video`) | **Conditionally required (suggestion)**. The video's title. This value must be displayed if the comment pertains to a video. |
|  | `snippet.moderationStatus` | **Conditionally required**. If the `moderationStatus` parameter value in the API request is `heldForReview` or `likelySpam`, the display must clearly identify that status using the property value, similar language (e.g. "This comment is being held for review"), a header (e.g. "Held for review"), or other unambiguous language. The `commentThreads.list` method supports the ability to retrieve comments based on their moderation status. |

## Adding comments

|  | Name | Description |
| --- | --- | --- |
| **Resource properties** | | |
|  | `snippet.title` (`channel`) | **Required**. The channel's title.  - If the user is adding a comment about a channel, the API client must display the channel's name. - If the user is adding comment about a video, the API client must display the name of the channel that uploaded the video. |
|  | `snippet.title` (`video`) | **Required**. If the user is adding a comment about a video, the API client must display the video's title. |
| **Other requirements** | | |
|  | `Comment author's channel name` | **Required**. The API client must clearly identify the YouTube user account to which the comment will be attributed. If the request's authorization credentials identify a content owner and the `onBehalfOfContentOwner` parameter is set, the API user must also be able to specify the YouTube channel to which the comment will be attributed. |

## Adding comment replies

|  | Name | Description |
| --- | --- | --- |
| **Resource properties** | | |
|  | `snippet.textDisplay` | **Required**. The comment's text. The API client must display the text of the comment that the user is replying to in accordance with the rules defined in the [Displaying comments](#display-comments) section of this document. |
|  | `snippet.title` (`channel`) | **Required**. The channel's title.  - If the user is replying to a comment about a channel, the API client must display the channel's name. - If the user is replying to a comment about a video, the API client must display the name of the channel that uploaded the video. |
|  | `snippet.title` (`video`) | **Required**. If the user is replying to a comment about a video, the API client must display the video's title. |
| **Other requirements** | | |
|  | `Comment author's channel name` | **Required**. The API client must clearly identify the YouTube user account to which the comment reply will be attributed. If the request's authorization credentials identify a content owner and the `onBehalfOfContentOwner` parameter is set, the API user must also be able to specify the YouTube channel to which the comment reply will be attributed. |

## Editing or deleting comment replies

|  | Name | Description |
| --- | --- | --- |
| **Resource properties** | | |
|  | `snippet.textDisplay` | **Required**. The comment's text. The API client must display the text of the comment that the user is editing or deleting in accordance with the rules defined in the [Displaying comments](#display-comments) section of this document. |
|  | `snippet.title` (`channel`) | **Required**. The channel's title.  - If the user is editing or deleting a comment about a channel, the API client must display the channel's name. - If the user is editing or deleting a comment about a video, the API client must display the name of the channel that uploaded the video. |
|  | `snippet.title` (`video`) | **Required**. If the user is editing or deleting a comment about a video, the API client must display the video's title. |
| **Other requirements** | | |
|  | `Comment author's channel name` | **Required**. The API client must clearly identify the YouTube user account to which the comment is attributed. |

## Banning a user from live chat (or removing a ban)

|  | Name | Description |
| --- | --- | --- |
| **Resource properties** | | |
|  | `snippet.title` (`channel`) | **Required**. The name of the YouTube channel that is being banned or unbanned. In addition, the name must link to the channel or the channel URL must also be displayed. |
| **Other requirements** | | |
|  | Comment author's channel name | **Required**. The API client must clearly identify the YouTube user account being used to add or remove the ban. |
