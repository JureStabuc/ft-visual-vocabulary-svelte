<script>
  import config from './config'
  import { scaleLinear, scaleBand} from 'd3-scale'
  import { axisBottom, axisLeft } from 'd3-axis'
  import { max, descending } from 'd3-array'
  import { select } from 'd3-selection'
  import { afterUpdate } from 'svelte'

  export let data

  const {
    bind,
    margin,
    width,
    height,
    title,
    sortData,
    yLabel,
    radius,
    circleFill
  } = config

  data.forEach(d => {
    d.val = +d.val
  })

  // sort data
  if (sortData) {
      data.sort(function(a, b) {
      return descending(a.val, b.val)
    })
  }

  // make the scales
  const y = scaleLinear()
    .range([height - margin.top - margin.bottom, 0])
    .domain([0, max(data, d => +d.val)])
    .nice()

  const x = scaleBand()
    .range([0, width - margin.left - margin.right])
    .domain(data.map(d => d.Country))
    .padding(1)

  // make the axes
  const xAxis = axisBottom()
    .scale(x)

  const yAxis = axisLeft()
    .scale(y)
    // .ticks(5)

  // call the axes rather then doing by hand in html as some examples do
  afterUpdate(() => {
    select(bind)
      .select('.x.axis')
      .call(xAxis)
    select(bind)
      .select('.y.axis')
      .call(yAxis)
  })
</script>

<style></style>

<div class='vis'>
  <svg width={width} height={height}>
    <g class='title'>
      <text x='0' y='20'>{title}</text>
    </g>
    <g transform='translate({margin.left}, {margin.top})'>
      <g>
        <g class='x axis' ref='xAxis' transform='translate(0, {height - margin.bottom - margin.top})' />
        <g class='y axis' ref='yAxis' transform='translate(0, 0)'>
          <text x='0' y='0' dy='-.65em' font-size='10px' fill='#333'>{yLabel}</text>
        </g>
      </g>
      <g class='lines'>
        {#each data as d, i}
          <line x1={x(d.Country)} x2={x(d.Country)} y1={y(d.val)} y2={y(0)} stroke='#454545'></line>
          <circle cx={x(d.Country)} cy={y(d.val)} r={radius} fill={circleFill}></circle>
        {/each}
      </g>
    </g>
  </svg>
</div>
