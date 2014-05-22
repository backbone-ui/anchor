# Backbone UI: Anchor

An extension to topanchor for more fluid settings


## Dependencies

* [Backbone Easing](http://github.com/makesites/backbone-easing)


## Examples

* [Static](http://rawgit.com/backbone-ui/anchor/master/examples/static.html)
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


