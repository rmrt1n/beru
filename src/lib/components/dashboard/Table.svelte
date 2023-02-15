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

	/**
	 * @typedef {import('$lib/types').Product} Product
	 */

	/** @type {Product[]} */
	export let products;

	/** @type {import('@tanstack/svelte-table').ColumnDef<Product>[]} */
	const columns = [
		{
			accessorKey: 'productId',
			header: 'ID',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'name',
			header: 'Product',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'type',
			header: 'Category',
			cell: (info) => info.getValue()
		},
		{
			accessorFn: (p) => p.manufacturingPlant.plantName,
			header: 'Manufacturing plant',
			cell: (info) => info.getValue()
		}
	];

	let globalFilter = '';
	$: options.update((old) => ({ ...old, state: { ...old.state, globalFilter } }));

	const options = writable({
		data: products,
		columns: columns,
		state: { globalFilter, pagination: { pageIndex: 0, pageSize: 10 } },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: fuzzyFilter,
		getPaginationRowModel: getPaginationRowModel()
	});

	const table = createSvelteTable(options);

	const demoProducts = [1];
	/** @param {number} id */
	const isDemoProduct = (id) => demoProducts.filter((i) => i === id).length > 0;
</script>

<div class="flex justify-end gap-2 flex-wrap">
	<div class="relative">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5 absolute left-4 top-1.5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
		<input bind:value={globalFilter} class="px-4 pl-11 py-1 border rounded" placeholder="search" />
	</div>
	<div class="relative">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5 absolute left-4 top-1.5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
			/>
		</svg>
		<select
			class="w-full h-full bg-inherit px-4 pl-11 py-1 rounded border shadow-sm hover:cursor-pointer"
		>
			<option> Schaan, Liechtenstein </option>
		</select>
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
					<th class="px-4 py-2" />
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr class="hover:bg-stone-100">
					{#each row.getVisibleCells() as cell}
						<td class="px-4 py-2 text-left">
							{#if cell.column.id === 'name' && products[row.index].thumbnail}
								<img
									src={products[row.index].thumbnail}
									alt="product thumbnail"
									class="w-12 h-12 rounded-full border-2 inline-block mr-2 object-contain"
								/>
							{/if}
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
					<td class="px-4 py-2">
						{#if isDemoProduct(row.getValue('productId'))}
							<a
								href={`/dashboard/products/${row.getValue('productId')}`}
								class="inline-block rounded border border-transparent hover:border-gray-200 hover:shadow-sm p-1"
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
										d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
							</a>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<Pagination {table} {options} />
