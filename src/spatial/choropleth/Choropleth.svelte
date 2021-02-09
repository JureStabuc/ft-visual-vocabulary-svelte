<script>
  import { afterUpdate } from 'svelte'
  import { select } from 'd3-selection'
  import { geoAzimuthalEqualArea, geoPath } from 'd3-geo'
  import { feature } from 'topojson'
  import geo from './boundaries.js'
  import { min, max, ascending } from 'd3-array'
  import { scaleLinear } from 'd3-scale'
  import { format } from 'd3-format'
  import { equalIntervalBreaks, ckmeans } from 'simple-statistics'
  import { legendColor, legendSize } from 'd3-svg-legend'
  import data from './data'
  import config from './config'

  const {
    bind,
    margin,
    width,
    height,
    color,
    mapCenter,
    mapSize,
    boundariesIdColumn,
    breaks,
    numberBreaks,
    title,
    legendDecimals,
    legendFormat
  } = config

  const land = feature(geo, geo.objects.boundaries)

  const projection = geoAzimuthalEqualArea()
    .center(mapCenter)
    .fitSize([width - margin.left - margin.right, height - margin.top - margin.bottom], land);

  const path = geoPath().projection(projection)

  let values
  let breaksValues

  if (breaks === 'jenks' || breaks === 'equal') {
    values = data.map(d => +d.value).filter(d => !isNaN(d)).sort(ascending)
  }

  if (breaks === 'jenks') {
    breaksValues = []

    ckmeans(values, numberBreaks).map((cluster, i) => {
      if (i < numberBreaks - 1) {
        breaksValues.push(cluster[0])
      }
      else {
        breaksValues.push(cluster[0])
				breaksValues.push(cluster[cluster.length-1]);
      }
    })
  }
  else if (breaks === 'equal') {
    breaksValues = equalIntervalBreaks(values, numberBreaks)
  }
  else { breaksValues =  breaks }

  const colorScale = scaleLinear()
    .range(color)
    .domain(breaksValues.slice(1))

  for (let i = 0; i < data.length; i++) {
    const area = data[i].id
    const val = +data[i].value

    for (let j = 0; i < land.features.length; j++) {
        const areaJson = land.features[j].properties[boundariesIdColumn]
        if (area === areaJson) {
          land.features[j].properties.value = val
          break
        }
    }
  }

  const legend = legendColor()
    .shapeWidth(40)
    .cells(breaksValues.slice(1))
    .orient('horizontal')
    .scale(colorScale)
    .labelFormat(format(legendFormat))

  // call legend
  afterUpdate(() => {
    select(bind)
      .select('.legend')
      .call(legend)
  })
</script>

<svg width={width} height={height}>
  <g class='title'>
    <text x='0' y='20'>{title}</text>
  </g>
  <g class='legend' transform='translate(0, 40)'></g>
  <g transform='translate({margin.left}, {margin.top})'>
    {#each land.features as d, i}
      <path fill={colorScale(d.properties.value)} stroke="#454545" stroke-width="1" d={path(d)} class="border" />
    {/each}
  </g>
</svg>
