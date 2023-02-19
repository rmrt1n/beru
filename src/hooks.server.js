import '$lib/supabase';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event);

	const path = event.url.pathname;
	// protected paths
	if (!session && (path.startsWith('/dashboard') || path.startsWith('/profile'))) {
		throw redirect(303, '/sign-in');
	}

	// redirect from /sign-in if user is already signed in
	if (session && path.startsWith('/sign-in')) throw redirect(303, '/dashboard');

	event.locals.session = session;
	event.locals.sb = supabaseClient;

	return resolve(event);
};
