<script>
  import {
    line,
    scaleLinear,
    scaleTime,
    curveLinear,
    timeParse,
    timeFormat,
    axisBottom,
    axisLeft,
    extent,
    select,
    max,
  } from 'd3'
  import {
    entries
  } from 'd3-collection'
  import {
    afterUpdate
  } from 'svelte'
  import config from './config'
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
    yLabel,
    lineColour,
    lineLabels,
    lineLabelsY
  } = config

  data.forEach((d) => {
    d.date = timeParse('%Y')(d.date)
  })

  // scales
  // x min & max
  const extentX = extent(data, d => d.date)
  // x scale
  const x = scaleTime()
    .domain(extentX)
    .range([0, width - margin.left - margin.right])

  // y scale
  const y = scaleLinear()
    .range(([height - margin.top - margin.bottom, 0]))

  // make the axes
  const xAxis = axisBottom()
    .scale(x)
    .tickFormat(timeFormat(dateFormat))

  const yAxis = axisLeft()
    .scale(y)
    .ticks(10)

  let counter

  const path = line()
    .defined( d => d.amt || d.amt !== '0')
    .curve(curveLinear)
    .x(d => x(d.date))
    .y(d => y(d.amt))

  // parse data into columns
  const lines = {}
  for (var column in data[0]) {
    if (column == 'date') continue;
    lines[column] = data.map(d => ({
        'date': d.date,
        'amt': d[column]
      })
    )
  }

  const yDomain = [
    0,
    max(entries(lines), c => max(c.value, v => {
      const n = v.amt
      return Math.ceil(n)
    }))
  ]

  y.domain(yDomain)

  // overwrite blanks with the last known point
  const keys = Object.keys(lines)

  for(const key of keys) {
    lines[key].forEach((d, i) => {
      (d.amt !== 'null' ? counter = i : (d.date = lines[key][counter].date, d.amt = lines[key][counter].amt))
    })
  }

  const linesData = entries(lines)

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
  .title {
    font-weight: 600;
  }

  .line-labels {
    font-size: 14px;
  }
</style>

<svg width={width} height={height}>
  <g class='title'>
    <text x='0' y='20'>{title}</text>
  </g>
  <g transform='translate({margin.left}, {margin.top})'>
  {#each linesData as d, i}
    <path d='{path(d.value)}' fill='none' stroke='{lineColour[i]}' stroke-width='3' />
    <text class='line-labels' x='{x(d.value[d.value.length-1].date)}' y='{y(lineLabelsY[i])}' fill='{lineColour[i]}'>{lineLabels[i]}</text>
  {/each}
    <g>
      <text x='-22' y='-15' font-size='10px' fill='#333' text-anchor='start'>{yLabel}</text>
      <g class='x axis' ref='xAxis' transform='translate(0, {height - margin.bottom - margin.top})' />
      <g class='y axis' ref='yAxis' transform='translate(0, 0)'>
      </g>
    </g>
</svg>
