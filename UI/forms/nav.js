/**
 * @type {Array<servoyextra-sidenav.MenuItem>}
 *
 * @properties={typeid:35,uuid:"7D799F64-6EDF-4F46-BB73-2AF8ED4E341E",variableType:-4}
 */
var menu;

/**
 * Initialize the menu
 * @properties={typeid:24,uuid:"2F1F43B3-A5D5-46FA-92A7-521DE7D381B9"}
 * @SuppressWarnings(wrongparameters)
 */
function initMenu() {
	menu = [{
		id: 'dashboard',
		iconStyleClass: 'glyphicon glyphicon-dashboard',
		text: "Dashboard",
		data: { },
		menuItems: [{
			id: 'generate_layout',
			iconStyleClass: 'glyphicon glyphicon-plus',
			text: "Generate",
			data: { },
			menuItems: [{
				id: 'layout_15',
				text: "Layout Type (15)",
				data: { type: 'dashboard', formName: 'layout_15' }
			}, {
				id: 'layout_21',
				text: "Layout Type (2x1)",
				data: { type: 'dashboard', formName: 'layout_21' }
			}, {
				id: 'layout_1',
				text: "Layout Type (1)",
				data: { type: 'dashboard', formName: 'layout_1' }
			}]
		},
		]
	}];
	//create a menu for instances if we have them
	var inst = scopes.UI.instances;
	if (inst.length) {
		menu.push({
			text: 'Instances:'
		})
		menu.push({
			isDivider: true
		})

		for (var i = 0; i < inst.length; i++) {
			/** @type {servoyextra-sidenav.MenuItem} */
			var menuItem = {
				id: inst[i].name,
				formName: inst[i].name,
				text: inst[i].title,
				data: { type: 'instance', text: inst[i].title, formName: inst[i].name },
				menuItems: [{
					id: 'remove',
					iconStyleClass: 'glyphicon glyphicon-remove',
					text: "Remove",
					data: { type: 'remove_instance', formName: inst[i].name }
				}]
			}

			if (!inst[i].parent)
				menu.push(menuItem)
		}
	}

	elements.sidenav.setRootMenuItems(menu);
}

/**
 * @param {String} menuItemId
 * @param {JSEvent} event
 * @private
 *
 * @properties={typeid:24,uuid:"B6DDCAA3-04E9-43BA-A850-9FF997519F2B"}
 */
function onMenuItemSelected(menuItemId, event) {
	var item = elements.sidenav.getMenuItem(menuItemId);
	var form = forms[item.data['formName']];
	if (!form) return;

	switch (item.data['type']) {
	case 'instance':
		//show the instance
		scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(scopes.UI.getInstance(item.data['formName']).name, item.text, item.text));
		break;
	case 'dashboard':
		//create a new instance of a dashboard
		var i = new scopes.UI.Instance(item.text, item.data['formName']);
		scopes.UI.instances.push(i);
		//setup a layout
		scopes.UI.setupInstanceLayout(i);
		//update side navigation
		initMenu();
		//finally navigate to the instance
		scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(i.name, item.text, item.text));
		break;
	case 'remove_instance':		
		scopes.UI.removeInstance(item.data['formName'])
		//update side navigation
		initMenu();
		elements.sidenav.containedForm = forms.base;
		selectMenuItem('dashboard')
		break;
	default:
		break;
	}

	return;
}

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
