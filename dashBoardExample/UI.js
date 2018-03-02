/**
 * @type {Array<Instance>}
 * @properties={typeid:35,uuid:"4989FB64-19FC-4255-9E1A-83C08D3CC0EB",variableType:-4}
 */
var instances = []

/**
 * @constructor
 * Create an instance of a form
 * @param {String} title
 * @param {String} f form name
 * @properties={typeid:24,uuid:"A031A8DA-356D-4B87-B83A-01BD1B38E1FF"}
 */
function Instance(title, f) {
	//get unique identifier for intance;
	this.name = application.getUUID().toString().split('-').join('');
	if (!application.createNewFormInstance(f, this.name)) throw 'failed to create instance';
	
	//create window for instance
	var w = application.createWindow(this.name, JSWindow.DIALOG);
	w.storeBounds = true;
	this.title = title;
	w.resizable = true;
	this.window = w;
	this.x = 0;
	this.y = 0;
	this.h = 0;
	this.w = 0;

	/** @type {Array<Instance>} */
	this.children = [];

	this.show = function() {
		this.window.show(this.name);
	}
	this.hide = function() {
		this.window.hide();
	}
	/**
	 * Setup a Layout for a form instance
	 * @param {Instance} i
	 */
	this.addChild = function(i) {
		this.children.push(i);
	}
}

/**
 * Setup a Layout for a form instance
 * @param {Instance} ins
 * @properties={typeid:24,uuid:"0712F209-7A94-4878-8817-6B9D6D3F546F"}
 */
function setupInstanceLayout(ins) {
	var els = forms[ins.name].elements;
	for (var i = 0; i < els.length; i++) {
		var e = els[i];
		// look for tabless panels in a layout and create dashboard base
		if (e.getElementType() == 'bootstrapcomponents-tablesspanel') {
			var c = new Instance('i' + i, 'widget_base');
			e.containedForm = c.name;
		}
	}
}

/**
 * Remove an instance
 * @param {String} name
 * @return {Boolean}
 * @properties={typeid:24,uuid:"EAA76C80-BDC5-432B-995B-54BB67252255"}
 */
function removeInstance(name) {
	for (var i = 0; i < instances.length; i++) {
		if (name == instances[i].name) {
			instances.splice(i, 1);
			return true;
		}
	}
	return false;
}

/**
 * @param {String} name
 * @return {Instance}
 * @properties={typeid:24,uuid:"AF239AB5-90AE-4188-BAAD-ECA830AF4FCA"}
 */
function getInstance(name) {
	if (!name) return null;
	for (var i = 0; i < instances.length; i++) {
		if (name == instances[i].name) {
			return instances[i];
		}
	}
	return null;
}

/**
 * Hide all active instances of an instance
 * @param {String} name name of instance
 * @properties={typeid:24,uuid:"C2C4B414-F25F-4407-9658-9572C27F7B70"}
 */
function hideChildInstances(name) {
	var ins = getInstance(name)
	if (!ins) return;
	var children = ins.children
	for (var i = 0; i < children.length; i++) {
		children[i].hide();
	}

}

/**
 * Hide all active instances of an instance
 * @param {String} name name of instance
 * @properties={typeid:24,uuid:"7FDE3D4A-7424-4371-965E-A4B8EB640199"}
 */
function showChildInstances(name) {
	var ins = getInstance(name)
	if (!ins) return;
	var children = ins.children
	for (var i = 0; i < children.length; i++) {
		children[i].show()
	}
}

/**
 * @param {String} parent
 * @param {String} child
 * @properties={typeid:24,uuid:"4AE20837-4827-4B43-8871-4BAC8932EFE3"}
 */
function removeChildInstance(parent, child) {
	var ins = getInstance(parent)
	if (!ins) return;
	var children = ins.children
	for (var i = 0; i < children.length; i++) {
		if (children[i].name == child) {
			children.splice(i, 1)
			return;
		}

	}
}

/**
 * @param parent
 * @param child
 *
 * @properties={typeid:24,uuid:"2CF952AA-A115-415B-9BA5-9921AFCCFB7B"}
 */
function getChildInstance(parent, child) {
	if (!getInstance(parent)) return null;

	var children = getInstance(parent).children
	for (var i = 0; i < children.length; i++) {
		if (children[i].name == child) {
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
 * @properties={typeid:24,uuid:"E09DAFA7-7B7B-48E4-AE14-8D104DA75B86"}
 */
function onSolutionOpen(arg, queryParams) {
	plugins.ngclientutils.setViewportMetaForMobileAwareSites(plugins.ngclientutils.VIEWPORT_MOBILE_DENY_ZOOM)
}
