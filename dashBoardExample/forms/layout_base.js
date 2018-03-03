/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E51FB4A4-134C-4B0E-A777-A8E3DB5D72FA"}
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
 * @properties={typeid:24,uuid:"7FD3E35B-302C-482F-90E3-DF7989B6FA93"}
 */
function onElementFocusGained(event) {
	//hide menu if it's open
	if (forms.main.isMenuOpen()){
		forms.main.openMenu(event);
	}
	return true;
}
