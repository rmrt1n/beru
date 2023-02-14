<script>
	import Table from '$lib/components/dashboard/Table.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { products } = data;
	console.log(products);
</script>

<div class="space-y-8">
	<h1 class="text-2xl font-bold">Schaan, Liechtenstein</h1>
	<div class="flex h-24 gap-8 border rounded-md bg-white shadow-sm p-4">
		just some stats about this manufacturing plant
	</div>

	<div class="bg-white border rounded-md shadow-sm p-6 space-y-4">
		<Table {products} />
	</div>
</div>
