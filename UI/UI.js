/**
 * @protected
 * @type {Array<Instance>}
 * @properties={typeid:35,uuid:"9C17C1CD-FF0C-4644-A5AD-B6B45356DECD",variableType:-4}
 */
var instances = []

/**
 * store an Instance in array
 * @param {Instance} i
 *
 * @properties={typeid:24,uuid:"49518761-EBA8-4D92-9BF4-2E1EBC7FD9E2"}
 */
function storeInstance(i) {
	instances.push(i)
}

/**
 * @return {Array<Instance>}
 * @properties={typeid:24,uuid:"7DDC9994-065B-4EB4-A0ED-54A6C708B42F"}
 */
function getAllInstances() {
	return instances;
}

/**
 * @constructor
 * Create an instance of a form
 * @param {String} title
 * @param {String} f form name
 * @param {Number} [tabIndex] for child Instances ordering
 * @properties={typeid:24,uuid:"5286903B-B989-4B32-9FF2-63FCC24CFF85"}
 */
function Instance(title, f, tabIndex) {

	/**
	 * @protected
	 */
	this.tabIndex = tabIndex

	/**
	 * Generate unique identifier for name
	 * @protected
	 */
	this.name = application.getUUID().toString().split('-').join('');

	/**
	 * @protected
	 */
	this.formName = f;

	if (!application.createNewFormInstance(f, this.name)) throw 'failed to create instance';

	//create window for instance
	var w = application.createWindow(this.name, JSWindow.DIALOG);
	w.storeBounds = true;
	w.resizable = true;
	w.title = title;
	w.setInitialBounds(0, 0, 300, 300);

	/**
	 * @protected
	 */
	this.title = title;

	/**
	 * instance window object
	 * @protected
	 */
	this.window = w;

	/** @type {Array<Instance>}
	 * @protected
	 * */
	this.children = [];

	/**
	 * @public
	 * @return {String}
	 */
	this.getName = function() {
		return this.name;
	}

	/**
	 * @public
	 * @return {Number}
	 */
	this.getTabIndex = function() {
		return this.tabIndex;
	}

	/**
	 * @public
	 * @return {String}
	 */
	this.getFormName = function() {
		return this.formName;
	}

	/**
	 * @public
	 * @return {String}
	 */
	this.getTitle = function() {
		return this.title;
	}

	/**
	 * @public
	 * @return {Array<Instance>}
	 */
	this.getChildren = function() {
		return this.children;
	}

	/**
	 * @public
	 * Show instance in a window
	 */
	this.show = function() {
		this.window.show(this.name);
	}
	/**
	 * @public
	 * Hide instance if displayed via window
	 */
	this.hide = function() {
		this.window.hide();
	}

	/**
	 * @public
	 * Add a child to instance
	 * @param {Instance} i
	 */
	this.addChild = function(i) {
		this.children.push(i);
	}

	/**
	 * @public
	 * Remove a child from instance
	 * @param {String} name name of instance
	 */
	this.removeChild = function(name) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i].getName() == name) {
				this.children.splice(i, 1);
			}
		}
	}
}

/**
 * Setup a Layout for a form instance
 * @param {Instance} ins
 * @return {elements}
 * @properties={typeid:24,uuid:"697E6426-39FB-40BF-A936-D910CB980D6C"}
 */
function setupInstanceLayout(ins) {
	var els = getInstanceLayout(ins);
	for (var i = 0; i < els.length; i++) {
		var e = els[i];
		// look for tabless panels in a layout and create dashboard base
		if (e.getElementType() == 'bootstrapcomponents-tablesspanel') {
			var c = new Instance('i' + i, 'widget_base');
			e.containedForm = c.getName();
		}
	}
	return els;
}

/**
 * Get a Layout for a form instance
 * @param {Instance} ins
 * @return {elements}
 * @properties={typeid:24,uuid:"6F823A42-17E7-4A8E-8B05-0DA5D621282D"}
 */
function getInstanceLayout(ins) {
	var els = forms[ins.getName()].elements;
	return els;
}

/**
 * Remove an instance
 * @param {String} name
 * @return {Boolean}
 * @properties={typeid:24,uuid:"274B8D5C-3D85-4016-A0FA-973C2D11B5AD"}
 */
function removeInstance(name) {
	for (var i = 0; i < instances.length; i++) {
		if (name == instances[i].getName()) {
			instances.splice(i, 1);
			return true;
		}
	}
	return false;
}

/**
 * @param {String} name
 * @return {Instance}
 * @properties={typeid:24,uuid:"543B8945-FFC5-4033-A702-C3DEC1BE4D75"}
 */
function getInstance(name) {
	if (!name) return null;
	for (var i = 0; i < instances.length; i++) {
		if (name == instances[i].getName()) {
			return instances[i];
		}
	}
	return null;
}

/**
 * Hide all active instances of an instance
 * @param {String} name name of instance
 * @properties={typeid:24,uuid:"B7659219-CC48-4BF3-853C-EC96C7752772"}
 */
function hideChildInstances(name) {
	var ins = getInstance(name)
	if (!ins) return;
	var children = ins.getChildren()
	for (var i = 0; i < children.length; i++) {
		children[i].hide();
	}

}

/**
 * Hide all active instances of an instance
 * @param {String} name name of instance
 * @properties={typeid:24,uuid:"D57A390C-181C-4CD5-83DD-A5016342352B"}
 */
function showChildInstances(name) {
	var ins = getInstance(name)
	if (!ins) return;
	var children = ins.getChildren()
	for (var i = 0; i < children.length; i++) {
		children[i].show()
	}
}

/**
 * @param {String} parent
 * @param {String} child
 * @properties={typeid:24,uuid:"E3890E58-F28F-4B40-B903-F45FBB07F69A"}
 */
function removeChildInstance(parent, child) {
	var ins = getInstance(parent)
	if (!ins) return;
	var children = ins.getChildren()
	for (var i = 0; i < children.length; i++) {
		if (children[i].getName() == child) {
			application.output(children[i].getName() + '|' + child)
			children.splice(i, 1);
			return;
		}

	}
}

/**
 * @param parent
 * @param child
 *
 * @properties={typeid:24,uuid:"86D635AB-194A-4DA3-8DED-F3E538277D82"}
 */
function getChildInstance(parent, child) {
	if (!getInstance(parent)) return null;

	var children = getInstance(parent).getChildren()
	for (var i = 0; i < children.length; i++) {
		if (children[i].getName() == child) {
			return children[i];
		}
	}
	return null;
}

/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>>} queryParams all query parameters of the deeplink url with which the Client was started
 *
 * @properties={typeid:24,uuid:"4A7F84EC-E40D-4839-A241-3726A96FC2EC"}
 */
function onSolutionOpen(arg, queryParams) {
	plugins.ngclientutils.setViewportMetaForMobileAwareSites(plugins.ngclientutils.VIEWPORT_MOBILE_DENY_ZOOM)
}
