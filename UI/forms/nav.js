/**
 * @type {Array<servoyextra-sidenav.MenuItem>}
 *
 * @properties={typeid:35,uuid:"7D799F64-6EDF-4F46-BB73-2AF8ED4E341E",variableType:-4}
 */
var menu;

/**
 * Initialize the menu
 * @public
 * @properties={typeid:24,uuid:"2F1F43B3-A5D5-46FA-92A7-521DE7D381B9"}
 * @SuppressWarnings(wrongparameters)
 */
function initMenu() {
	//add footer to navigation menu
	//	menu.push({
	//		styleClass: 'footer'
	//	})
	elements.sidenav.setRootMenuItems(menu);
}

/**
 * @param {String} menuItemId
 * @param {JSEvent} event
 * @public
 *
 * @properties={typeid:24,uuid:"B6DDCAA3-04E9-43BA-A850-9FF997519F2B"}
 */
function onMenuItemSelected(menuItemId, event) { }

/**
 * @properties={typeid:24,uuid:"B99548B2-5065-44B0-8B31-96D6655A4E15"}
 */
function selectMenuItem(id) {
	elements.sidenav.setSelectedMenuItem(id)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"115FCFCA-7750-4F82-9808-56635C9998C9"}
 */
function onLoad(event) {
	initMenu();
	scopes.svyNavigation.addNavigationListener(onNavigation);
}

/**
 * @private
 * @param {scopes.svyNavigation.NavigationEvent} event
 * @properties={typeid:24,uuid:"C2B30FC4-1134-4562-8687-A8051FD52544"}
 */
function onNavigation(event) {
	var type = event.getEventType();
	var item = event.getNavigationItem();
	if (type == scopes.svyNavigation.NAVIGATION_EVENT.BEFORE_CLOSE) {
		//validate if we can close
	}
	if (type == scopes.svyNavigation.NAVIGATION_EVENT.AFTER_OPEN) {
		//after opening show the form
		var form = forms[item.getFormName()];
		var data = item.getCustomData();

		// load record
		if (data && data.pk) {
			form.foundset.loadRecords(data.pk);
		}

		// show form
		elements.sidenav.containedForm = form;

	}
}

/**
 * @properties={typeid:24,uuid:"3D36A07A-02C7-47FD-A06A-3E6F264ECC09"}
 */
function isMenuOpen() {
	return elements.sidenav.open;
}

/**
 * Called when the user clicks on the brand logo or text.
 *
 * @param {JSEvent} event
 *
 * @public
 *
 * @properties={typeid:24,uuid:"12A709BF-C3C0-42A0-ACA2-01954982D734"}
 */
function openMenu(event) {
	if (elements.sidenav.open) {
		elements.sidenav.open = false;
	} else {
		elements.sidenav.open = true;
	}
}
