/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"244E4F13-448E-4C74-B990-5420123C9376"}
 * @SuppressWarnings(wrongparameters)
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var tmrw = new Date();
		tmrw.setDate(tmrw.getDate() + 1);
		var options = {
			eventSources: [{
				events: [{
					title: "Meeting with Client",
					start: new Date(),
					allDay: true
				}],
				color: 'black'
			}, {
				events: [{
					title: "Dinner Event",
					start: tmrw,
					allDay: true
				}],
				color: 'red'
			}],
			selectable: true,
			editable: true,
			defaultView: 'listWeek',
			showCurrentTimeline: true,
			header: {
				left: 'prev,next today myCustomButton',
				center: 'My Calendar',
				right: 'month,agendaWeek,listWeek,agendaDay'
			}
		}

		elements.calendar.fullCalendar(options);
	}
}
