<script>
	import Table from '$lib/components/app/Table.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { products } = data;
</script>

<div class="space-y-8">
	<h1 class="text-2xl font-bold">Welcome, {data.session?.user.email}</h1>

	<div class="bg-white border rounded-md shadow-sm p-6">
		<h2 class="text-xl font-bold">Products List</h2>
		<Table {products} />
	</div>
</div>
