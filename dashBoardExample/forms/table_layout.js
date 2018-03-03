
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public 
 *
 * @properties={typeid:24,uuid:"EFC2D52C-9D0D-4C21-BA2E-AB7C40D0CB05"}
 */
function onAction$Header(event) {
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName())
	var c = scopes.UI.getChildInstance(scopes.svyNavigation.getCurrentItem().getFormName(), controller.getName())
	var i = new scopes.UI.Instance(p.getTitle() + ' - ' + c.getTitle(), controller.getName())
	i.show();
}
