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

          Object.keys(eventsAndCallbacks).forEach(function(eventName) {
            element.on(eventName, function(event) {
              scope.$evalAsync(function() {
                try {
                  eventsAndCallbacks[eventName](event);
                } catch(e) {
                  throwError(e, eventName);
                }
              });
            });
          });
        };
      }
    }
  };

  function throwError(error, eventName) {
    if(error instanceof TypeError) {
      throw new Error('handler for event "' + eventName + '" is not a function');
    }
  }

})();

