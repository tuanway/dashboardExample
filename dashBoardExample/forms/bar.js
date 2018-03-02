/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D0ABE407-093C-4AFA-9B66-F73B741A166E"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var data = {
			type: 'bar',
			data: {
				labels: ["Red",
				"Green",
				"Yellow"],
				datasets: [{
					data: [300, 50, 100],
					backgroundColor: ["#F7464A",
					"#46BFBD",
					"#FDB45C"],
					hoverBackgroundColor: ["#FF5A5E",
					"#5AD3D1",
					"#FFC870"]
				}]
			}
		}
		//The options object
		var options = {
			animation: { numSteps: 1, duration: 2000 },
			legend: {
				display: false
			},
			responsive: false,
			scales: {
				xAxes: [{ stacked: true }],
				yAxes: [{ stacked: true }]
			}
		}

		//Initialize the chart by using setData
		elements.chart.setData(data);

		//call the api to set the options
		elements.chart.setOptions(options);
	}
}
