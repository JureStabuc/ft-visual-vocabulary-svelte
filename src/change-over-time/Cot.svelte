<script>
  import Column from './column/Column.svelte'
  import columnData from './column/data.js'
  import Line from './line/Line.svelte'
  import lineData from './line/data.js'
</script>
<style>
</style>

<div class='change-time-container'>
  <div class='column'><Column data={columnData} /></div>
  <div class='line'><Line data={lineData} /></div>
</div>
