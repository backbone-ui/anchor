# Backbone UI: Anchor

An extension to scroll with easing between link anchors

Ideally we would use CSS3 transitions but we're using requestAnimationFrame to clock the animations since scrollTop [isn't considered a CSS attribute](https://bugs.webkit.org/show_bug.cgi?id=93238).


## Dependencies

* [Backbone Easing](http://github.com/makesites/backbone-easing)


## Examples

* [Single Anchor](http://rawgit.com/backbone-ui/anchor/master/examples/single-anchor.html)
* [Menu](http://rawgit.com/backbone-ui/anchor/master/examples/menu.html)


## Install

Using bower:
```
bower install backbone.ui.anchor
```


## Usage

Load the css and js in your app. Then load the view on the appropriate container:
```
var view = new Backbone.UI.Anchor({
text: "Check this out"
});
```

## Options

### position
Defaults to "bottom-right". Additional CSS classes have been set up to support "top-right", "top-left", "bottom-left", "left-middle" and "right-middle".

### target
Defaults to top of page.
Optionally set the id of the element on the page you want to scroll to.


## Credits

Initiated by Lyndel Thomas ( [@ryndel](http://github.com/ryndel) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)
