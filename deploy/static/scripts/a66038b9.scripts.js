(function(){"use strict";angular.module("openblocApp",[]).config(["$routeProvider",function(e){return e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}])}).call(this),function(){"use strict";angular.module("openblocApp").controller("MainCtrl",["$scope",function(e){return e.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this);