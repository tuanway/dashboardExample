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
	},{
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
