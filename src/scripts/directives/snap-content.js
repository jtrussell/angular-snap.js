angular.module('snap')
  .directive('snapContent', ['SnapConstructor', 'snapRemote', function (SnapConstructor, snapRemote) {
    'use strict';
    return {
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        element.addClass('snap-content');

        var snapId = attrs.snapId;
        if(!!snapId) {
          snapId = scope.$eval(attrs.snapId);
        }

        var snapOptions = angular.extend({}, snapRemote.globalOptions);

        var watchAttr = function(val, attr) {
          scope.$watch(function() {
            return scope.$eval(val);
          }, function(newVal, oldVal) {
            if(angular.isDefined(oldVal) && newVal !== oldVal) {
              snapRemote.getSnapper(snapId).then(function(snapper) {
                var settingsUpdate = {};
                settingsUpdate[attr] = newVal;
                snapper.settings(settingsUpdate);
              });
            }
          });
        };

        // Get `snapOpt*` attrs, for now there is no *binding* going on here.
        // We're just providing a more declarative way to set initial values.
        angular.forEach(attrs, function(val, attr) {
          if(attr.indexOf('snapOpt') === 0) {
            attr = attr.substring(7);
            if(attr.length) {
              attr = attr[0].toLowerCase() + attr.substring(1);
              snapOptions[attr] = scope.$eval(val);
              watchAttr(val, attr);
            }
          }
        });

        // Always force the snap element to be the one this directive is
        // attached to.
        snapOptions.element = element[0];

        // override snap options if some provided in snap-options attribute
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
        }

        snapRemote.register(new SnapConstructor(snapOptions), snapId);

        // watch snapOptions for updates
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          scope.$watch(attrs.snapOptions, function(newSnapOptions) {
            snapRemote.getSnapper(snapId).then(function(snapper) {
              snapper.settings(newSnapOptions);
            });
          }, true);
        }

        scope.$on('$destroy', function() {
          snapRemote.unregister(snapId);
        });
      }
    };
  }]);
