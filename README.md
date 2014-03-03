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

*Note that the angular-snap styles do not give `snap-content` a background color.*

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

#### Options

You can pass initialization parameters to the `Snap` constructor : 

```javascript
angular.module('myApp', ['snap'])
  .config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
    // or
    snapRemoteProvider.globalOptions = {
      disable: 'right',
      // ... others options
    }
  })
```


You can also use the
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

#### Multiples

You may want to have more than one `snap-content` on the page at once. To
distinguish between them you'll need to use the `snap-id` attribute. This should
evaluate to string.

```javascript
<snap-drawer>
  foo drawer
</snap-drawer>

<snap-content snap-id="'foo'">
  <snap-drawer>
    bar drawer
  </snap-drawer>

  <snap-content snap-id="'bar'">
    bar stuff
  </snap-content>

</snap-content>
```

You can use the `snap-id` attribute with single snapper setups too if you're
into naming things.


### snap-toggle

Used to easily make a button toggle the snap status.

```html
<button snap-toggle="left">Toggle Snap</button>
```

Note that the default value for `snap-toggle` is `left`. Set it to `right` to toggle the right drawer.

The directive will honor a `snap-id` attribute when present to explicitly tie it
to a snapper instance.

### snap-close

Used to easily make a button to close the opened drawer.

```html
<button snap-close>Close Snap</button>
```

The directive will honor a `snap-id` attribute when present to explicitly tie it
to a snapper instance.

### snap-dragger

Used to designate a specific element your the drag area. This will disable
dragging outside the attached element. Available as an element level or
attribute level directive.

```html
<snap-dragger>
  Drag here to open your drawer!
</snap-dragger>

Dragging here does nothing!
```

Use `snap-id` if you have multiple snappers on the page. Note that you can only
have a single dragger per `snap-content`.

## Services

### snapRemote

The "remote control" if you will. This service gives you programmatic access to
the snapper instance. Check out the [Snap.js docs](https://github.com/jakiestfu/Snap.js) for all the fancy things
you might want to do with your snapper instance.

The `snapRemote` service provides these handy methods:

#### `snapRemote.getSnapper([snapId])`

Returns a promise to a snapper instance:

```javascript
snapRemote.getSnapper().then(function(snapper) {
  // Do something with snapper
});
```

You may optionally pass an id string corresponding to the `snap-id` of one of
your `snap-content`s.

#### `snapRemote.register(snapper[, snapIdl])`

Used internally to register snapper instances with this service. You could use
this method if you were creating your own snapper instance but that's not super
likely if you're already working with `angular-snap.js`.

You may optionally pass an id string to register this snapper instance. You will
need to use the same id with other `snapRemote` methods and the directives which
allow for a `snap-id` attribute.

#### `snapRemote.toggle(side[, snapId])`

Toggles the open/closed state of your drawer, `side` should be either "right" or
"left".

You may optionally pass an id string corresponding to the `snap-id` of one of
your `snap-content`s.

#### `snapRemote.open(side[, snapId])`

Opens the drawer on "side" if it isn't already open. I.e. `snapRemote.open('left')` will
slide your content to the right, thereby opening the left hand drawer.

You may optionally pass an id string corresponding to the `snap-id` of one of
your `snap-content`s.

#### `snapRemote.close([snapId])`

Closes the drawer if it's open.

You may optionally pass an id string corresponding to the `snap-id` of one of
your `snap-content`s.

## Examples

Check out our [gh-pages](http://jtrussell.github.io/angular-snap.js/). The source is not minified.

Here are some plunks to wet your whistle:

- [Basic usage and the `snapToggle` directive](http://plnkr.co/edit/5qbthSlEzCik1AtCpFj3?p=preview)
- [Using the `snapRemote` service to add event listeners](http://plnkr.co/edit/I8IBAdpkF6OlEqtx94pT?p=preview)
- [Left and right side drawers](http://plnkr.co/edit/iB8VfD?p=preview)

Feel free to open an issue if you'd like to see other demos.

Also, I will maintain a [template](http://plnkr.co/edit/VeQ9F9?p=preview) on plnkr.co that can be used
for reporting issues and building examples.

## License

Copyright 2013 Justin Russell @jusrussell

Licensed under the MIT License
