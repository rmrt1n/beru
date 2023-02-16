<script>
	import { enhance } from '$app/forms';
	import supabase from '$lib/supabase';

	let loading = false;
	let email = '';
	let submitted = false;

	/** @type {import('$app/forms').SubmitFunction} */
	const signIn = async ({ cancel }) => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: { emailRedirectTo: '/dashboard' }
			});
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
		submitted = true;
		cancel();
	};
</script>

<div class="max-w-md mx-auto bg-white border rounded-md shadow-md mt-6">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1 class="font-display font-semibold text-2xl sm:text-3xl">Sign in to your account</h1>
		<form method="POST" use:enhance={signIn} class="space-y-4 md:space-y-6">
			<div>
				<label for="email" class="block mb-2 text-sm font-medium">Your email</label>
				<input
					required
					type="email"
					name="email"
					id="email"
					class="px-4 py-1 w-full border rounded bg-stone-50"
					placeholder="name@company.com"
					bind:value={email}
				/>
			</div>
			<button
				type="submit"
				disabled={submitted}
				class="px-4 py-1 border rounded shadow-sm bg-blue-700 border-blue-700 text-white w-full font-medium text-center disabled:opacity-60"
			>
				{#if !loading}
					Sign in with email
				{:else}
					<div class="flex items-center gap-2 justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 animate-spin"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
						Loading...
					</div>
				{/if}
			</button>
		</form>
	</div>
</div>
<!-- </div> -->
