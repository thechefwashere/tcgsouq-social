---
title: "blogs query"
source: "https://shopify.dev/docs/api/admin-graphql/2026-07/queries/blogs"
final_url: "https://shopify.dev/docs/api/admin-graphql/latest/queries/blogs"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "16346ee30b55335b8fdbf1c7cc3599104c9b423c601fd06392dca694d5dd7dba"
---

Choose a version:

unstable 2026-10 release candidate2026-07 latest2026-04 2026-01 2025-10 

2026-07latest

Returns a paginated list of the shop's
[`Blog`](https://shopify.dev/docs/api/admin-graphql/latest/objects/Blog)
objects. Blogs serve as containers for
[`Article`](https://shopify.dev/docs/api/admin-graphql/latest/objects/Article)
objects and provide content management capabilities for the store's editorial content.

Supports [cursor-based
pagination](https://shopify.dev/docs/api/usage/pagination-graphql) to control
the number of blogs returned and their order. Use the [`query`](https://shopify.dev/docs/api/admin-graphql/latest/queries/blogs#arguments-query)
argument to filter results by specific criteria.

- after (String)
- before (String)
- first (Int)
- last (Int)
- query (String)
- reverse (Boolean)
- sortKey (BlogSortKeys)

[Anchor to after](/docs/api/admin-graphql/latest/queries/blogs#arguments-after)after •[String](/docs/api/admin-graphql/latest/scalars/String)
:   The elements that come after the specified [cursor](https://shopify.dev/api/usage/pagination-graphql).

[Anchor to before](/docs/api/admin-graphql/latest/queries/blogs#arguments-before)before •[String](/docs/api/admin-graphql/latest/scalars/String)
:   The elements that come before the specified [cursor](https://shopify.dev/api/usage/pagination-graphql).

[Anchor to first](/docs/api/admin-graphql/latest/queries/blogs#arguments-first)first •[Int](/docs/api/admin-graphql/latest/scalars/Int)
:   The first `n` elements from the [paginated list](https://shopify.dev/api/usage/pagination-graphql).

[Anchor to last](/docs/api/admin-graphql/latest/queries/blogs#arguments-last)last •[Int](/docs/api/admin-graphql/latest/scalars/Int)
:   The last `n` elements from the [paginated list](https://shopify.dev/api/usage/pagination-graphql).

[Anchor to query](/docs/api/admin-graphql/latest/queries/blogs#arguments-query)query •[String](/docs/api/admin-graphql/latest/scalars/String)
:   A filter made up of terms, connectives, modifiers, and comparators.
    You can apply one or more filters to a query. Learn more about [Shopify API
    search syntax](https://shopify.dev/api/usage/search-syntax).

    Show filters

    [Anchor to](/docs/api/admin-graphql/latest/queries/blogs#argument-query-filter-default) default •string
    :   Filter by a case-insensitive search of multiple fields in a document.

    Example:

    - `query=Bob Norman`
    - `query=title:green hoodie`

    [Anchor to](/docs/api/admin-graphql/latest/queries/blogs#argument-query-filter-created_at) created\_at •time

    [Anchor to](/docs/api/admin-graphql/latest/queries/blogs#argument-query-filter-handle) handle •string

    [Anchor to](/docs/api/admin-graphql/latest/queries/blogs#argument-query-filter-id) id •id
    :   Filter by `id` range.

    Example:

    - `id:1234`
    - `id:>=1234`
    - `id:<=1234`

    [Anchor to](/docs/api/admin-graphql/latest/queries/blogs#argument-query-filter-title) title •string

    [Anchor to](/docs/api/admin-graphql/latest/queries/blogs#argument-query-filter-updated_at) updated\_at •time

[Anchor to reverse](/docs/api/admin-graphql/latest/queries/blogs#arguments-reverse)reverse •[Boolean](/docs/api/admin-graphql/latest/scalars/Boolean) Default:false
:   Reverse the order of the underlying list.

[Anchor to sortKey](/docs/api/admin-graphql/latest/queries/blogs#arguments-sortKey)sortKey •[BlogSortKeys](/docs/api/admin-graphql/latest/enums/BlogSortKeys) Default:ID
:   Sort the underlying list using a key. If your query is slow or returns an
    error, then [try specifying a sort key that matches the field used in the search](https://shopify.dev/api/usage/pagination-graphql#search-performance-considerations).

    Show enum values

---

Was this section helpful?

## [Anchor to Possible returns](/docs/api/admin-graphql/latest/queries/blogs#possible-returns)Possible returns

- edges ([BlogEdge!]!)
- nodes ([Blog!]!)
- pageInfo (PageInfo!)

[Anchor to edges](/docs/api/admin-graphql/latest/queries/blogs#returns-edges)edges •[[BlogEdge!]!](/docs/api/admin-graphql/latest/objects/BlogEdge) non-null
:   The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node.

    Show fields

[Anchor to nodes](/docs/api/admin-graphql/latest/queries/blogs#returns-nodes)nodes •[[Blog!]!](/docs/api/admin-graphql/latest/objects/Blog) non-null
:   A list of nodes that are contained in BlogEdge. You can fetch data about an
    individual node, or you can follow the edges to fetch data about a collection
    of related nodes. At each node, you specify the fields that you want to retrieve.

    Show fields

[Anchor to pageInfo](/docs/api/admin-graphql/latest/queries/blogs#returns-pageInfo)pageInfo •[PageInfo!](/docs/api/admin-graphql/latest/objects/PageInfo) non-null
:   An object that’s used to retrieve [cursor
    information](https://shopify.dev/api/usage/pagination-graphql) about the current page.

    Show fields

---

Was this section helpful?
