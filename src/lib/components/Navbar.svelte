<script>
	let isOpen = false;
</script>

<header class="border">
	<div class="mx-auto flex items-center justify-between p-4 xl:container lg:px-16 xl:px-20">
		<nav class="flex gap-6 items-end">
			<a href="/" class="mr-6">
				<img src="/logo.png" alt="beru logo" class="h-8" />
			</a>
			<div class="hidden md:block space-x-6 font-medium text-lg">
				<a href="/">Product</a>
				<a href="/#faq">FAQs</a>
				<a href="/about">About</a>
				<a href="mailto:hi@ryanmartin.me">Contact</a>
			</div>
		</nav>
		<nav class="hidden md:flex gap-3 font-medium text-lg">
			<a href="/dashboard" class="px-4 py-1 border rounded shadow-sm flex items-center gap-2">
				Sign in
			</a>
			<a
				href="mailto:hi@ryanmartin.me"
				class="px-4 py-1 border rounded shadow-sm flex items-center gap-2 bg-blue-700 border-blue-700 text-white"
			>
				Get in touch
			</a>
		</nav>
		<button on:click={() => (isOpen = !isOpen)} class="p-1 border rounded shadow-sm md:hidden">
			{#if !isOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{/if}
		</button>
	</div>
</header>
<nav class="md:hidden p-4 flex flex-col gap-2 text-lg font-medium" class:hidden={!isOpen}>
	<a href="/" class="px-4 py-1 hover:bg-stone-100">Product</a>
	<a href="/#faq" class="px-4 py-1 hover:bg-stone-100">FAQs</a>
	<a href="/about" class="px-4 py-1 hover:bg-stone-100">About</a>
	<a href="mailto:hi@ryanmartin.me" class="px-4 py-1 hover:bg-stone-100">Contact</a>
	<a href="/dashboard" class="px-4 py-1 border rounded shadow-sm flex items-center gap-2">
		Sign in
	</a>
	<a
		href="mailto:hi@ryanmartin.me"
		class="px-4 py-1 border rounded shadow-sm flex items-center gap-2 bg-blue-700 border-blue-700 text-white"
	>
		Get in touch
	</a>
</nav>
