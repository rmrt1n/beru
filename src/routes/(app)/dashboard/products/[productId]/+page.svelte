<script>
	import ComponentsTable from '$lib/components/app/ComponentsTable.svelte';
	import ELiabilityStatement from '$lib/components/app/ELiabilityStatement.svelte';
	import UnderConstruction from '$lib/components/UnderConstruction.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const { product, emissions } = data;

	let show = false;
</script>

<div class="space-y-4">
	<h1 class="text-2xl font-bold">{product.name}</h1>
	<div class="flex flex-col lg:flex-row gap-6">
		<div class="bg-white border rounded-md shadow-sm p-4 w-full">
			<img src={product.thumbnail} alt="product thumbnail" class="w-full lg:max-w-md" />
		</div>
		<div class="bg-white border rounded-md shadow-sm p-4 space-y-2 w-full">
			<h3 class="text-xl font-bold">Product details</h3>

			<div class="space-y-1">
				<p>Product ID: #{product.productId}</p>
				<p>Name: {product.name}</p>
				<p>Type: {product.type}</p>
				<p>Weight: {product.weight} kg</p>
				<p>Price: {product.price} USD</p>
				<p>Manufacturing cost: {product.manufactureCost} USD</p>
				<p>Batch number: #{product.batchNumber}</p>
			</div>

			<div class="flex flex-col md:flex-row gap-4">
				<button
					on:click={() => (show = !show)}
					class="w-full px-4 py-1 border rounded-md shadow-sm flex items-center gap-2 text-left"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
						/>
					</svg>

					E-liability statement
				</button>
				<a
					href={`/dashboard/products/${product.productId}/optimize`}
					class="w-full px-4 py-1 border rounded-md shadow-sm flex items-center gap-2 bg-blue-700 border-blue-700 text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
						/>
					</svg>

					Optimize footprint
				</a>
			</div>
		</div>
	</div>
	<div class="bg-white border rounded-md shadow-sm p-4 space-y-2 w-full">
		<!-- <h2 class="text-xl font-bold">Components breakdown</h2> -->
		<ComponentsTable components={product.components} {emissions} />
	</div>
	<UnderConstruction />
</div>

<ELiabilityStatement bind:show {product} {emissions} />
