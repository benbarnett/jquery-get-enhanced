jquery.get-enhanced plugin
===============

Extend $.get() to add selector support. Usage is identical, except you can add a selector to get a page fragment, like you can with ([$.load](http://api.jquery.com/load/)).

Tested with jQuery 1.3.2+

Demo
-----------------

Coming soon.


What it does
-----------------

The plugin simply adds selector support to enable $.get'ing of page fragments, to save you having to slice the response yourself. Super lightweight and non-intrusive, it will just pass back to the original $.get() method once its work is done.

It means that you can 'do stuff' with the content before appending it to the DOM:

e.g.	$('.target').html(data.replace(/cool/ig, 'AMAZING'));


Usage
-----------------

Usage is identical to the jQuery get() function

Changelog
-----------------

0.10 (09/03/2011):

* Plugin added to Github.



Credits
-----------------

* Author: Ben Barnett - http://www.benbarnett.net - @benpbarnett