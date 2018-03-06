angular.module('metatagTag',['servoy'])
.factory("metatagTag",function($services) 
{
	var scope = $services.getServiceScope('metatagTag');
	return {
		initWebApp: function() {
			var meta = document.createElement('meta');
			meta.name = "apple-mobile-web-app-capable";
			meta.content = "yes";
			document.getElementsByTagName('head')[0].appendChild(meta);
			
			var meta2 = document.createElement('meta');
			meta2.name = "mobile-web-app-capable";
			meta2.content = "yes";
			document.getElementsByTagName('head')[0].appendChild(meta2);
			
			var meta3 = document.createElement('viewport');
			meta3.name = "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui";
			meta3.content = "yes";
			document.getElementsByTagName('head')[0].appendChild(meta3);
			
		}
	}
})
.run(function($rootScope,$services){})