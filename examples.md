---
layout: content
title:  Examples
---
<div class="row">
    <div class="col-md-6">
        There are few ways to get started, from the most simple example to advanced, we support many different countdown styles, see wich one fits your scenario, and if anyone doesn't it's a good starting point to customize your output.
    </div>
    <div class="col-md-6">{% include getting-started.html %}</div>
</div>

<div>
{% for example in site.pages %}
    {% if example.category contains 'examples' %}
    <a href="{{ site.baseurl }}{{ example.url }}" class="list-group-item 
        {% if example.url == page.url %}active{% endif %}">
        <h4>{{ example.title }}</h4>
        {{ example.content | remove_first:"<p>" | split:"</p>" | first }}
    </a>
    {% endif %}
{% endfor %}
</div>