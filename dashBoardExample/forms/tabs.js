/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"86A226A9-F20C-4182-BF7D-348703CC4A65"}
 * @SuppressWarnings(wrongparameters)
 */
function onShow(firstShow, event) {
	//first check to see if there are any existing tabs - if not add one
	if (!elements.custom_tab.getMaxTabIndex()) {
		//create a new instance of widget_base for selection
		var c = new scopes.UI.Instance('tab', 'tab_widget_base');
		elements.custom_tab.addTab(c.getName(), ' ')
	}
}

/**
 * @param {Number} previousIndex
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CF8A5B9E-8612-4603-831A-524EC0A1744B"}
 */
function onChangeMethodID(previousIndex, event) {	
	var title = elements.custom_tab.getTabTextAt(elements.custom_tab.tabIndex)
	if (title==' ') {
		// ask to add a new widget when switching to a new tab.
		forms[elements.custom_tab.getSelectedTabFormName()].onAction$add(event)
	}
	
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BFE8BA76-7D4B-42C5-BB61-F31C26476238"}
 */
function onHide(event) {
	//save related tab information when leaving this page.
	application.output('hiding')
	application.output(elements.custom_tab);
	return true
}
