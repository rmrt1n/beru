import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	const { data, error: err } = await locals.sb
		.from('products')
		.select('*, manufacturing_plants (plant_id, name)')
		.order('product_id');

	if (err) {
		console.log(err);
		throw error(500, 'error: database error');
	}

	/** @type {import('$lib/types').Product[]} */
	const products = data.map(
		({
			product_id: productId,
			created_at: createdAt,
			manufacture_cost: manufactureCost,
			batch_number: batchNumber,
			direct_emissions: directEmissions,
			manufacturing_plants: [p],
			...rest
		}) => ({
			productId,
			createdAt,
			manufactureCost,
			batchNumber,
			directEmissions,
			manufacturingPlant: { plantId: p.plant_id, plantName: p.name },
			...rest
		})
	);

	return {
		products
	};
};
