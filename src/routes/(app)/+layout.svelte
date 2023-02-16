<script>
	import '../../app.postcss';
	import Navbar from '$lib/components/app/Navbar.svelte';
</script>

<Navbar />
<main class="bg-stone-100 min-h-screen">
	<div class="mx-auto xl:container lg:px-16 xl:px-20 p-4 md:p-8">
		<slot />
	</div>
</main>
