<script>
  import Column from './column/Column.svelte'
  import columnData from './column/data.js'
  import OrderedBar from './ordered_bar/Bar.svelte'
  import orderedData from './ordered_bar/data.js'
</script>

<style>

</style>

<div class='ranking-page-container'>
  <div class='column'><Column data={columnData} /></div>
  <div class='ordered-bar'><OrderedBar data={orderedData} /></div>
</div>
