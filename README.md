# Angular Snap.js [![Build Status](https://travis-ci.org/jtrussell/angular-snap.js.png?branch=master)](https://travis-ci.org/jtrussell/angular-snap.js)
> Angular directive for [Snap.js](https://github.com/jakiestfu/Snap.js). 

## What is it?

A pretty thin wrapper around [snap.js](https://github.com/jakiestfu/Snap.js) plus some handy styles to make everything work out of the box.

__NOTE__: Built files are not included in this repo but can be found [here](https://github.com/jtrussell/angular-snap.js-bower).

## Directives Usage

This package provides a `snap` module which you'll need to add as a dependency
to your app, i.e.

```javascript
angular.module('myApp', ['snap']);
```

The snap module provides a handful directives: `snap-drawers`, `snap-drawer`,
`snap-content`, and `snap-toggle`.

### snap-drawer

Tack this onto the element containing your navigation content:

```html
<div snap-drawer>
  <p>I'm a drawer! I maybe I've got some sweet navigation links.</p>
</div>
```

It can be an element level directive too if you're into that sort of thing:

```html
<snap-drawer>
  <p>I'm a drawer! I maybe I've got some sweet navigation links.</p>
</snap-drawer>
```


By default drawers show up on the left side of the page, pass the parameter `right`
to get a right-aligned drawer:

```html
<div snap-drawer="right">
  <p>Hi! I'm a right-aligned drawer!</p>
</div>
```

### snap-drawers

Multiple drawers must be wrapped in an element sporting the `snap-drawers`
directive:

```html
<div snap-drawers>
  <div snap-drawer>
    I'm a left drawer!
  </div>
  <div snap-drawer="right">
    I'm a right drawer!
  </div>
</div>
```

Just like `snap-drawer` this also comes in element flavor:

```html
<snap-drawers>
  <snap-drawer>
    I'm a left drawer!
  </snap-drawer>
  <div snap-drawer="right">
    Heads up! Only the attribute level directive can be on the right (right now)
  </div>
</snap-drawers>
```

Actually, all `snap-drawer` elements must be wrapped in a `snap-drawers` element.
This just happens behind the scenes when you have a single drawer.

### snap-content

Your main content goes here, this is the stuff you slide left or right to make
your `snap-drawers` visible.

```html
<div snap-drawer>...</div>

<div snap-content>
  <p>Hello! I'm your main content!</p>
</div>
```

And this is cool too:

```html
<snap-drawer>...</snap-drawer>

<snap-content>
  <p>Hello! I'm your main content!</p>
</snap-content>
```

You can pass initialization parameters to the `Snap` constructor using the
`snap-options` attribute on the same element with the `snap-contents` directive.

In your controller:

```javascript
$scope.opts = {
  disable: 'right'
};
```

In your view:

```html
<snap-content snap-options="opts">...</snap-content>
```

The `snap-content` directive will watch your `snap-options` object for runtime
changes and update itself as you make them.


### snap-toggle

Used to easily make a button toggle the snap status.

```html
<button snap-toggle="left">Toggle Snap</button>
```

Note that the default value for `snap-toggle` is `left`. Set it to `right` to toggle the right drawer.

### snap-close

Used to easily make a button to close the opened drawer.

```html
<button snap-close>Close Snap</button>
```

## Services

### snapRemote

The "remote control" if you will. This service gives you programmatic access to
the snapper instance. Check out the [Snap.js docs](https://github.com/jakiestfu/Snap.js) for all the fancy things
you might want to do with your snapper instance.

The `snapRemote` service provides these handy methods:

#### `snapRemote.getSnapper()`

Returns a promise to a snapper instance:

```javascript
snapRemote.getSnapper().then(function(snapper) {
  // Do something with snapper
});
```

#### `snapRemote.register(snapper)`

Used internally to register snapper instances with this service. You could use
this method if you were creating your own snapper instance but that's not super
likely if you're already working with `angular-snap.js`.

#### `snapRemote.toggle(side)`

Toggles the open/closed state of your drawer, `side` should be either "right" or
"left".

#### `snapRemote.open(side)`

Opens the drawer on "side" if it isn't already open. I.e. `snapRemote.open('left')` will
slide your content to the right, thereby opening the left hand drawer.

#### `snapRemote.close()`

Closes the drawer if it's open.

## Examples

Check out our [gh-pages](http://jtrussell.github.io/angular-snap.js/). The source is not minified.

We're starting to add focused examples [here](https://github.com/jtrussell/angular-snap.js/tree/master/examples)
(also to be used for e2e tests). If you'd like to see a particular use case that doesn't yet have an example please open
an issue.

## License

Copyright 2013 Justin Russell

Licensed under the MIT License
