'use strict';

describe('Directive: ngOn', function() {
  var compile, $rootScope;

  var elementAttrsMock = {
    'ng-on': 'events'
  };


  beforeEach(module('argshook.ngOn'));

  beforeEach(inject(function($compile, _$rootScope_) {
    compile = createCompiler('<div />', _$rootScope_, $compile);
    $rootScope = _$rootScope_;
  }));

  describe('when given correct event object', function() {
    it('should call defined event handler', function() {
     var eventObj = {
        click: jasmine.createSpy('clickSpy')
      };

      compile({ events: eventObj }, elementAttrsMock, function (scope, element, driver) {
        scope = $rootScope.$new();

        element.triggerHandler('click');
        scope.$digest();

        expect(scope.$parent.$$childHead.events.click).toHaveBeenCalled();
      });
    });
  });
});
