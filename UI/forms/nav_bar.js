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
 * @private
 *
 * @properties={typeid:24,uuid:"0C2C0EBD-FDE4-445B-ABA6-CE1930A264F6"}
 * @AllowToRunInFind
 */
function onAction(event) {
	forms.main.openMenu(event);
	elements.other.requestFocus();
}
