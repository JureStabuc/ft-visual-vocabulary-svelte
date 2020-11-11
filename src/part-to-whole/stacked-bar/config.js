export default
  {
    bind: '.stacked',
  	margin: {
  		top: 150,
  		right: 20,
  		bottom: 20,
  		left: 80
  	},
  	width: 600,
  	height: 300,
    keys: ['val1', 'val2', 'val3'],
    colour: ['#5e6faf','#f96258','#c7c4c4'],
    title: 'US 2020 presidential election - % vote',
    legendLabels: ['Joe Biden', 'Donald Trump', 'Other candidates'],
    percentage: true,
    xDomain: 'auto-zero-max',
    xTicks: 8,
    tickFormat: '.0%'
  }
