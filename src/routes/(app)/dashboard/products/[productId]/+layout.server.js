import { error } from '@sveltejs/kit';

import { fmtComponent } from '$lib/types';

/** @typedef {import('$lib/types').Component} Component */

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, locals }) => {
	const { productId } = params;

	const { data, error: err } = await locals.sb
		.from('products')
		.select(
			`
			product_id, name, type, thumbnail, weight, price, 
			manufacture_cost, batch_number, direct_emissions,
			components (
				component_id, name, cost,
				product_components (
					percent_weight
				),
				suppliers (
					supplier_id, name, email, phone, address
				),
				materials (
					material_id, name, type, emission_factor, emission_factor_unit
				)
			)
		`
		)
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

	const { data: rawEmissions, error: err2 } = await locals.sb
		.from('emissions')
		.select(
			`
			emission_id, emission_value, stage,
			components (
				component_id, name
			)
		`
		)
		.eq('product_id', productId);

	if (err2) {
		console.log(err);
		throw error(500, 'error: database error');
	}

	const products = /** @type {import('$lib/types').Product[]} */ (
		data.map(
			({
				product_id: productId,
				manufacture_cost: manufactureCost,
				batch_number: batchNumber,
				direct_emissions: directEmissions,
				components: c,
				...rest
			}) => ({
				productId,
				manufactureCost,
				batchNumber,
				directEmissions,
				components: /** @type {Component[]} */ (/** @type {?} */ (c))?.map(fmtComponent),
				...rest
			})
		)
	);

	/** type(import('$lib/types').EmissionLookup) */
	const emissions = rawEmissions.reduce((acc, e) => {
		const { name } = /** @type {Component} */ (/** @type {?} */ (e.components));
		acc[name] = acc[name] || { totalEmission: 0, emissions: [] };
		acc[name].totalEmission += e.emission_value;
		acc[name].emissions.push({
			emissionId: e.emission_id,
			emissionValue: e.emission_value,
			stage: e.stage,
			component: e.components
		});
		return acc;
	}, Object.create(null));

	return {
		product: products[0],
		emissions: emissions
	};
};
