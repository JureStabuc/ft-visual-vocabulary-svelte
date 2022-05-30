<script>
  import config from './config'
  import { scaleOrdinal } from 'd3-scale'

  export let data

  const {
    bind,
    margin,
    width,
    height,
    title,
    colour
  } = config

  const allAxis = data[0].map(d => d[config.labelKey])
  const total = allAxis.length
  const radius = 1 * Math.min(width / 2, height / 2)

  const colourScale = scaleOrdinal()
    .range(colour)

  function levelFactor(j) {
    return config.factor * radius * ((j + 1) / config.levels)
  }

  function makeRadar(d) {
    let dataValues = []
    d.forEach((j, i) => {
      dataValues =[...dataValues,[
        width / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / config.maxValue) * config.factor * Math.sin(i * config.radians / total)),
        height / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / config.maxValue) * config.factor * Math.cos(i * config.radians / total)),
      ]]
    })
    dataValues = [...dataValues, [dataValues[0]]]
    let str = ''
    for (let pti = 0; pti < dataValues.length; pti++) {
      str = str + dataValues[pti][0] + ',' + dataValues[pti][1] + ' '
    }
    return str
  }
</script>

<style></style>

<div class='vis'>
  <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
    <g class='title'>
      <text x='0' y='20'>{title}</text>
    </g>
    <g transform='translate({margin.left}, {margin.top})'>
      {#each Array(config.levels) as e, j}
        {#each allAxis as d, i }
          <line
            transform='translate({width / 2 - levelFactor(j)}, {height / 2 - levelFactor(j)})'
            x1={levelFactor(j) * (1 - config.factor * Math.sin(i * config.radians / total))}
            x2={levelFactor(j) * (1 - config.factor * Math.sin((i + 1) * config.radians / total))}
            y1={levelFactor(j) * (1 - config.factor * Math.cos(i * config.radians / total))}
            y2={levelFactor(j) * (1 - config.factor * Math.cos((i + 1) * config.radians / total))}
            stroke='#aca7a7'
            stroke-dasharray='4,4'
            stroke-width='0.5'
          ></line>
        {/each}
      {/each}
      {#each allAxis as d, i}
        <g class='axis'>
          <line
            x1={width / 2}
            x2={width / 2 * (1 - config.factor * Math.sin(i * config.radians / total))}
            y1={height / 2}
            y2={height / 2 * (1 - config.factor * Math.cos(i * config.radians / total))}
            stroke='#aca7a7'
            stroke-dasharray='4,4'
            stroke-width='0.5'
          ></line>
          <text
            x={width / 2 * (1 - config.factorLegend * Math.sin(i * config.radians / total)) - 60 * Math.sin(i * config.radians / total)}
            y={height / 2 * (1 - Math.cos(i * config.radians / total)) - 20 * Math.cos(i * config.radians / total)}
            text-anchor='middle'
            dy='1.5em'
            transform='translate(0, -10)'
          >{d}</text>
        </g>
      {/each}
      {#each data as d, i}
          <polygon
            class='radar-chart-serie{i}'
            stroke-width={config.strokeWidth}
            stroke={colourScale(i)}
            fill={colourScale(i)}
            fill-opacity={config.opacityArea}
            points={makeRadar(d)}
          ></polygon>
      {/each}

    </g>
  </svg>
</div>
