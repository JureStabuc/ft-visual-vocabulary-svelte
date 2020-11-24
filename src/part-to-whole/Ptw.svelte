<script>
  import Pie from './pie/Pie.svelte'
  import dataPie from './pie/data.js'
  import Donut from './donut/Donut.svelte'
  import dataDonut from './donut/data.js'
  import StackedBar from './stacked-bar/Stacked.svelte'
  import StackedBarData from './stacked-bar/data.js'
</script>

<style>

</style>

<div class='part-to-whole-page-container'>
  <div class='pie'><Pie data={dataPie} /></div>
  <div class='donut'><Donut data={dataDonut} /></div>
  <div class='stacked'><StackedBar data={StackedBarData} /></div>
</div>
