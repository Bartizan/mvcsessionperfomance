﻿angular.module('asyncApp', [])
    .value('mvcuri', 'http://localhost:49588/home/getbox')
    .value('mvcurisessionresolved', 'http://localhost:49588/SessionResolved/getbox')
    .value('mvcuriresolved2', 'http://localhost:49588/ResolvedWithSessionAccess/getBox')
    .controller('asyncCtrl', function ($http, $scope, mvcuri, mvcurisessionresolved, mvcuriresolved2) {

        $scope.boxes = [];
        $scope.showResults = false;
        var uri;

        $scope.getBoxes = function (resolved) {
            var start = new Date();
            var counter = 300;


            if (1 == resolved)
                uri = mvcurisessionresolved;
            else if (2 == resolved)
                uri = mvcuriresolved2;
            else
                uri = mvcuri;
            
            // Init variables
            $scope.boxes = [];
            $scope.showResults = false;
            $scope.timeElapsed = '';

            for (var i = 0; i < 300; i++) {
                $http.get(uri)
                    .success(function (data, status, headers, config) {
                        $scope.boxes.push(data);
                        counter--;

                        if (counter == 0) {
                            var time = new Date().getTime() - start.getTime();
                            $scope.timeElapsed = 'Time elapsed (ms): ' + time;
                            $scope.showResults = true;
                        }
                    })
                        .error(function (error) {
                            $scope.timeElapsed = error.Message;
                        }).finally(function () {
                        });
            }
        };

        $scope.isResolved = function () {
            return uri == mvcuri ? 'alert-danger' : 'alert-success';
        }

    });