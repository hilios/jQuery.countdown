---
layout:     content
title:      Examples
---

<ul>
{% for post in site.posts %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
{% endfor %}
</ul>

### Legacy style ###

Assign the callback uppon initialization, format the countdown in **N weeks N days N hours N minutes N seconds** where each `N` value is displayed on his own DOM element.

{%include legacy-style.html %}
{% highlight html linenos %}{%include legacy-style.html %}{% endhighlight %}