/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7396348D-EB62-420B-87FB-99EEEF232166"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		forms.main.selectMenuItem(scopes.svyNavigation.getCurrentItem().getFormName())
	}
}

/**
 * Handle focus gained event of an element on the form. Return false when the focus gained event of the element itself shouldn't be triggered.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C75E3AB0-624C-4237-9BF5-79935ED2F12E"}
 */
function onElementFocusGained(event) {
	//hide menu if it's open
	if (forms.main.isMenuOpen()){
		forms.main.openMenu(event);
	}
	return true;
}
