angular.module('fastclickFastclick', ['servoy']).factory("fastclickFastclick", function($services) {
		var scope = $services.getServiceScope('fastclickFastclick');
		return {
			init: function() {
				if ('addEventListener' in document) {
					document.addEventListener('DOMContentLoaded', function() {
							FastClick.attach(document.body);							
						}, false);
				}
			}
		}
	}).run(function($rootScope, $services) { })