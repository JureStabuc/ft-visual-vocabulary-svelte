<script>
import Column from './magnitude/column/Column.svelte'
import data from './magnitude/column/data.js'
import Order from './ranking/column/Column.svelte'

</script>

<style></style>

<div class='wrapper'>
	<div class='magnitude'><Column data={data}/></div>
	<div class='ranking'><Order data={data}/></div>
</div>
