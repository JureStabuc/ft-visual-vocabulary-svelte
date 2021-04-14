<script>
  import config from './config'

  import {
    scaleLinear,
    axisBottom,
    axisLeft,
    select,
    max,
  } from 'd3'
  import {
    afterUpdate
  } from 'svelte'

  export let data

  const {
    bind,
    margin,
    width,
    height,
    colour,
    radius,
    title,
    yLabel,
    xLabel,
    textFill,
    labelFormat
  } = config

  data.forEach(d => {
    d.price = +d.price
    d.area = +d.area
  })

  // scales
  const x = scaleLinear()
    .range([ 0, width - margin.left - margin.right])
    .domain([0, max(data, d => d.area)])

  const y = scaleLinear()
    .range([ height - margin.top - margin.bottom, 0])
    .domain([0, max(data, d => d.price)])

  // make the axes
  const xAxis = axisBottom()
    .scale(x)

  const yAxis = axisLeft()
    .scale(y)

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

<svg width={width} height={height}>
<g class='title'>
  <text x='0' y='20'>{title}</text>
</g>
<g transform='translate({margin.left}, {margin.top})'>
  <g>
    {#each data as d, i}
      <circle cx='{x(d.area)}' cy='{y(d.price)}' r='{radius}' fill='{colour}'></circle>
    {/each}
  </g>
  <g>
    <text x='-22' y='-10' font-size='10px' fill='#333' text-anchor='start'>{yLabel}</text>
    <text x='{width - margin.right - margin.left}' y='{height - margin.bottom - margin.top}' dy='3em' font-size='10px' fill='#333' text-anchor='end'>{xLabel}</text>
    <g class='x axis' ref='xAxis' transform='translate(0, {height - margin.bottom - margin.top})' />
    <g class='y axis' ref='yAxis' transform='translate(0, 0)'></g>
  </g>
</g>
</svg>
