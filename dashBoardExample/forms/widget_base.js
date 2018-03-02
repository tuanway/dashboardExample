/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7C372A25-AC07-42EE-BBA4-3CD8247DE31D"}
 */
function onAction(event) {
	var c = plugins.dialogs.showSelectDialog('Choose Widget', 'Choose a widget to create', 'customers', 'employees', 'pie', 'bar');
	//get parent layout
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName());
	if (c) {
		elements.picker_btn.visible = false;
		//create a child dashboard item
		var i = new scopes.UI.Instance(c, c);
		//add the child to a parent
		p.addChild(i);
		elements.tabless.addTab(forms[i.name])
		elements.tabless.visible = true;
	}
}
