---
title: "Help: using the API"
source: "https://judge.me/help/en/articles/8409180-using-judge-me-api"
final_url: "https://judge.me/help/en/articles/8409180-using-judge-me-api"
platform: "judgeme"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "76502b29dba469c0e2aa489a5f73aaed69234d34ebe0ff3c126728023f484e9b"
---

# Technical resources

## API documentation

- The Judge.me API follows the OpenAPI specification.
- To view the documentation, to go <https://judge.me/api>.
- Original YAML file also available at that link.

## Server endpoint

- Base URL: [`https://judge.me/api/v1`](https://judge.me/api/v1)
- Example endpoint: [`https://judge.me/api/v1/widgets/product_review`](https://judge.me/api/v1/widgets/product_review)

## API credentials

To use our API, you'll need 2 credentials: **shop\_domain** and **api\_token**. To find them:

1. From your Judge.me admin, go to **[Settings](https://app.judge.me/settings/integrations)** [> **Integrations**](https://app.judge.me/settings/integrations).
2. Click the **View API tokens** buttonon the top right.

There you'll find:

- Your **Public API Token**: This public token is suitable for making GET requests to our widget API. It's designed for use in public JavaScript environments.
- Your **Private API Token**: This private token grants read/write access to your data and should be exclusively used on the server-side for enhanced security.
- Your **Shop domain** in myshopify.com format.

---

# Reviews

## 1. Retrieve reviews

**Method**: GET

**Endpoint**: `https://api.judge.me/api/v1/reviews`

|  |  |  |
| --- | --- | --- |
| **Parameter** | **Required** | **Description** |
| `api_token` | Yes | Your Private API token |
| `shop_domain` | Yes | Your Shop domain (e.g. example.myshopify.com) |
| `per_page` | No | Number of reviews per page. Maximum: **100**. |
| `page` | No | Page number |
| `product_id` | No | Internal Judge.me product ID. If the ID does not belong to your store, the response falls back to all reviews for the store |
| `rating` | No | Filter by rating (1–5) |
| `published` | No | Filter by publish status |
| `reviewer_id` | No | Filter by Judge.me internal reviewer ID |
| `reviewer_email` | No | Filter by reviewer email |

Each review object includes review content and related metadata, for example:

- `pictures`: An array of picture objects with URLs and hidden status.
- `has_published_pictures`: Boolean — `true` if the review has any published pictures.
- `has_published_videos`: Boolean — `true` if the review has any published videos.

The response does not include **video URLs** and **replies to reviews**.

## 2. Create reviews

**Method**: POST

**Endpoint**: `https://judge.me/api/v1/reviews`

|  |  |  |
| --- | --- | --- |
| **Parameter** | **Required** | **Description** |
| `shop_domain` | Yes | Your Shop domain (e.g. example.myshopify.com) |
| `platform` | Yes | One of: **shopify**, **woocommerce**, **bigcommerce** |
| `name` | Yes | Reviewer display name |
| `email` | Yes | Reviewer email |
| `rating` | Yes | 1–5 |
| `body` | Yes | Review body text |
| `id` | No | Shopify product ID (external) |
| `title` | No | Review title |
| `reviewer_name_format` | No | One of: **''**, **last\_initial**, **all\_initials**, **anonymous**. Default: full name. |
| `cf_answers` | No | array of { cf\_question\_id, value }. Answers to shop custom form questions. |
| `picture_urls` | No | Array of publicly accessible image URLs. Up to 5 images per review, max 10 MB each. Accepted formats: .jpg, .jpeg, .png. |
| `ip_addr` | No | Reviewer IP for location |

Please note:

- **Duplicate reviews when using cf\_answers**: If the `cf_answers` array is included with non-empty values in the API payload, multiple identical reviews may be created—despite sending only one request. This issue has been observed in Make.com and confirmed via Postman testing. To avoid this, omit `cf_answers` or leave it empty.
- Reviews created via the Judge.me API **cannot be marked as verified**. It is not possible to create a verified review or update an existing review to verified status through the API.
- Reviews created via the Judge.me API **cannot be deleted**.
- Video upload is **not supported** via the public API. The `picture_urls` parameter only accepts image files — video URLs (e.g. `.mp4`) passed in `picture_urls` or `video_urls` are silently ignored and will not be stored. To attach video to a review, customers must use the Judge.me Review Widget or the review request email form. For **reading** video data on a headless storefront, use the Widget API with `json_request=true` — the response includes `video_external_ids` that can be used to construct player URLs.
- **Base64 image uploads are not supported.** The `picture_urls` field only accepts publicly hosted URLs (e.g. on S3, Cloudinary, or any public CDN). Fields like `pictures_data` do not exist in the API and will be silently ignored.

---

# Review requests

## Add manual review requests

**Method**: POST

**Endpoint:** `https://judge.me/api/orders/send_manual_review_request`

|  |  |  |
| --- | --- | --- |
| **Parameter** | **Required** | **Description** |
| `api_token` | Yes | Your Private API token |
| `shop_domain` | Yes | Your Shop domain (e.g. example.myshopify.com) |
| `reviewer_name` | Yes | Reviewer name |
| `reviewer_email` | Yes | Reviewer email |
| `shopify_product_id` | Yes | Shopify product ID (external) |
| `product_handle` | Yes | Product handle |
| `fulfilled_at` | Yes | When the order was fulfilled, in dd/mm/yyyy format |
| `quantity` | Yes | quantity of the purchased product, we will set to **1** by default |
| `processed_at` | Yes | When the request will be sent, in dd/mm/yyyy format  - If blank, we will calculate using `fulfilled_at` plus wait date in your settings. - If `processed_at` is in the past, we will schedule a request email after 10 minutes |

---

# Products

## Look up internal product ID

In our API, products have two types of IDs:

- **External ID**: The Shopify product ID
- **ID**: The internal Judge.me product ID

To find the external ID of the product: See [Finding Product ID and Product Handle](https://judge.me/help/en/articles/8223133-finding-product-id-and-product-handle).

To find the internal ID of the product, you’ll need to use the Judge.me Product API to convert the external ID into our internal ID:

**Method**: GET

**Endpoint**:`https://api.judge.me/api/v1/products/-1?shop_domain=SHOP_DOMAIN&api_token=PRIVATE_API_TOKEN&external_id=EXTERNAL_PRODUCT_ID`

|  |  |  |
| --- | --- | --- |
| **Parameter** | **Required** | **Description** |
| `id` | Yes | Judge.me internal product ID. Use **-1** to look up by external\_id or handle instead. |
| `api_token` | Yes | Your Private API token |
| `shop_domain` | Yes | Your Shop domain (e.g. example.myshopify.com) |
| `external_id` | Conditional | Shopify product ID (external) |
| `handle` | Conditional | Product handle |

This call will return a product object. Look for the `id` field inside the `product` object — that is the **internal Judge.me product ID**.

---

Related Articles

- [Integrating ProveSource with Judge.me](https://judge.me/help/en/articles/8275225-integrating-provesource-with-judge-me)
- [Integrating Nextsale with Judge.me](https://judge.me/help/en/articles/8275688-integrating-nextsale-with-judge-me)
- [Retrieving cached widgets from the Judge.me cache server](https://judge.me/help/en/articles/8409211-retrieving-cached-widgets-from-the-judge-me-cache-server)
- [Importing reviews using Judge.me template](https://judge.me/help/en/articles/8415368-importing-reviews-using-judge-me-template)
- [Display Judge.me reviews inside your LEO mobile app](https://judge.me/help/en/articles/13761482-display-judge-me-reviews-inside-your-leo-mobile-app)
