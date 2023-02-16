<script>
	import '../../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />
<main class="min-h-screen">
	<div class="mx-auto xl:container lg:px-16 xl:px-20 p-4 md:p-8">
		<slot />
	</div>
</main>
<Footer />
