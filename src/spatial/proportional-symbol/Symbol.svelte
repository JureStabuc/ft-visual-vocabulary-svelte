<script>
  import { afterUpdate } from 'svelte'
  import { select } from 'd3-selection'
  import { geoMercator, geoPath } from 'd3-geo'
  import { feature } from 'topojson'
  import geo from './boundaries.js'
  import { ascending, extent } from 'd3-array'
  import { scaleSqrt } from 'd3-scale'
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
    legendFormat,
    circleFill
  } = config

  const land = feature(geo, geo.objects.boundaries)

  const projection = geoMercator()
    .center(mapCenter)
    .fitSize([width - margin.left - margin.right, height - margin.top - margin.bottom], land);

  const path = geoPath().projection(projection)

  const z = scaleSqrt()
    .domain(extent(data, d => +d.value))
    .range([0, 40])

  let values
  let breaksValues

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

  // setup the legend
  const legendScale = scaleSqrt()
    .domain(extent(data, d => +d.value))
    .range([0, 40])

  const valuesToShow = [5, 10, 20]
  const xCircle = 70
  const xLabel = 150
  const yCircle = 170
</script>

<svg width={width} height={height}>
  <g class='title'>
    <text x='0' y='20'>{title}</text>
  </g>
  <g class='legend' transform='translate(0, 40)'></g>
  <g transform='translate({margin.left}, {margin.top})'>
    {#each land.features as d, i}
      <path fill='#efefee' stroke="#454545" stroke-width="1" d={path(d)} class="border" />
    {/each}
    {#each land.features as d, i}
      <circle cx={path.centroid(d)[0]} cy={path.centroid(d)[1]} r={z(d.properties.value)} fill={config.circleFill} opacity='0.5' stroke='#454545' stroke-width="1"></circle>
    {/each}
  </g>
  <g>
    {#each valuesToShow as d, i}
      <circle cx={xCircle} cy={yCircle - legendScale(d)} r={legendScale(d)} fill='none' stroke='#454545'></circle>
      <line x1={xCircle + legendScale(d)} x2={xLabel} y1={yCircle - legendScale(d)} y2={yCircle - legendScale(d)} stroke='#454545' stroke-dasharray='2,2'></line>
      <text x={xLabel} y={yCircle - legendScale(d)} alignment-baseline='midddle'>{d}</text>
    {/each}
  </g>
</svg>
