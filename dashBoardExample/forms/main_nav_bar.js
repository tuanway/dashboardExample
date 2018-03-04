/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F776784F-C40D-4B54-B728-96B8E9471E17"}
 */
function onMenuClick(event) {
	forms.main.openMenu(event);
	elements.other.requestFocus();
}

/**
 * @properties={typeid:24,uuid:"87C2C6EF-89D3-45BE-8283-986E709655A9"}
 */
function initSettingsMenu() {
	settings_items = [{
		itemId: 'profile',
		enabled: true,
		iconName: 'fa fa-user',
		text: 'Tuan Nguyen'
	}, {
		itemId: 'app_settings',
		enabled: true,
		iconName: 'fa fa-desktop',
		text: 'Application Settings'
	}, {
		itemId: 'log_out',
		enabled: true,
		iconName: 'fa fa-sign-out',
		text: 'Logout'
	}];
	return _super.initSettingsMenu.apply(this, arguments);
}

/**
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-dropdown.MenuItem} menuItem
 *
 * @properties={typeid:24,uuid:"395D28CD-7F12-499B-BC38-4050BCE5C184"}
 */
function onMenuItemSelected(event, menuItem) {
	switch (menuItem.itemId) {
	case 'log_out':
		//save dashboard data to localstorage

		var ins = scopes.UI.getAllInstances();
		var data = [];
		for (var i = 0; i < ins.length; i++) {

			var ip = {
				name: ins[i].getName(),
				title: ins[i].getTitle(),
				formName: ins[i].getFormName(),
				children: []
			}

			//get children
			var ch = ins[i].getChildren();
			for (var j = 0; j < ch.length; j++) {
				ip.children.push({
					name: ch[j].getName(),
					title: ch[j].getTitle(),
					formName: ch[j].getFormName(),
					tabIndex: ch[j].getTabIndex()
				})
			}

			data.push(ip);

		}

		var val = plugins.serialize.toJSON(data);
		plugins.webstorageLocalstorage.setItem('dashboard', val);
		plugins.dialogs.showInfoDialog('INFO', 'logging out.');
		application.closeSolution();
		break;

	default:
		break;
	}
}
