/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"02BB8812-293D-4762-AAE0-D3FE820C6B04"}
 */
var search = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BB2713FD-F287-4E63-B8A1-D3766588DA44"}
 */
function onMenuClick(event) {
	forms.nav.openMenu(event);
	elements.other.requestFocus();
}
