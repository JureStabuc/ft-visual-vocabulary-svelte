<script>
// import Column from './magnitude/column/Column.svelte'
import data from './part-to-whole/donut/data.js'
// import Order from './ranking/column/Column.svelte'
import Donut from './part-to-whole/donut/Donut.svelte'
</script>

<style></style>

<div class='wrapper'>
	<!-- <div class='magnitude'><Column data={data}/></div>
	<div class='ranking'><Order data={data}/></div> -->
	<div class='donut'><Donut data={data}/></div>
</div>
