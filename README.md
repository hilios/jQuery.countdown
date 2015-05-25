[The Final Countdown](http://hilios.github.io/jQuery.countdown/) [![Build Status](https://travis-ci.org/hilios/jQuery.countdown.svg)](https://travis-ci.org/hilios/jQuery.countdown)
=====================

#### A simple and html agnostic date countdown plugin for jQuery ####

To get started, check-it out: http://hilios.github.io/jQuery.countdown/

The ultimate countdown plugin designed to fit in any coupon, auction site or product launch. Read our [Documentation](http://hilios.github.io/jQuery.countdown/documentation.html) and follow our [Examples](http://hilios.github.io/jQuery.countdown/examples.html) to see what suits your particular needs.

#### [Download](https://github.com/hilios/jQuery.countdown/releases/download/2.0.4/jquery.countdown-2.0.4.zip) ####

[Click here to download the latest version](https://github.com/hilios/jQuery.countdown/releases/download/2.0.4/jquery.countdown-2.0.4.zip)

If you want to clone the repo always use the files under [dist](https://github.com/hilios/jQuery.countdown/tree/master/dist) folder, they are optimized for production and development.

#### Install via Bower ####

```
bower install jquery.countdown
```

Add a `script` to your html:

```html
<script src="/bower_components/jquery.countdown/dist/jquery.countdown.js"></script>
```

Getting started
---------------

```html
<div id="getting-started"></div>
<script type="text/javascript">
  $('#getting-started').countdown('2015/01/01', function(event) {
    $(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
  });
</script>
```


You may pass a 3rd variable containing servertime in string format,
```php
<?php $now = new \DateTime(); ?>
<div id="getting-started"></div>
<script type="text/javascript">
  $('#getting-started').countdown('2015/01/01', function(event) {
    $(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
  }, '<?= $now->format("M j, Y H:i:s O") ?>');
</script>
```

### Requirements ###

Since version 2.0.0 we only support jQuery above **1.7** (including **2.0**). For legacy **1.6** support please use the version [1.0.2](https://github.com/hilios/jQuery.countdown/releases/download/1.0.2/jquery.countdown-1.0.2.zip).

### [Documentation](http://hilios.github.io/jQuery.countdown/documentation.html) ###

Our documentation is powered by [Jekyll](http://jekyllrb.com/) (see `gh-page` branch) and hosted in GitHub Pages at [http://hilios.github.io/jQuery.countdown/](http://hilios.github.io/jQuery.countdown/documentation.html).

### [Examples](http://hilios.github.io/jQuery.countdown/examples.html) ###

There are few ways to get started, from the most simple example to advanced, we support many different countdown styles, see wich one fits your scenario, and if anyone doesn't it's a good starting point to customize your output.

 - [Basic coupon site with format N days hr:min:sec](http://hilios.github.io/jQuery.countdown/examples/basic-coupon-site.html)
 - [Advance coupon with conditionals and pluralization, format N weeks N days hr:min:sec](http://hilios.github.io/jQuery.countdown/examples/advanced-coupon-site.html)
 - [Product launch in... (callback style)](http://hilios.github.io/jQuery.countdown/examples/website-launch.html)
 - [New year's eve (legacy style)](http://hilios.github.io/jQuery.countdown/examples/legacy-style.html)
 - [Multiple instances on the same page](http://hilios.github.io/jQuery.countdown/examples/multiple-instances.html)
 - [Calculate the countdown total hours](http://hilios.github.io/jQuery.countdown/examples/show-total-hours.html)

[Release notes](https://github.com/hilios/jQuery.countdown/releases)
---------------

Current version is **2.0.4**, to follow our change log please visit the [release notes](https://github.com/hilios/jQuery.countdown/releases).

#### What's new in 2.0.4? ####

 * Fix bower tag
 * Fix jQuery plugin tag

#### What's new in 2.0.3? ####

 * Fix #27 Remove instance number from data element that had the countdown removed;
 * Fix #34 Add support for MySQL dates `YYYY-mm-dd`;
 * Fix #38 Countdown couldn't restart after finished;
 * Add functional test automation through Karma;
 * Use Bower to manage development dependencies;

Contributing
------------

The Final Countdown uses **Grunt** and **Bower** with convenient methods for developing the plugin. It's how we compile our code and run tests. To get started install [NodeJS](http://nodejs.org/), [Bower](http://bower.io/), and then run some Grunt/Bower commands.

```shell
bower install
npm install
grunt test  # Lint code and run test suite
grunt build # Generate the release files (dev, min and zip)
grunt       # Watch for updates than test and build
```

This plugin is tested with [QUnit](http://qunitjs.com/), under jQuery 1.7 up to 2.1, Bootstrap 3.0 and RequireJS.

The functional tests made against:

*   Chrome >= 12
*   Safari >= 5
*   Firefox >= 5.0
*   IE 7/8/9

Code coverage:

```sh
-------------------+-----------+-----------+-----------+-----------+
File               |   % Stmts |% Branches |   % Funcs |   % Lines |
-------------------+-----------+-----------+-----------+-----------+
   src/            |     98.18 |        90 |       100 |     98.18 |
      countdown.js |     98.18 |        90 |       100 |     98.18 |
-------------------+-----------+-----------+-----------+-----------+
All files          |     98.18 |        90 |       100 |     98.18 |
-------------------+-----------+-----------+-----------+-----------+
```

### Contributors ###

Thanks for bug reporting and fixes:

*   Daniel Leavitt (@dleavitt)
*   Fagner Brack (@FagnerMartinsBrack)
*   Matthew Sigley (@msigley)
*   Roman Shterenzon (@romanbsd)
*   Marios (@assiotis)
*   Zane Yao (@yaoazhen)

### License ###

Copyright (c) 2011-2014 Edson Hilios. This is a free software is licensed under the MIT License.

*   [Edson Hilios](http://edson.hilios.com.br). Mail me: edson (at) hilios (dot) com (dot) br
