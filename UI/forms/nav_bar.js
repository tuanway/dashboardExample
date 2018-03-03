/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"02BB8812-293D-4762-AAE0-D3FE820C6B04"}
 */
var search = '';

/**
 * @type {Array<bootstrapextracomponents-dropdown.MenuItem>}
 * @public
 * @properties={typeid:35,uuid:"037EA9AA-5C7C-416B-9393-4A17739D656E",variableType:-4}
 */
var settings_items = [];

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @public
 * @properties={typeid:24,uuid:"BB2713FD-F287-4E63-B8A1-D3766588DA44"}
 */
function onMenuClick(event) {
	forms.nav.openMenu(event);
	elements.other.requestFocus();
}

/**
 * @param {JSEvent} event
 * @public
 * @properties={typeid:24,uuid:"D742E387-E072-4736-BCA3-5142C138044A"}
 */
function onAction$Search(event) {
	plugins.dialogs.showWarningDialog('INFO', 'search is not implemented.');
	//override and implement search.
}

/**
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-dropdown.MenuItem} menuItem
 * @public
 * @properties={typeid:24,uuid:"1CCB4805-470F-4A68-8A30-0C5E1E030F2D"}
 */
function onMenuItemSelected(event, menuItem) {
	plugins.dialogs.showWarningDialog('INFO', menuItem.itemId + ' is not implemented.');
	//override function and implement settings.
}

/**
 * @public
 * @properties={typeid:24,uuid:"499AD18F-ED2F-499C-B34A-CC27EF5A09D6"}
 */
function initSettingsMenu() {
	elements.settings_btn.setMenuItems(settings_items)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"C4123174-E07B-4B27-8A9A-112E8D06C50E"}
 */
function onLoad(event) {
	initSettingsMenu();
}

