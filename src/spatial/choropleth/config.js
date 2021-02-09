export default {
  bind: '.choropleth',
  margin: {
    top: 50,
    right: 150,
    bottom: 20,
    left: 25
  },
  width: 1000,
  height: 1000,
  color: ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494'],
  mapCenter: [-1.9, 52.5],
  mapSize: [500, 500],
  boundariesIdColumn: 'pcon16cd',
  breaks: 'jenks',
  numberBreaks: 5,
  title: 'Sightings of Unicorns',
  legendDecimals: 0,
  legendFormat: ',.2s'
}
