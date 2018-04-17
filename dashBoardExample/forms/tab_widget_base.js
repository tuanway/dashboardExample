/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A3FEC190-6606-4B82-A42B-CE3D50DC6D3C"}
 * @SuppressWarnings(wrongparameters)
 */
function onAction$add(event) {
	//hide menu if it's open
	if (forms.main.isMenuOpen()) {
		forms.main.openMenu(event);
	}
	//choose a widget to display
	var c = plugins.dialogs.showSelectDialog('Choose Widget', 'Choose a widget to add', 'calendar', 'customers', 'orders', 'pie', 'bar', 'line');
	if (!c || c == '') return;
	//get parent layout
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName());

	//find out which layout and which tab-panel contains our tab_widget_base
	var els = forms[p.getName()].elements
	var tabIndex = 0;
	for (var j = 0; j < els.length; j++) {

		var els2 = forms[els[j].containedForm].elements
		for (var k = 0; k < els2.length; k++) {

			if (els2[k].getElementType() == 'TABPANEL') {
				var tp = forms[els2[k].getFormName()].elements
				// get the panel containing our tab_widget
				for (var l = 0; l < tp.length; l++) {

					if (tp[l].getElementType() == 'TABPANEL') {
						var tf = forms[tp[l].getTabFormNameAt(1)];
						/** @type {tabpanelplus-tabpanel} */
						var tabPanel = tf.elements[0];
						break;
					}
				}
			}
		}
	}
	if (!tabPanel) return; //if we cannot find a tab panel container - quit.  Otherwise create a new tab
	//hide selection button
	elements.picker_btn.visible = false;
	elements.remove_btn.visible = false;
	//create a child dashboard item
	var i = new scopes.UI.Instance(c, c, tabIndex);
	//add the child to a parent
	p.addChild(i);
	elements.tabless.addTab(forms[i.getName()])
	elements.tabless.visible = true;
	forms.main.initMenu();
	tabPanel.setTabTextAt(tabPanel.tabIndex, i.getTitle())

	//mark all tabs not new close-able
	for (i in tabPanel.tabs) {
		if (tabPanel.tabs[i].text != ' ') {
			tabPanel.tabs[i].showCloseIcon = true;
		}
	}

	//create a new instance of widget_base for new tabs.
	var tc = new scopes.UI.Instance('tab', 'tab_widget_base');
	tabPanel.addTab(tc.getName(), ' ');

}
