(angular, function () {
	'use strict';

// Declare app level module which depends on views, and components
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.list',
		'moviecat.directives.auto_focus'
	])
		// 为模块定义一些常量
		.constant('AppConfig', {
			pageSize: 10,
			listApiAddress: 'https://api.douban.com/v2/movie/',
			detailApiAddress: 'https://api.douban.com/v2/movie/subject/'
		})
		.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}])
		.controller('SearchController', [
			'$scope',
			'$route',
			'AppConfig',
			function ($scope, $route, AppConfig) {
			$scope.input = '';	// 取文本框中的输入
			$scope.search = function () {
				$route.updateParams({category: 'search', q: $scope.input})
			}
		}]);
		// .controller('NavController', ['$scope', '$location', function ($scope, $location) {
		// 	$scope.$location = $location;
		// 	$scope.$watch('$location.path()', function (now) {
		// 		if (now.startsWith('/in_theaters')) {
		// 			$scope.type = 'in_theaters';
		// 		} else if (now.startsWith('/coming_soon')) {
		// 			$scope.type = 'coming_soon';
		// 		} else if (now.startsWith('/top250')) {
		// 			$scope.type = 'top250';
		// 		}
		// 	})
		// }]);
})(angular);
