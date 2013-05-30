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

The snap module provides a handful directives: `snap-shelf`, `snap-shelves`,
`snap-content`, and `snap-toggle`.

### `snap-shelf`

Tack this onto the element containing your navigation content:

```html
<div snap-shelf>
  <p>I'm a shelf! I maybe I've got some sweet navigation links.</p>
</div>
```

By default shelves show up on the left side of the page, use the class `right`
to get a right-aligned shelf:

```html
<div snap-shelf class="right">
  <p>Hi! I'm a right-aligned shelf!</p>
</div>
```

### `snap-shelves`

Multiple shelves must be wrapped in an element sporting the `snap-shelves`
directive:

```html
<div snap-shelves>
  <div snap-shelf>
    I'm a left shelf!
  </div>
  <div snap-shelf class="right">
    I'm a right shelf!
  </div>
</div>
```

Actually, all `snap-shelf` elements must be wrapped in a `snap-shelves` element.
This just happens automatically when you have a single shelf.

### `snap-content`

Your main content goes here, this is the stuff you slide left or right to make
your `snap-shelf`s visible.

```html
<div snap-shelf>...</div>

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
<div snap-contents snap-options="opts">...</div>
```

The `snap-contents` directive will watch your `snap-options` object for runtime
changes and update itself as you make them.


### `snap-toggle`

Used to easily make a button toggle the snap status.

```html
<button snap-toggle="left">Toggle Snap</button>
```

Note that the default value for `snap-toggle` is "left"

## Live Examples

_(more coming soon)_

For now, check out our gh-pages. The source is not minified.

## License

Copyright 2013 Justin Russell

Licensed under the MIT License
