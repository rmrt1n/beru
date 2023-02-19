import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals }) => {
	const { productId } = params;

	const { data, error: err } = await locals.sb.rpc('get_similar_components', {
		param_product_id: productId
	});

	if (err) {
		console.log(err);
		throw error(500, 'error: database error');
	}

	/** @type {import('$lib/types').Component[]} */
	const components = data.map(
		/** @param {*} d */ // this shows up only here, cumbersome to implement type
		(d) => ({
			componentId: d.component_id,
			name: d.component_name,
			cost: d.cost,
			percentWeight: d.percent_weight,
			supplier: {
				supplierId: d.supplier_id,
				name: d.supplier_name,
				email: d.email,
				phone: d.phone,
				address: d.address
			},
			material: d.material_id
				? {
						materialId: d.material_id,
						name: d.material_name,
						type: d.type,
						emissionFactor: d.emission_factor,
						emissionFactorUnit: d.emission_factor_unit
				  }
				: null
		})
	);

	return {
		components
	};
};
