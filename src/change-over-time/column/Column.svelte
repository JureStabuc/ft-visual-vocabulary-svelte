<script>
  import config from './config'
  import { timeParse, timeFormat } from 'd3-time-format'
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
    timeParseFormat,
    dateFormat,
    barFill,
    title,
    sortData,
    yLabel
  } = config

  // parse date
  data.forEach(function(d) {
    d.date = timeParse(timeParseFormat)(d.date)
  })

  // make the scales
  const y = scaleLinear()
    .range([height - margin.top - margin.bottom, 0])
    .domain([0, max(data, d => +d.val)])
    .nice()

  const x = scaleBand()
    .range([0, width - margin.left - margin.right])
    .domain(data.map(d => d.date))
    .padding(0.1)

  // make the axes
  const xAxis = axisBottom()
    .scale(x)
    .tickFormat(timeFormat(dateFormat))

  const yAxis = axisLeft()
    .scale(y)
    .ticks(10)

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

<style>
  .bars rect {
    fill: var(--bar-fill);
    opacity: 0.65;
  }

  .title {
    font-weight: 600;
  }
</style>

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
      <g class='bars'>
        {#each data as d, i}
        <rect
          style="--bar-fill: {barFill}"
          x='{x(d.date)}'
          y='{y(Math.max(0, d.val))}'
          width='{x.bandwidth()}'
          height='{Math.abs(y(d.val) - y(0))}'>
        </rect>
        {/each}
      </g>
    </g>
  </svg>
</div>
