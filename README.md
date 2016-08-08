# ng-on

## `<div ng-on="{ 'event-name': handlerFn, 'another-event-name': anotherHandlerFn }"></div>`

Directive for Angular 1.x to easily bind custom (or not) events

Angular provides some useful directives for attaching event handlers easily: `ng-click="$ctrl.clickHandler()"`, `ng-change="$ctrl.changeHandler($event)"` or `ng-mouseenter="$ctrl.mouseenterHandler($event)"` etc.

## Examples

When you need to bind to custom event you'd probably do something like this:

```js
angular
    .module('myModule')
    .directive('myDirective', function() {
        return {
            link: function(scope, element) {
                element.on('custom-event', function(event) {
                    console.log('handling custom event', event.type);
                });
            }
        };
    });
```

with `ng-on` you can do this (notice it's now a simple `component`):

```js
angular
    .module('myModule')
    .component('myComponent', {
        template: '<div ng-on="{ 'custom-event': $ctrl.customEventHandler }"'>{{$ctrl.eventValue}}</div>,
        controller: function() {
            this.customEventHandler = function(event) {
                this.eventValue = event.value;
            };
        }
    });
```

you can also define multiple event handlers (this time `ng-on` value is in controller):

```js
angular
    .module('myModule')
    .component('myComponent', {
        template: '<div ng-on="$ctrl.eventsObj"'>{{$ctrl.eventValue}}</div>,
        controller: function() {
            this.eventsObj = {
                'custom-event': this.customEventHandler
                'another-custom-event': this.anotherCustomEventHandler,
                click: this.clickHandler // you can handle regular DOM events too
            };

            this.customEventHandler = function(event) {
                this.eventValue = event.value;
            };

            this.anotherCustomEventHandler = function(event) {
                console.log(event.type); // <= another-custom-event
            };

            this.clickHandler = function() {
                console.log(event.type); // <= click
            };
        }
    });
```

