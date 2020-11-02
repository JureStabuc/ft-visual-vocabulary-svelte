<script>
// import Column from './magnitude/column/Column.svelte'
import data from './change-over-time/line/data.js'
// import Order from './ranking/column/Column.svelte'
import Line from './change-over-time/line/Line.svelte'

</script>

<style></style>

<div class='wrapper'>
	<!-- <div class='magnitude'><Column data={data}/></div>
	<div class='ranking'><Order data={data}/></div> -->
	<div class='line'><Line data={data}/></div>
</div>
