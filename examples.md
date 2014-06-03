---
layout: content
title:  Examples
category: examples-main
---

There are few ways to get started, from the most simple example to advanced, we support many different countdown styles, see wich one fits your scenario, and if any doesn't the [Docs]({{site.baseurl}}/documentation.html) are a good starting point to customize your output.

<div class="examples-list-index">
{% assign examples = 0 %}
{% for page in site.pages %}
{% if page.category == 'examples' %}
  {% assign examples = examples | plus: 1 %}
  {% assign row = examples | modulo: 3 %}

  {% if row == 1 %}
  <div class="pure-g-r">
  {% endif %}

    <div class="pure-u-1-3">
      <article>
        <h3>{{page.title}}</h3>
        <p>
          {{ page.content | markdownify | remove_first:"<p>" | split:"</p>" | first }}
        </p>
        <p>
          <a href="{{site.baseurl}}{{page.url}}" class="pure-button">
            <i class="fa fa-arrow-circle-right"></i>
            View
          </a>
        </p>
      </article>
    </div>

  {% if row == 0 %}
  </div>
  {% endif %}
{% endif %}
{% endfor %}
</div>
