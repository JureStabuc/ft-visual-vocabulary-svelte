<script>
// import Column from './magnitude/column/Column.svelte'
import data from './part-to-whole/pie/data.js'
// import Order from './ranking/column/Column.svelte'
import Pie from './part-to-whole/pie/Pie.svelte'
</script>

<style></style>

<div class='wrapper'>
	<!-- <div class='magnitude'><Column data={data}/></div>
	<div class='ranking'><Order data={data}/></div> -->
	<div class='pie'><Pie data={data}/></div>
</div>
