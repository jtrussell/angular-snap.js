'use strict';

angular.module('myApp.controllers', [])

  .controller('ExRemoteCtrl', function($scope, snapRemote, logger) {
    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        logger.info('Opened!');
      });

      snapper.on('close', function() {
        logger.info('Closed!');
      });
    });
  })

  // That's all folks
  ;
