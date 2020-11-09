<script>
  import config from './config'
  import { arc, pie, format, scaleOrdinal } from 'd3'
  import { legendColor } from 'd3-svg-legend'
  import { afterUpdate } from 'svelte'
  import { select } from 'd3-selection'

  export let data

  const {
    bind,
    margin,
    width,
    height,
    colour,
    title,
    sortData,
    yLabel,
    textFill,
    labelFormat
  } = config

  const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2

  const arcGen = arc()
    .innerRadius(0)
    .outerRadius(radius - 1)

  const pieGen = pie()
    .value(d => d.value)

  const arcs = pieGen(data)

  const arcLabel = arc()
    .innerRadius(radius * 0.7)
    .outerRadius(radius * 0.7)

  const legendScale = scaleOrdinal()
    .domain(data.map(d => d.group))
    .range(colour)

  const legend = legendColor()
    .shapeWidth(30)
    .shapePadding(10)
    .orient('vertical')
    .labelWrap(200)
    .scale(legendScale)

  // call legend
  afterUpdate(() => {
    select(bind)
      .select('.legend')
      .call(legend)
  })


</script>

<style>
.title {
  font-weight: 600;
}

.data-label {
  fill: #fafafa;
  font-weight: 600;
}
</style>

<div class="vis">
  <svg width={width} height={height}>
    <g class='title'>
      <text x='0' y='20'>{title}</text>
    </g>
    <g class='legend' transform='translate(0, 40)'></g>
    <g transform='translate({radius + margin.left}, {radius + margin.top})'>
      {#each arcs as d, i}
        <path d={arcGen(d)} fill={colour[i]}/>
        <g transform='translate({arcLabel.centroid(d)})' fill={textFill}>
        {#if d.data.value > 0.1}
          <text class='data-label' text-anchor='middle' y='1.33em'>{format(labelFormat)(d.data.value)}</text>
        {/if}
        </g>
      {/each}
    </g>
  </svg>
</div>
