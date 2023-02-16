<script>
	import UnderConstruction from '$lib/components/UnderConstruction.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { product, emissions, components } = data;

	const supplierEmission = Object.keys(emissions).reduce(
		(acc, i) => acc + emissions[i].totalEmission,
		0
	);
	const totalEmission = product.directEmissions + supplierEmission;

	const map = components.reduce((acc, e) => {
		acc[e.name] = acc[e.name] || [];
		acc[e.name].push(e);
		return acc;
	}, Object.create(null));
	let componentsOptions = Object.keys(map)
		.filter((i) => map[i].length > 1)
		.reduce((acc, i) => {
			acc[i] = acc[i] || {};
			acc[i].components = map[i];
			acc[i].productComponent = product.components?.filter((c) => c.name === i)[0];
			acc[i].selectedComponent = acc[i].productComponent;
			return acc;
		}, Object.create(null));

	const originalCost =
		product.manufactureCost + product.components?.reduce((acc, c) => acc + c.cost, 0);
	/** @type {number} */
	let updatedCost;
	$: updatedCost =
		originalCost -
		Object.keys(componentsOptions)
			.map(
				(i) =>
					componentsOptions[i].productComponent.cost - componentsOptions[i].selectedComponent.cost
			)
			.reduce((acc, c) => acc + c, 0);

	/** @type {number} */
	$: updatedEmission =
		totalEmission -
		Object.keys(componentsOptions)
			.map(
				(i) =>
					getEmission(componentsOptions[i].productComponent) -
					getEmission(componentsOptions[i].selectedComponent)
			)
			.reduce((acc, c) => acc + c, 0);

	const getEmission = (c) => {
		if (c.material?.emissionFactorUnit === 'kgCO2e/kg') {
			const percentWeight =
				c.percentWeight ?? product.components.filter((pc) => pc.name === c.name)[0].percentWeight;
			return ((product.weight * percentWeight) / 100) * c.material.emissionFactor;
		}
	};
</script>

<div class="space-y-4">
	<div class="flex items-center gap-2">
		<a
			href={`/dashboard/products/${product.productId}`}
			class="p-1 border rounded-md shadow-sm flex items-center gap-2 text-left bg-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-5 h-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/>
			</svg>
		</a>
		<h1 class="text-2xl font-bold">{product.name} Optimization</h1>
	</div>

	<div class="flex flex-col lg:flex-row gap-6">
		<div class="bg-white border rounded-md shadow-sm p-4 w-full">
			<img src={product.thumbnail} alt="product thumbnail" class="w-full lg:max-w-md" />
		</div>
		<div
			class="bg-white border rounded-md shadow-sm p-4 w-full flex flex-col justify-between gap-2"
		>
			<h2 class="text-xl font-bold">Cost & footprint engineering</h2>
			<div class="space-y-2">
				<div>
					<p>Updated Cost (in USD)</p>
					<div class="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl">
						<p>
							{product.manufactureCost + product.components.reduce((acc, c) => acc + c.cost, 0)}
						</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
						<p
							class:text-red-500={originalCost < updatedCost}
							class:text-green-500={originalCost > updatedCost}
						>
							<strong>{updatedCost}</strong>
							{originalCost < updatedCost ? `(+${updatedCost - originalCost})` : ''}
							{originalCost > updatedCost ? `(-${originalCost - updatedCost})` : ''}
						</p>
					</div>
				</div>
				<div>
					<h2>Updated Carbon Footprint (in kgCO2e)</h2>
					<div class="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl">
						<p>{totalEmission.toLocaleString()}</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-8 h-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
						<p
							class:text-red-500={totalEmission < updatedEmission}
							class:text-green-500={totalEmission > updatedEmission}
						>
							<strong>{updatedEmission.toLocaleString()}</strong>
							{totalEmission < updatedEmission
								? `(+${(updatedEmission - totalEmission).toLocaleString()})`
								: ''}
							{totalEmission > updatedEmission
								? `(-${(totalEmission - updatedEmission).toLocaleString()})`
								: ''}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-white border rounded-md shadow-sm p-4 space-y-2 w-full">
		<h2 class="text-xl font-bold">Component suppliers</h2>
		<ol class="list-decimal space-y-2">
			{#each Object.keys(componentsOptions) as i}
				<li class="ml-4">
					<div class="flex flex-col md:flex-row md:gap-4 md:items-center">
						<p class="lg:min-w-[12rem]">{i}</p>
						<select
							on:change={(e) => {
								componentsOptions[i].selectedComponent = componentsOptions[i].components.filter(
									(c) => c.supplier.supplierId === Number(e.target.value)
								)[0];
							}}
							class="px-4 py-1 bg-inherit rounded border shadow-sm hover:cursor-pointer"
						>
							{#each componentsOptions[i].components as c}
								<option value={c.supplier.supplierId}>
									{c.supplier.name}
								</option>
							{/each}
						</select>

						<div class="flex gap-4 items-center flex-wrap">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
									clip-rule="evenodd"
								/>
							</svg>
							<span
								class:text-red-500={componentsOptions[i].productComponent.cost -
									componentsOptions[i].selectedComponent.cost <
									0}
								class:text-green-500={componentsOptions[i].productComponent.cost -
									componentsOptions[i].selectedComponent.cost >
									0}
							>
								{componentsOptions[i].productComponent.cost -
									componentsOptions[i].selectedComponent.cost <=
								0
									? '+'
									: '-'}
								{Math.abs(
									componentsOptions[i].productComponent.cost -
										componentsOptions[i].selectedComponent.cost
								).toLocaleString()} USD
							</span>
							<span
								class:text-red-500={getEmission(componentsOptions[i].productComponent) -
									getEmission(componentsOptions[i].selectedComponent) <
									0}
								class:text-green-500={getEmission(componentsOptions[i].productComponent) -
									getEmission(componentsOptions[i].selectedComponent) >
									0}
							>
								{getEmission(componentsOptions[i].productComponent) -
									getEmission(componentsOptions[i].selectedComponent) <=
								0
									? '+'
									: '-'}
								{Math.abs(
									getEmission(componentsOptions[i].productComponent) -
										getEmission(componentsOptions[i].selectedComponent)
								).toLocaleString()} kgCO2e
							</span>
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</div>

	<UnderConstruction />
</div>
