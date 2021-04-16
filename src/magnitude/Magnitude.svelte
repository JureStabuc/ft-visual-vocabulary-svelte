<script>
  import Bar from './bar/Bar.svelte'
  import barData from './bar/data.js'
  import Column from './column/Column.svelte'
  import columnData from './column/data.js'
  import Lollipop from './lollipop/Lollipop.svelte'
  import lollipopData from './lollipop/data.js'
</script>
<style>
</style>

<div class='magnitude-container'>
  <div class='bar'><Bar data={barData} /></div>
  <div class='column'><Column data={columnData} /></div>
  <div class='lollipop'><Lollipop data={lollipopData} /></div>
</div>
