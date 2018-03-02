/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F1F4EBF2-CD9F-487B-A2BF-083810725920"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		forms.main.selectMenuItem(scopes.svyNavigation.getCurrentItem().getFormName())
	}
	//hide menu to show full layout
	forms.main.openMenu(event);
}
