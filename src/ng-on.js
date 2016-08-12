;(function() {
  'use strict';

  angular
    .module('argshook.ngOn', [])
    .directive('ngOn', ngOnDirective);


  function ngOnDirective($parse) {
    return {
      restrict: 'A',
      compile: function($element, attr) {
        var ngOn = $parse(attr.ngOn);

        return function(scope, element) {
          var eventsAndCallbacks = ngOn(scope);

          Object.keys(eventsAndCallbacks).forEach(callHandler);

          function callHandler(eventName) {
            element.on(eventName, function(eventObj) {
              scope.$evalAsync(function() {
                callOrNot(eventName, eventObj);
              });
            });
          }

          function callOrNot(eventName, eventObj) {
            if (eventsAndCallbacks[eventName]) {
              return eventsAndCallbacks[eventName].call(scope.$ctrl || scope, eventObj);
            }

            throw new Error('handler for event "' + eventName + '" is not a function');
          }
        };
      }
    };
  }
})();

