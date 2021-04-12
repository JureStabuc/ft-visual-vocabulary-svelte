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
    mapCenter,
    boundariesIdColumn,
    title,
  } = config

  const land = feature(geo, geo.objects.boundaries)

  const projection = geoMercator()
    .center(mapCenter)
    .fitSize([width - margin.left - margin.right, height - margin.top - margin.bottom], land);

  const path = geoPath().projection(projection)
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
  </g>
  <g transform='translate({margin.left}, {margin.top})'>
    {#each data as d}
      <path d={path(d)} fill='none' stroke='orange' stroke-width='2'></path>
    {/each}
  </g>
</svg>
