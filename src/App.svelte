<script>
import Bar from './magnitude/bar/Bar.svelte'
import data from './magnitude/bar/data.js'
import Order from './ranking/ordered_bar/Bar.svelte'

</script>

<style></style>

<div class='wrapper'>
	<div class='magnitude'><Bar data={data}/></div>
	<div class='ranking'><Order data={data}/></div>
</div>
