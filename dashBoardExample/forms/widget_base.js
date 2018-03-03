/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2A552236-5C7F-4801-A93E-9B90A9909934"}
 */
function onAction(event) {
	//hide menu if it's open
	if (forms.main.isMenuOpen()){
		forms.main.openMenu(event);
	}
	var c = plugins.dialogs.showSelectDialog('Choose Widget', 'Choose a widget to create', 'customers', 'orders', 'pie', 'bar', 'line');
	//get parent layout
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName());
	if (c) {
		elements.picker_btn.visible = false;
		//create a child dashboard item
		var i = new scopes.UI.Instance(c, c);
		//add the child to a parent
		p.addChild(i);
		elements.tabless.addTab(forms[i.getName()])
		elements.tabless.visible = true;
		forms.main.initMenu();
	}
}
