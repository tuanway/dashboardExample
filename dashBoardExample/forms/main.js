/**
 * @properties={typeid:24,uuid:"BF2E27A5-34C7-4F0C-A9EB-000CFBF3540B"}
 */
function initMenu() {
	menu = [{
		id: 'dashboard',
		iconStyleClass: 'glyphicon glyphicon-dashboard',
		text: "Dashboard",
		data: { },
		menuItems: [{
			id: 'generate_layout',
			iconStyleClass: 'glyphicon glyphicon-plus',
			text: "Generate",
			data: { },
			menuItems: [{
				id: 'layout_15',
				iconStyleClass: 'glyphicon glyphicon-th',
				text: "Layout Type (15)",
				data: { type: 'dashboard', formName: 'layout_15' }
			}, {
				id: 'layout_21',
				iconStyleClass: 'glyphicon glyphicon-th-large',
				text: "Layout Type (2x1)",
				data: { type: 'dashboard', formName: 'layout_21' }
			}, {
				id: 'layout_1',
				iconStyleClass: 'glyphicon glyphicon-unchecked',
				text: "Layout Type (1)",
				data: { type: 'dashboard', formName: 'layout_1' }
			}]
		},
		]
	}];
	return _super.initMenu.apply(this, arguments);

}

/**
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DB6094E1-EEFA-4E3A-8B78-8C4F47F4F7F3"}
 */
function onMenuItemSelected(menuItemId, event) {
	var item = elements.sidenav.getMenuItem(menuItemId);
	var form = forms[item.data['formName']];
	if (!form) return;

	switch (item.data['type']) {
	case 'instance':
		//show the instance
		scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(scopes.UI.getInstance(item.data['formName']).getName(), item.text, item.text));
		break;
	case 'dashboard':
		//create a new instance of a dashboard
		var i = new scopes.UI.Instance(item.text, item.data['formName']);
		scopes.UI.instances.push(i);
		//setup a layout
		scopes.UI.setupInstanceLayout(i);
		//update side navigation
		initMenu();
		//finally navigate to the instance
		scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(i.getName(), item.text, item.text));
		break;
	case 'remove_instance':
		var s = plugins.dialogs.showQuestionDialog('INFO', 'Remove Instance?', 'Yes', 'No')
		if (!s || s == 'No') return;
		scopes.UI.removeInstance(item.data['formName'])
		//update side navigation
		initMenu();
		elements.sidenav.containedForm = forms.base;
		selectMenuItem('dashboard')
		break;
	default:
		break;
	}
}
