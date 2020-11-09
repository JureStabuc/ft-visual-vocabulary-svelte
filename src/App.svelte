<script>
// import Column from './magnitude/column/Column.svelte'
// import data from './change-over-time/line/data.js'
// import Order from './ranking/column/Column.svelte'
import Pie from './part-to-whole/pie/Pie.svelte'

const data = [
	{
		group: 'Joe Biden',
		value: 0.507
	},
	{
		group: 'Donald Trump',
		value: 0.477
	},
	{
		group: 'Other candidates',
		value: 0.016
	}
]

</script>

<style></style>

<div class='wrapper'>
	<!-- <div class='magnitude'><Column data={data}/></div>
	<div class='ranking'><Order data={data}/></div> -->
	<div class='pie'><Pie data={data}/></div>
</div>
