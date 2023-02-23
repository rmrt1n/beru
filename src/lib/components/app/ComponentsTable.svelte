<script>
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		getCoreRowModel,
		flexRender,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';

	import { fuzzyFilter } from '$lib/table';
	import Pagination from './Pagination.svelte';
	import ComponentEliabilityStatement from './ComponentEliabilityStatement.svelte';

	/**
	 * @typedef {import('$lib/types').Component} Component
	 */

	/** @type {Component[] | null} */
	export let components;
	/** @type {import('$lib/types').EmissionLookup} */
	export let emissions;

	let lookupShow = Object.keys(emissions).map(() => false);

	/** @type {import('@tanstack/svelte-table').ColumnDef<Component>[]} */
	const columns = [
		{
			accessorKey: 'componentId',
			header: 'ID',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'name',
			header: 'Component',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'cost',
			header: 'Cost (USD)',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (c) => c.supplier?.name,
			header: 'Supplier',
			cell: (info) => info.getValue()
		}
	];

	let globalFilter = '';
	$: options.update((old) => ({ ...old, state: { ...old.state, globalFilter } }));

	// @ts-ignore not sure how to fix this :(
	const options = writable({
		data: components,
		columns: columns,
		state: { globalFilter, pagination: { pageIndex: 0, pageSize: 10 } },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: fuzzyFilter,
		getPaginationRowModel: getPaginationRowModel()
	});

	const table = createSvelteTable(options);
</script>

<div class="space-y-4">
	<div class="flex justify-between gap-2 flex-wrap">
		<h2 class="text-xl font-bold">Components breakdown</h2>
		<div class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 absolute left-4 top-1.5"
			>
				<path
					fill-rule="evenodd"
					d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
					clip-rule="evenodd"
				/>
			</svg>
			<input
				bind:value={globalFilter}
				class="px-4 pl-11 py-1 border rounded bg-stone-50"
				placeholder="search"
			/>
		</div>
	</div>

	<div class="w-full border rounded shadow-sm overflow-auto">
		<table class="w-full">
			<thead class="bg-stone-200 w-full">
				{#each $table.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							<th class="px-4 py-2 text-left">
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
								{/if}
							</th>
						{/each}
						<th class="px-4 py-2">Carbon footprint (kgCO2e)</th>
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each $table.getRowModel().rows as row}
					<tr class="hover:bg-stone-100">
						{#each row.getVisibleCells() as cell}
							<td
								class="px-4 py-2 text-left"
								class:text-right={typeof cell.getValue() === 'number'}
							>
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
							</td>
						{/each}
						<td class="px-4 py-2 text-right flex justify-end items-center gap-2">
							{emissions[row.getValue('name')].totalEmission.toLocaleString()}
							<button
								on:click={() => (lookupShow[row.index] = !lookupShow[row.index])}
								class="btn btn-icon"
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
										d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
									/>
								</svg>
							</button>
							<ComponentEliabilityStatement
								bind:show={lookupShow[row.index]}
								emissions={emissions[row.getValue('name')]}
								componentName={row.getValue('name')}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<Pagination {table} {options} />
</div>
