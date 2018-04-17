/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2A552236-5C7F-4801-A93E-9B90A9909934"}
 */
function onAction$add(event) {

	//hide menu if it's open
	if (forms.main.isMenuOpen()) {
		forms.main.openMenu(event);
	}
	//choose a widget to display
	var c = plugins.dialogs.showSelectDialog('Choose Widget', 'Choose a widget to create', 'tabs', 'calendar', 'customers', 'orders', 'pie', 'bar', 'line');
	//get parent layout
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName());
	if (c) {
		//find out which container was selected
		var els = forms[scopes.svyNavigation.getCurrentItem().getFormName()].elements
		var tabIndex = 0;
		for (var j = 0; j < els.length; j++) {
			if (els[j].containedForm == controller.getName()) {
				tabIndex = Number(els[j].getName().split('t')[1]);
			}
		}
		//hide selection button
		elements.picker_btn.visible = false;
		elements.remove_btn.visible = true;
		//create a child dashboard item
		var i = new scopes.UI.Instance(c, c, tabIndex);
		//add the child to a parent
		p.addChild(i);
		elements.tabless.addTab(forms[i.getName()])
		elements.tabless.visible = true;
		forms.main.initMenu();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BE788310-CAF8-44AA-8CCC-F58BE650C088"}
 */
function onAction$remove(event) {
	//	var s = plugins.dialogs.showQuestionDialog('INFO', 'Remove Child?', 'Yes', 'No')
	//	if (!s || s == 'No') {
	//		return;
	//	}
	//get parent form
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName());
	//get child form
	var c = elements.tabless.getTabFormNameAt(1);
	p.removeChild(c);

	//update UI
	elements.tabless.removeAllTabs();
	elements.picker_btn.visible = true;
	elements.remove_btn.visible = false;
	forms.main.initMenu();
}
