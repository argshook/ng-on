/* global jasmine, describe, it, beforeEach, expect, module, inject, createCompiler   */

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
      var events = {
        click: jasmine.createSpy('clickSpy'),
        'the-amazing-spiderman': jasmine.createSpy('the-amazing-spiderman')
      };

      compile({ events: events }, elementAttrsMock, function (scope, element) {
        scope = $rootScope.$new();

        element.triggerHandler('click');
        element.triggerHandler('the-amazing-spiderman');
        scope.$digest();

        expect(scope.$parent.$$childHead.events.click)
          .toHaveBeenCalledWith(jasmine.objectContaining({
            type: 'click'
          }));

        expect(scope.$parent.$$childHead.events['the-amazing-spiderman'])
          .toHaveBeenCalledWith(jasmine.objectContaining({
            type: 'the-amazing-spiderman'
          }));
      });
    });
  });
});
