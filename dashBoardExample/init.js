/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>>} queryParams all query parameters of the deeplink url with which the Client was started
 *
 * @properties={typeid:24,uuid:"4A378E8D-8ADA-4C8D-A3A7-69136470FB22"}
 */
function onSolutionOpen(arg, queryParams) {
	scopes.UI.onSolutionOpen(arg, queryParams);

	//reload dashboard data;
	var r = plugins.webstorageLocalstorage.getItem('dashboard');
	var d = plugins.serialize.fromJSON(r);

	//restore instances
	for (var i = 0; i < d.length; i++) {
		var ins = new scopes.UI.Instance(d[i].title, d[i].formName);
		var layout = scopes.UI.setupInstanceLayout(ins);
		if (d[i].children.length) {
			for (var j = 0; j < d[i].children.length; j++) {
				var ci = new scopes.UI.Instance(d[i].children[j].title, d[i].children[j].formName, d[i].children[j].tabIndex);
				ins.addChild(ci);
				for (var k = 0; k < layout.length; k++) {
					if (layout[k].getName() == 't' + ci.getTabIndex()) {
						forms[layout[k].containedForm].elements.tabless.addTab(forms[ci.getName()]);
						forms[layout[k].containedForm].elements.tabless.visible = true;
						forms[layout[k].containedForm].elements.picker_btn.visible = false;
					}
				}
			}
		}
		scopes.UI.storeInstance(ins);
		new scopes.svyNavigation.NavigationItem(ins.getName(), ins.getTitle(), ins.getTitle())
	}
	forms.main.initMenu();

}
