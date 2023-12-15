# Catalog Docs Options

## Summary

This explanation will detail the trade-offs between including a site via techdocs and via linkdocs. The table below gives a brief visual summary of the points discussed:

| Option           | Techdocs           | Linkdocs |
| ---------------- | ------------------ | -------- |
| Site Generator   | Mkdocs             | Any      |
| Inclusion Method | DOM Mount          | IFrame   |
| Search Indexing  | :heavy_check_mark: | :x:      |
| Provides Hosting | :heavy_check_mark: | :x:      |

## Techdocs

!!! info

    See [how to publish a techdocs site](../how-tos/publish-a-techdocs-site.md) for a run through on getting started with techdocs.

The techdocs plugin integrates the generated site directly into the developer portal. This allows for a much more seamless experience but requires that the site is genertated using the Mkdocs static site generator using a specific set of configuration options.

## Linkdocs

!!! info

    See [how to embed a linkdocs site](../how-tos/embed-a-linkdocs-site.md) for a run through of getting started with linkdocs.

The linkdocs plugin directly embeds the hosted page into the one displayed by the developer portal. This allows greater flexibility as any externally hosted can be included, allowing use of numerous tools to build the docs site. The comprimise of this is that search indexing is not available and the docs must be externally hosted.
