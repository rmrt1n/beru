<script>
	import { fade, slide } from 'svelte/transition';

	export let show = false;
	/** @type {import('$lib/types').Emission} */
	export let emissions;
	/** @type {import('$lib/types').Product} */
	export let product;

	const openingEliability = 0; // TODO: research where to get this
	const supplierEmission = Object.keys(emissions).reduce((acc, i) => acc + emissions[i].totalEmission, 0)
	const downstreamEmission = 60.298; // kgCO2e
	const totalEmission = product.directEmissions + supplierEmission - downstreamEmission;
	const deltaEliability = totalEmission - openingEliability;

	let showDetails = false;
</script>

{#if show}
	<div transition:fade="{{duration: 100}}" 
		class="fixed w-full p-4 inset-0 h-screen overflow-y-auto bg-stone-900 bg-opacity-30 z-50"
	>
		<div class="bg-white p-6 border rounded-md shadow-sm max-w-2xl mx-auto lg:max-h-[36rem] lg:mt-12 overflow-y-auto space-y-4">
			<div class="flex justify-between items-center">
				<p class="text-xl font-bold">E-Liability Statement</p>
				<button 
					on:click={() => show = false} 
					class="border rounded p-1 disabled:text-stone-400 enabled:hover:bg-stone-100 enabled:active:bg-stone-200"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<p>{product.name}</p>

			<div class="border rounded shadow-sm overflow-auto font-base">
				<div class="px-4 py-2 bg-blue-700 text-white font-bold flex justify-between">
					<p>E-liability flows</p>
					<p>kg of CO2e</p>
				</div>
				<div class="px-4 py-2 border-b-2 border-dashed border-stone-300 font-medium flex justify-between">
					<p>Opening E-liabilities</p>
					<p class="text-right">{openingEliability}</p>
				</div>
				<div class="px-4 py-1 bg-stone-100 border-b-2 border-dashed border-stone-300 flex justify-between hover:cursor-pointer" on:click={() => showDetails = !showDetails}>
					<p>Add E-liabilities acquired from suppliers</p>
					<div class="flex gap-2 items-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
							<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
						</svg>
						<p class="text-right">
							{supplierEmission.toLocaleString()}
						</p>
					</div>
				</div>
				{#if showDetails}
					{#each Object.keys(emissions).map((i) => emissions[i]) as e}
					<div transition:slide="{{duration: 150}}" class="px-4 py-1 bg-stone-100 border-b-2 border-dashed border-stone-300 flex justify-between">
						<p class="pl-6">{e.component}</p>
						<p class="text-right">{e.totalEmission.toLocaleString()}</p>
					</div>
					{/each}
				{/if}
				<div class="px-4 py-1 bg-stone-100 border-b-2 border-dashed border-stone-300 flex justify-between">
					<p>Add E-liabilities directly produced through operations</p>
					<p class="text-right">{product.directEmissions.toLocaleString()}</p>
				</div>
				<div class="px-4 py-1 bg-stone-100 border-b-2 border-dashed border-stone-300 flex justify-between">
					<p>Subtract E-liabilities transferred to customers</p>
					<p class="text-right">{downstreamEmission.toLocaleString()}</p>
				</div>
				<div class="px-4 py-2 font-medium border-b-2 border-dashed border-stone-300 flex justify-between">
					<p>Closing E-liabilities</p>
					<p class="text-right">{totalEmission.toLocaleString()}</p>
				</div>
				<div class="px-4 py-1 bg-stone-100 flex justify-between">
					<p>Change in E-liabilities during period</p>
					<p class="text-right">{deltaEliability.toLocaleString()}</p>
				</div>
			</div>

			<div class="flex justify-end gap-3">
				<button class="px-4 py-1 border rounded shadow-sm bg-blue-700 border-blue-700 text-white font-medium flex items-center gap-2">
					Download
				</button>
			</div>
		</div>
	</div>
{/if}
