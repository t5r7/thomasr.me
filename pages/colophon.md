---
layout: default
title: "Colophon"
description: "Info about ThomasR.me"
permalink: /colophon/
---

This site is statically generated with [Jekyll](https://jekyllrb.com/), and is built &amp; served by [Vercel](/_logs), via Cloudflare.

Find [the source](https://github.com/itsmeimtom/thomasr.me) on GitHub. Content and code available under the [CC-BY-SA-4.0 license](/LICENSE.txt), except when noted in [ATTRIBUTION.txt](/ATTRIBUTION.txt).

See the tech (and development tools) I use on the [uses page]({{ site.baseurl }}/uses/).

No substantial part of this site has been generated using AI. Portions of AI-generated code are marked as such.

### Current Jekyll Build Information
This information is generated at build time, and is not updated on every page load. Page content may be cached by Cloudflare or your browser.
- Jekyll version **{{ jekyll.version }}**, **{{ jekyll.environment }}** environment
- Built Started at **{{ site.time | date: '%FT%T%:z' }}**
- **{{ site.pages.size }}** Pages, **{{ site.posts.size }}** Posts, **{{ site.static_files.size }}** Static Files

## JavaScript
The site makes use of minimal JavaScript, and makes no external requests on pages other than the 404 page.  
On the 404 page, a request may be made to a Cloudflare Worker, which acts as a proxy for the site that contains projects hosted by GitHub Pages. This allows for automatic redirects to projects.
On every page, the accent colours (CSS variables) are randomly set, and on the homepage, the greeting is updated to reflect the time of day.

## Archive
Previous versions of the site---and many that have come before it---are available on-request. If you're a curious friend of mine, you likely already have access to [the graveyard](https://archive.thomasr.me).

## Domains
I have collated a [list of domains]({{ site.baseurl }}/domains/) that I own, most of which are ancient and simply redirect to this site.