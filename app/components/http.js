(function (angular) {
	// 由于默认angular提供的异步请求对象不支持自定义回调函数名
	// angular随机分配的回调函数名称不被豆瓣支持
	var http = angular.module('moviecat.service.http', []);
	http.service('HttpService', ['$window', '$document', function ($window, $document) {
		// url：http://xxx -> <script> -> html就可以自动执行
		this.jsonp = function(url, data, callback) {
			// 1. 处理url中的回调函数
			// 2. 创建一个script标签
			// 3. 挂载回调函数
			// 4. 将script标签放到页面中

			/*var fnSuffix = Math.random().toString().replace('.','');
			var cbFunName = 'my_json_cb_' + fnSuffix;
			// 不推荐
			$window[cbFunName] = callback;
			var queryString = url.indexOf('?')===-1 ? '?' : '&';
			for (var key in data) {
				queryString += key + '=' + data[key] + '&';
			}
			queryString += 'callback=' + cbFunName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + queryString;
			$document[0].body.appendChild(scriptElement);*/


			var queryString = url.indexOf('?')===-1 ? '?' : '&';
			for (var key in data) {
				queryString += key + '=' + data[key] + '&';
			}
			var fnSuffix = Math.random().toString().replace('.','');
			var cbFunName = 'my_json_cb_' + fnSuffix;
			queryString += 'callback=' + cbFunName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + queryString;
			// 不推荐
			$window[cbFunName] = function(data) {
				callback(data);
				// 执行完回调函数就删除
				$document[0].body.removeChild(scriptElement);
			};
			$document[0].body.appendChild(scriptElement);
		}
	}])

})(angular);

/*
* 01. 根据异步请求的地址拼接一个callback参数
* 02. 将这个地址当做一个script文件请求 callback(data)
* */
