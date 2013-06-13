# Angular Snap.js [![Build Status](https://travis-ci.org/jtrussell/angular-snap.js.png?branch=master)](https://travis-ci.org/jtrussell/angular-snap.js)
> Angular directive for [Snap.js](https://github.com/jakiestfu/Snap.js). 

_(work in progress)_

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

Actually, all `snap-drawer` elements must be wrapped in a `snap-drawers` element.
This just happens automatically when you have a single drawer.

### snap-content

Your main content goes here, this is the stuff you slide left or right to make
your `snap-drawers` visible.

```html
<div snap-drawer>...</div>

<div snap-content>
  <p>Hello! I'm your main content!</p>
</div>
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
<div snap-content snap-options="opts">...</div>
```

The `snap-content` directive will watch your `snap-options` object for runtime
changes and update itself as you make them.


### `snap-toggle`

Used to easily make a button toggle the snap status.

```html
<button snap-toggle="left">Toggle Snap</button>
```

Note that the default value for `snap-toggle` is `left`. Set it to `right` to toggle the right drawer.

### `snap-close`

Used to easily make a button to close the opened drawer.

```html
<button snap-close>Close Snap</button>
```

## Live Examples

_(more coming soon)_

For now, check out our gh-pages. The source is not minified.

## License

Copyright 2013 Justin Russell

Licensed under the MIT License
