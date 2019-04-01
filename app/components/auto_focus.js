(function (angular) {
	angular.module('moviecat.directives.auto_focus', [])
		.directive('autoFocus', ['$location', function ($location) {
			return {
				restrict: 'A',
				link: function ($scope, iElm, iAttrs, controller) {
					$scope.$location = $location;
					$scope.$watch('$location.path()', function (now) {
						// 当path发生变化时执行，now是变化后的值
						var aLink = iElm.children().attr('href');
						var type = aLink.replace(/#(\/.+?)\/1/, '$1');
						if (now.startsWith(type)) {
							// 访问的是当前链接
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
						}
					});
				}
			}
		}]);
})(angular);
