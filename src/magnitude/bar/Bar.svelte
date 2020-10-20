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
    barFill,
    title,
    sortData,
    xLabel
  } = config

  // sort data
  if (sortData) {
      data.sort(function(a, b) {
      return descending(a.val, b.val)
    })
  }

  // make the scales
  const x = scaleLinear()
    .range([0, width - margin.left - margin.right])
    .domain([0, max(data, d => +d.val)])
    .nice()

  const y = scaleBand()
    .range([0, height - margin.top - margin.bottom])
    .domain(data.map(d => d.label))
    .padding(0.1)

  // make the axes
  const xAxis = axisBottom()
    .scale(x)
    .ticks(5)

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
        <g class='x axis' ref='xAxis' transform='translate(0, {height - margin.bottom - margin.top})'>
          <text x={width - margin.left - margin.right} y='25' dy='.33em' font-size='10px' fill='#333'>{xLabel}</text>
        </g>
        <g class='y axis' ref='yAxis' transform='translate(0, 0)' />
      </g>
      <g class='bars'>
        {#each data as d, i}
        <rect
          style="--bar-fill: {barFill}"
          x='{x(Math.min(0, d.val))}'
          y='{y(d.label)}'
          width='{Math.abs(x(d.val) - x(0))}'
          height='{y.bandwidth()}'>
        </rect>
        {/each}
      </g>
    </g>
  </svg>
</div>
