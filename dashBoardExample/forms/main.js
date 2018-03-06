/**
 * @properties={typeid:24,uuid:"BF2E27A5-34C7-4F0C-A9EB-000CFBF3540B"}
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
				iconStyleClass: 'glyphicon glyphicon-th',
				text: "Layout Type (15)",
				data: { type: 'dashboard', formName: 'layout_15' }
			}, {
				id: 'layout_21',
				iconStyleClass: 'glyphicon glyphicon-th-large',
				text: "Layout Type (2x1)",
				data: { type: 'dashboard', formName: 'layout_21' }
			}, {
				id: 'layout_1',
				iconStyleClass: 'glyphicon glyphicon-unchecked',
				text: "Layout Type (1)",
				data: { type: 'dashboard', formName: 'layout_1' }
			}]
		},
		]
	}];

	//create a menu for instances/children if we have them
	var inst = scopes.UI.getAllInstances();
	if (inst.length) {
		menu.push({
			isDivider: true
		})

		menu.push({
			text: 'Instances:'
		})

		for (var i = 0; i < inst.length; i++) {
			/** @type {servoyextra-sidenav.MenuItem} */
			var menuItem = {
				id: inst[i].getName(),
				formName: inst[i].getName(),
				text: inst[i].getTitle(),
				data: { type: 'instance', text: inst[i].getTitle(), formName: inst[i].getName() },
				menuItems: []
			}

			//			//if an instance has children - add them to a deeper level
			//			var ch = inst[i].getChildren();
			//			if (ch.length) {
			//				var chMenu = {
			//					id: inst[i].getName() + '_children',
			//					iconStyleClass: '',
			//					text: "Children",
			//					data: { },
			//					menuItems: []
			//				}
			//				for (var j = 0; j < ch.length; j++) {
			//					chMenu.menuItems.push({
			//						id: ch[j].getName(),
			//						formName: ch[j].getName(),
			//						text: ch[j].getTitle(),
			//						data: { type: 'children' },
			//						menuItems: [{
			//							id: ch[j].getName() + '_remove',
			//							iconStyleClass: 'glyphicon glyphicon-remove',
			//							text: "Remove",
			//							data: { type: 'remove_child', formName: ch[j].getName(), parentFormName: inst[i].getName(), tabIndex: ch[j].getTabIndex() }
			//						}]
			//					})
			//				}
			//				menuItem.menuItems.push(chMenu)
			//			}

			//add removal option for instance
			menuItem.menuItems.push({
				id: inst[i].getName() + '_configure',
				iconStyleClass: 'glyphicon glyphicon-cog',
				text: "Configure",
				data: { },
				menuItems: [{
					id: inst[i].getName() + '_remove',
					iconStyleClass: 'glyphicon glyphicon-remove',
					text: "Remove",
					data: { type: 'remove_instance', formName: inst[i].getName() }
				}]
			}
			)

			menu.push(menuItem)
		}
	}
	return _super.initMenu.apply(this, arguments);

}

/**
 * @param {String} menuItemId
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DB6094E1-EEFA-4E3A-8B78-8C4F47F4F7F3"}
 */
function onMenuItemSelected(menuItemId, event) {
	var item = elements.sidenav.getMenuItem(menuItemId);
	var form = forms[item.data['formName']];
	if (!form) return;

	switch (item.data['type']) {
	case 'instance':
		//show the instance
		scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(scopes.UI.getInstance(item.data['formName']).getName(), item.text, item.text));
		break;
	case 'dashboard':
		//create a new instance of a dashboard
		var i = new scopes.UI.Instance(item.text, item.data['formName']);
		scopes.UI.storeInstance(i);
		//setup a layout
		scopes.UI.setupInstanceLayout(i);
		//update side navigation
		initMenu();
		//finally navigate to the instance
		scopes.svyNavigation.open(new scopes.svyNavigation.NavigationItem(i.getName(), item.text, item.text));
		break;
	case 'remove_instance':
		var s = plugins.dialogs.showQuestionDialog('INFO', 'Remove Instance?', 'Yes', 'No')
		if (!s || s == 'No') {
			return;
		}
		scopes.UI.removeInstance(item.data['formName'])
		//update side navigation
		initMenu();
		elements.sidenav.containedForm = forms.base;
		selectMenuItem('dashboard')
		break;

	case 'remove_child':
		s = plugins.dialogs.showQuestionDialog('INFO', 'Remove Child?', 'Yes', 'No')
		if (!s || s == 'No') {
			return;
		}
		scopes.UI.removeChildInstance(item.data['parentFormName'], item.data['formName']);
		//remove instance from actual form
		var layout = scopes.UI.getInstanceLayout(scopes.UI.getInstance(item.data['parentFormName']));
		for (var k = 0; k < layout.length; k++) {
			if (layout[k].getName() == 't' + item.data['tabIndex']) {
				forms[layout[k].containedForm].elements.tabless.removeAllTabs();
				forms[layout[k].containedForm].elements.picker_btn.visible = true;
			}
		}
		//update side navigation
		initMenu();
		break;
	default:
		break;
	}

}
