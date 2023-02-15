<script>
	import { enhance } from '$app/forms';

	import supabase from '$lib/supabase';

	/** @type {import('$app/forms').SubmitFunction} */
	const signOut = async ({ cancel }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};

	let isProfileOpen = false;
</script>

<header class="border font-lg">
	<div class="mx-auto flex items-center justify-between p-4 lg:container lg:px-16 xl:px-20">
		<a href="/dashboard" class="font-bold text-xl">Beru</a>
		<nav class="flex gap-3">
			<button class="px-4 py-1 border rounded shadow-sm flex items-center gap-2">
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
						d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
					/>
				</svg>
				help
			</button>

			<div class="relative">
				<button
					on:click={() => (isProfileOpen = !isProfileOpen)}
					class="px-4 py-1 border rounded shadow-sm flex items-center gap-2"
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
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Account
				</button>
				<!-- Dropdown menu -->
				<div
					class="z-10 absolute right-0 top-[calc(100%+.25rem)] bg-white divide-y divide-gray-100 border rounded-md shadow-md w-44"
					class:hidden={!isProfileOpen}
				>
					<ul class="py-2 text-sm" on:click={() => (isProfileOpen = false)}>
						<li>
							<a href="/profile" class="block px-4 py-2 hover:bg-stone-100">Your profile</a>
						</li>
						<li>
							<form method="POST" action="/sign-out" use:enhance={signOut}>
								<button type="submit" class="w-full text-left px-4 py-2 hover:bg-stone-100">
									Sign out
								</button>
							</form>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</header>
