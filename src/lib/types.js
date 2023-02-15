/**
 * @typedef {{
 *   supplierId: number;
 *   name: string;
 *   email: string;
 *   phone: string;
 *   address: string;
 * }} Supplier
 *
 * @typedef {{
 *	materialId: number;
 *	name: string;
 *	type: string;
 *	emissionFactor: number;
 *	emissionFactorUnit: string;
 * }} Material
 *
 * @typedef {{
 *   componentId: number;
 *   name: string;
 *   cost: number;
 *   supplier: Supplier | null;
 *   material: Material | null;
 * }} Component
 *
 * @typedef {{
 *   plantId: number;
 *   plantName: string;
 * }} ManufacturingPlant
 *
 * @typedef {{
 *   productId: number;
 *   name: string;
 *   type: string;
 *   thumbnail: string;
 *   weight: number;
 *   price: number;
 *   manufactureCost: number;
 *   batchNumber: number;
 *   directEmissions: number;
 *   manufacturingPlant: ManufacturingPlant | null;
 *   components: Component[] | null;
 * }} Product
 *
 * @typedef {{
 *   [componentName: string]: {
 *	   totalEmission: number;
 *	   emissions: {
	 *		 emissionId: number;
	 *		 emissionValue: number;
	 *		 stage: string;
	 *		 component: {
	 *		   componentId: number;
	 *		   name: number;
	 *		 };
	 *   }[];
	 * }
 * }} Emission
 */

const fmtSupplier = ({ supplier_id: supplierId, ...rest }) => ({ supplierId, ...rest });
const fmtMaterial = ({
	material_id: materialId,
	emission_factor: emissionFactor,
	emission_factor_unit: emissionFactorUnit,
	...rest
}) => ({ materialId, emissionFactor, emissionFactorUnit, ...rest });

export const fmtComponent = ({
	component_id: componentId,
	suppliers: s,
	materials: m,
	...rest
}) => ({
	componentId,
	...rest,
	supplier: fmtSupplier(s),
	material: m ? fmtMaterial(m) : null
});
