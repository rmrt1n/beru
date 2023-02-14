import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals }) => {
	const { error: err } = await locals.sb.auth.signOut();

	if (err) {
		throw error(500, 'error: error signing out');
	}

	throw redirect(303, '/');
};
