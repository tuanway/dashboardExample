/**
 * @param {Number} dataset_index
 * @param {Number} index
 * @param {string} label
 * @param {Number} value
 *
 * @properties={typeid:24,uuid:"B0346BA9-689B-4E92-A248-867F3B408815"}
 */
function onClick(dataset_index, index, label, value) {
	var p = scopes.UI.getInstance(scopes.svyNavigation.getCurrentItem().getFormName())
	var c = scopes.UI.getChildInstance(scopes.svyNavigation.getCurrentItem().getFormName(), controller.getName())
	var i = new scopes.UI.Instance(p.getTitle() + ' - ' + c.getTitle(), controller.getName())
	i.show();
}
