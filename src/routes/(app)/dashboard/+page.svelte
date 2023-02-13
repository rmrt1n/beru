<div class="space-y-8">
	<h1 class="text-2xl font-bold">Schaan, Liechtenstein</h1>
	<div class="flex h-24 gap-8 border rounded-md bg-white shadow-sm p-4">
		just some stats about this manufacturing plant
	</div>

	<div class="bg-white border rounded-md shadow-sm p-6 space-y-4">
		<div class="flex justify-end gap-2 flex-wrap">
			<div class="relative">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 absolute left-4 top-1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
				<input class="px-4 pl-11 py-1 border rounded" placeholder="search"/>
			</div>
			<button class="px-4 py-1 rounded border shadow-sm flex items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
				</svg>

				Filter
			</button>
			<div class="relative">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 absolute left-4 top-1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
				</svg>
				<select class="w-full h-full bg-inherit px-4 pl-11 py-1 rounded border shadow-sm hover:cursor-pointer">
					<option>
						Schaan, Liechtenstein
					</option>
				</select>
			</div>
		</div>
		<table class="w-full border rounded-md shadow-sm">
			<thead class="bg-stone-100 w-full">
				<tr>
					<th class="px-4 py-2 text-left">product id</th>
					<th class="px-4 py-2 text-left">product</th>
					<th class="px-4 py-2 text-left">category</th>
					<th class="px-4 py-2 text-left">carbon footprint</th>
					<th class="px-4 py-2 text-left"></th>
				</tr>
			</thead> 
			<tbody> 
				{#each [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] as row}
					<tr>
						<td class="px-4 py-2 text-left">{row}</td>
						<td class="px-4 py-2 text-left flex ites-center gap-2">
							<img src="/favicon.png" alt="product thumbnail" class="w-8 h-8"/>
							te 500-22 cordless chipping hammer
						</td>
						<td class="px-4 py-2 text-left">cordless power tools</td>
						<td class="px-4 py-2 text-left">12,343 kgc02e</td>
						<td class="px-4 py-2 text-left">
							<a href={`/dashboard/products/${row}`} class="inline-block rounded border border-transparent hover:border-gray-200 hover:shadow-sm p-1">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
								</svg>
							</a>
						</td>
					</tr>
				{/each}
			</tbody> 
		</table>
	</div>
</div>
