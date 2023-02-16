<script>
	import PaginationButton from './PaginationButton.svelte';

	/**
	 * @type {import('svelte/store').Writable<{
	 *   state: {
	 *     globalFilter: string;
	 *     pagination: {
	 *       pageIndex: number;
	 *       pageSize: number;
	 *     }
	 *   }
	 * }>} Options
	 */
	export let options;
	/** @type {import('svelte/store').Readable<any> | null} */
	export let table;
</script>

<div class="flex items-center justify-between text-sm">
	<span>
		{`Showing ${
			$table.getState().pagination.pageIndex * $table.getState().pagination.pageSize + 1
		}-${$table.getState().pagination.pageSize * ($table.getState().pagination.pageIndex + 1)} of ${
			$table.getPrePaginationRowModel().rows.length
		} entries`}
	</span>

	<div class="flex items-center">
		<span>
			Show:
			<select
				class="bg-transparent border p-1 rounded mx-2"
				value={$table.getState().pagination.pageSize}
				on:change={(e) => {
					const newPageSize = Number(/** @type {HTMLSelectElement} */ (e.target).value);
					options.update(({ state, state: { pagination }, ...old }) => ({
						...old,
						state: { ...state, pagination: { ...pagination, pageSize: newPageSize } }
					}));
				}}
			>
				{#each [10, 20, 30, 40, 50] as pageSize}
					<option value={pageSize}>
						{pageSize}
					</option>
				{/each}
			</select>
		</span>

		<span class="space-x-1 ml-2">
			<PaginationButton
				type="first"
				disabled={!$table.getCanPreviousPage()}
				on:click={() => {
					options.update(({ state, state: { pagination }, ...old }) => ({
						...old,
						state: { ...state, pagination: { ...pagination, pageIndex: 0 } }
					}));
				}}
			/>
			<PaginationButton
				type="prev"
				disabled={!$table.getCanPreviousPage()}
				on:click={() => {
					options.update(({ state, state: { pagination }, ...old }) => ({
						...old,
						state: { ...state, pagination: { ...pagination, pageIndex: pagination.pageIndex - 1 } }
					}));
				}}
			/>
			<PaginationButton
				type="next"
				disabled={!$table.getCanNextPage()}
				on:click={() => {
					options.update(({ state, state: { pagination }, ...old }) => ({
						...old,
						state: { ...state, pagination: { ...pagination, pageIndex: pagination.pageIndex + 1 } }
					}));
				}}
			/>
			<PaginationButton
				type="last"
				disabled={!$table.getCanNextPage()}
				on:click={() => {
					options.update(({ state, state: { pagination }, ...old }) => ({
						...old,
						state: { ...state, pagination: { ...pagination, pageIndex: $table.getPageCount() - 1 } }
					}));
				}}
			/>
		</span>
	</div>
</div>
