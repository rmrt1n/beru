import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.sb.auth.signInWithOtp({
			email: /** @type {string} */ (body.email),
			options: { emailRedirectTo: '/dashboard' }
		});

		if (err) {
			if (err.status === 400) {
				return fail(400, {
					error: 'error: invalid email'
				});
			}
			return fail(500, {
				error: 'error: server error'
			});
		}

		console.log('testing', data);

		throw redirect(303, '/dashboard');
	}
};
