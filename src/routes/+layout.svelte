<script>
	import supabase from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});
		return () => subscription.unsubscribe();
	});
</script>

<slot />
