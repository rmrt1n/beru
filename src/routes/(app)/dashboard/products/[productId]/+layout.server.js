import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, locals }) => {
	const { productId } = params;

	const { data, error: err } = await locals.sb
		.from('products')
		.select()
		.eq('product_id', productId)
		.limit(1);

	if (err) {
		console.log(err);
		throw error(500, 'error: database error');
	}

	if (data.length === 0) {
		console.log(err);
		throw error(500, "error: record doesn't exist");
	}

	/** @type {import('$lib/types').Product[]} */
	const products = data.map(
		({
			product_id: productId,
			created_at: createdAt,
			manufacture_cost: manufactureCost,
			batch_number: batchNumber,
			direct_emissions: directEmissions,
			...rest
		}) => ({ productId, createdAt, manufactureCost, batchNumber, directEmissions, ...rest })
	);

	return {
		product: products[0]
	};
};
