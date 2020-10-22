<script>
// import Column from './magnitude/column/Column.svelte'
import data from './change-over-time/column/data.js'
// import Order from './ranking/column/Column.svelte'
import Time from './change-over-time/column/Column.svelte'

</script>

<style></style>

<div class='wrapper'>
	<!-- <div class='magnitude'><Column data={data}/></div>
	<div class='ranking'><Order data={data}/></div> -->
	<div class='time'><Time data={data}/></div>
</div>
