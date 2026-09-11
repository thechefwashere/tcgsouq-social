---
title: "fileCreate"
source: "https://shopify.dev/docs/api/admin-graphql/2026-07/mutations/fileCreate"
final_url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/fileCreate"
platform: "shopify"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "4d6820c05c83238506f3a80c6e814580c5107c09c9673f4d756932cb169b6c93"
---

Choose a version:

unstable 2026-10 release candidate2026-07 latest2026-04 2026-01 2025-10 

2026-07latest

Requires `write_files` access scope, `write_themes` access scope or `write_images` access scope. Also: Users must have create files permissions.

Creates file assets for a store from external URLs or files that were previously uploaded using the
[`stagedUploadsCreate`](https://shopify.dev/docs/api/admin-graphql/latest/mutations/stageduploadscreate)
mutation.

Use the `fileCreate` mutation to add various types of media and documents to your store. These files are added to the
[**Files** page](https://shopify.com/admin/settings/files) in the Shopify admin and can be referenced by other
resources in your store.

The `fileCreate` mutation supports multiple file types:

- **Images**: Product photos, variant images, and general store imagery
- **Videos**: Shopify-hosted videos for product demonstrations and marketing
- **External videos**: YouTube and Vimeo videos for enhanced product experiences
- **3D models**: Interactive 3D representations of products
- **Generic files**: PDFs, documents, and other file types for store resources

The mutation handles duplicate filenames using configurable resolution modes that automatically append UUIDs,
replace existing files, or raise errors when conflicts occur.

---

Note

Files are processed asynchronously. Check the
[`fileStatus`](https://shopify.dev/docs/api/admin-graphql/latest/interfaces/File#fields-fileStatus)
field to monitor processing completion. The maximum number of files that can be created in a single batch is 250.

**Note:**

Files are processed asynchronously. Check the
[`fileStatus`](https://shopify.dev/docs/api/admin-graphql/latest/interfaces/File#fields-fileStatus)
field to monitor processing completion. The maximum number of files that can be created in a single batch is 250.

**Note:** Files are processed asynchronously. Check the
<a href="https://shopify.dev/docs/api/admin-graphql/latest/interfaces/File#fields-fileStatus"><code><span class="PreventFireFoxApplyingGapToWBR">file<wbr/>Status</span></code></a>
field to monitor processing completion. The maximum number of files that can be created in a single batch is 250.

---

After creating files, you can make subsequent updates using the following mutations:

- [`fileUpdate`](https://shopify.dev/docs/api/admin-graphql/latest/mutations/fileUpdate):
  Update file properties such as alt text or replace file contents while preserving the same URL.
- [`fileDelete`](https://shopify.dev/docs/api/admin-graphql/latest/mutations/fileDelete):
  Remove files from your store when they are no longer needed.

To list all files in your store, use the
[`files`](https://shopify.dev/docs/api/admin-graphql/latest/queries/files) query.

Learn how to manage
[product media and file assets](https://shopify.dev/docs/apps/build/online-store/product-media)
in your app.

- files ([FileCreateInput!]!)

[Anchor to files](/docs/api/admin-graphql/latest/mutations/fileCreate#arguments-files)files •[[FileCreateInput!]!](/docs/api/admin-graphql/latest/input-objects/FileCreateInput) required
:   List of new files to be created.

    Show input fields

---

Was this section helpful?

## [Anchor to FileCreatePayload returns](/docs/api/admin-graphql/latest/mutations/fileCreate#returns)FileCreatePayload returns

- files ([File!])
- userErrors ([FilesUserError!]!)

[Anchor to files](/docs/api/admin-graphql/latest/mutations/fileCreate#returns-files)files •[[File!]](/docs/api/admin-graphql/latest/interfaces/File)
:   The newly created files.

    Show fields

[Anchor to userErrors](/docs/api/admin-graphql/latest/mutations/fileCreate#returns-userErrors)userErrors •[[FilesUserError!]!](/docs/api/admin-graphql/latest/objects/FilesUserError) non-null
:   The list of errors that occurred from executing the mutation.

    Show fields

---

Was this section helpful?
