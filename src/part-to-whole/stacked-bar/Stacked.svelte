<script>
  import config from './config'
  import { scaleLinear, scaleBand, scaleOrdinal, stack, axisBottom, axisLeft, sum, max, format } from 'd3'
  import { legendColor } from 'd3-svg-legend'
  import { afterUpdate } from 'svelte'
  import { select } from 'd3-selection'

  export let data

  const {
    bind,
    margin,
    width,
    height,
    keys,
    colour,
    title,
    legendLabels,
    percentage,
    xDomain,
    xTicks,
    tickFormat

  } = config

  data.forEach((d) => {
    let sum = 0
    for (const column in data[0]) {
      if (column === 'group' || column === 'total') continue
      d[column] = +d[column]
      sum += d[column]
      d.total = sum
    }
  })

  //  sort data
  data.sort((a, b) => b.total - a.total)

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const x = scaleLinear()
    .range([0, chartWidth])

  const y = scaleBand()
    .range([0, chartHeight])
    .padding(0.1)

  const z = scaleOrdinal(colour)

  // make the axes
  const xAxis = axisBottom()
    .scale(x)
    .ticks(xTicks)
    .tickFormat(format(tickFormat))

  const yAxis = axisLeft()
    .scale(y)

  const legendScale = scaleOrdinal()
    .domain(legendLabels)
    .range(colour)

  const legend = legendColor()
    .shapeWidth(30)
    .shapePadding(10)
    .orient('vertical')
    .labelWrap(200)
    .scale(legendScale)

  // call  axes & legend
  afterUpdate(() => {
    // call the axes rather then doing by hand in html as some examples do
    select(bind)
      .select('.x.axis')
      .call(xAxis)
    select(bind)
      .select('.y.axis')
      .call(yAxis)

    select(bind)
      .select('.legend')
      .call(legend)
  })

  const series = stack().keys(keys)(data)

  y.domain(series[0].map(d => d.data.group))

  if (percentage) {
    x.domain([0, 1])
  } else {
    if (xDomain === 'auto-zero-max') {
      x.domain([0, max(data, d => d.total)])
    } else {
      x.domain(xDomain)
    }
  }
</script>

<style>
</style>

<div class="vis">
  <svg width={width} height={height}>
    <g class='title'>
      <text x='0' y='20'>{title}</text>
    </g>
    <g class='legend' transform='translate(0, 40)'></g>

    <g transform='translate({margin.left}, {margin.top})'>
      {#each series as d, i}
        <g class='layer' fill={z(i)}>
          {#each d as e, j}
            <rect x={x(e[0])} y={y(e.data.group)} width={x(e[1]) - x(e[0])} height={y.bandwidth()}></rect>
          {/each}
        </g>
      {/each}
      <g>
        <g class='x axis' ref='xAxis' transform='translate(0, {chartHeight})' />
        <g class='y axis' ref='yAxis' transform='translate(0, 0)'>
        </g>
      </g>
    </g>

  </svg>

</div>
