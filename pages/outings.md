---
title: Outings
permalink: /outings/
---

<ul>
{% assign sorted_outings = site.outings | sort: 'year_completed' | reverse %}
{% for outing in sorted_outings %}
    <li><a href="{{ outing.url }}">{{ outing.title }}</a> ({{ outing.year_completed | default: 'in progress' }})</li>
{% endfor %}
</ul>
