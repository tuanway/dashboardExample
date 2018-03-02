/**
 * @type {Array<servoyextra-sidenav.MenuItem>}
 *
 * @properties={typeid:35,uuid:"71E48D5C-E930-4F80-B588-F2B479E5C014",variableType:-4}
 */
var menu;

/**
 * Initialize the menu
 * @properties={typeid:24,uuid:"BFB97074-8F48-46E8-BFE2-97890A3C0E4A"}
 * @SuppressWarnings(wrongparameters)
 */
function initMenu() {
	menu = [{
		id: 'dashboard',
		text: "Dashboard",
		data: { },
		menuItems: [{
			id: 'generate_layout',
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
 * @properties={typeid:24,uuid:"9450E25C-BB5E-4EBD-8EBD-48376D8EBCA3"}
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
		application.output('remove instances')
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
 * @properties={typeid:24,uuid:"9C14D1D4-E57F-4A61-BD8E-1E0920BF19AD"}
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
 * @properties={typeid:24,uuid:"D8FEE560-EF1F-49BF-A8DE-10DC21985C9A"}
 */
function onLoad(event) {
	initMenu();
	scopes.svyNavigation.addNavigationListener(onNavigation);
}

/**
 * @private
 * @param {scopes.svyNavigation.NavigationEvent} event
 * @properties={typeid:24,uuid:"2394C6EE-E29A-4CFE-B350-2B1D22AC5CB2"}
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
 * @properties={typeid:24,uuid:"733B5B9A-5594-41F5-9933-2C244A102075"}
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
 * @properties={typeid:24,uuid:"1C63C36C-D7D2-41E0-837B-ED76ED29EF70"}
 */
function openMenu(event) {
	if (elements.sidenav.open) {
		elements.sidenav.open = false;
	} else {
		elements.sidenav.open = true;
	}
}
