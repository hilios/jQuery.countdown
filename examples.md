---
layout: content
title:  Examples
toc:    links
---

There are few ways to get started, from the most simple example to advanced, we support many different countdown styles, see wich one fits your scenario, and if anyone doesn't it's a good starting point to customize your output.

Legacy style
------------

Assign the callback uppon initialization, format the countdown in **%w weeks %d days %H hours %M minutes %S seconds** where each directive value is displayed within his own DOM element (`<span>`).

{%include getting-started.html %}
{% highlight html linenos %}{%include getting-started.html noJs=true %}{% endhighlight %}