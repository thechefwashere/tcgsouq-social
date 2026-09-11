---
title: "articleCreate"
source: "https://shopify.dev/docs/api/admin-graphql/2026-07/mutations/articleCreate"
final_url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/articleCreate"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "be10632b4af7e681ff226f605ecfd33a7dd08f32586619e2c7fa7ae12815f928"
---

Choose a version:

unstable 2026-10 release candidate2026-07 latest2026-04 2026-01 2025-10 

2026-07latest

Requires Any of `write_content`, `write_online_store_pages` access scopes.

Creates an [`Article`](https://shopify.dev/docs/api/admin-graphql/latest/objects/Article). Articles are content pieces that include a title, body text, and author information.

You can publish the article immediately or schedule it with a specific publish
date. You can customize the article's URL handle, apply custom templates for
rendering, and add optional fields like [tags](https://shopify.dev/docs/api/admin-graphql/latest/mutations/articleCreate#arguments-article.fields.tags), an [image](https://shopify.dev/docs/api/admin-graphql/latest/mutations/articleCreate#arguments-article.fields.image), and [`Metafield`](https://shopify.dev/docs/api/admin-graphql/latest/objects/Metafield) objects.

The mutation validates article content and ensures proper blog association.
Error handling provides specific feedback for content requirements.

- article (ArticleCreateInput!)
- blog (ArticleBlogInput)

[Anchor to article](/docs/api/admin-graphql/latest/mutations/articleCreate#arguments-article)article •[ArticleCreateInput!](/docs/api/admin-graphql/latest/input-objects/ArticleCreateInput) required
:   The properties of the new article.

    Show input fields

[Anchor to blog](/docs/api/admin-graphql/latest/mutations/articleCreate#arguments-blog)blog •[ArticleBlogInput](/docs/api/admin-graphql/latest/input-objects/ArticleBlogInput)
:   The properties of the new blog.

    Show input fields

---

Was this section helpful?

## [Anchor to ArticleCreatePayload returns](/docs/api/admin-graphql/latest/mutations/articleCreate#returns)ArticleCreatePayload returns

- article (Article)
- userErrors ([ArticleCreateUserError!]!)

[Anchor to article](/docs/api/admin-graphql/latest/mutations/articleCreate#returns-article)article •[Article](/docs/api/admin-graphql/latest/objects/Article)
:   The article that was created.

    Show fields

[Anchor to userErrors](/docs/api/admin-graphql/latest/mutations/articleCreate#returns-userErrors)userErrors •[[ArticleCreateUserError!]!](/docs/api/admin-graphql/latest/objects/ArticleCreateUserError) non-null
:   The list of errors that occurred from executing the mutation.

    Show fields

---

Was this section helpful?
