/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4FA0D574-F17A-4F2A-BD0C-4FD718109E16"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var data = {
			type: 'line',
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [{
					label: "",
					fill: true,
					backgroundColor: "rgba(70,191,189, 0.2)",
					borderColor: "#46BFBD",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(220,220,220,0.1)",
					pointBackgroundColor: "#FDB45C",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(220,220,220,0.5)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					tension: 0.1,
					// The actual data
					data: [65, 59, 80, 81, 56, 55, 40]

				}]
			}
		}
		//The options object
		var options = {
			title: {
				display: true,
				text: 'A Line Chart'
			},
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
