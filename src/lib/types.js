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
 *   percentWeight: number | null;
 *   supplier: Supplier;
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
 *   components: Component[];
 * }} Product
 *
 * @typedef {{
 *	 totalEmission: number;
 *	 emissions: {
 *		 emissionId: number;
 *		 emissionValue: number;
 *		 stage: string;
 *		 component: {
 *		   componentId: number;
 *		   name: number;
 *		 };
 *	}[];
 * }} Emission
 *
 * @typedef {{
 *   [componentName: string]: Emission
 * }} EmissionLookup
 */

/**
 * @param {{
 *	 supplier_id: number;
 * }} rawSupplier
 * @returns Supplier
 */
const fmtSupplier = ({ supplier_id: supplierId, ...rest }) => ({ supplierId, ...rest });

/**
 * @param {{
 *	 material_id: number;
 *		 emission_factor: number;
 *		 emission_factor_unit: number;
 * }} rawMaterial
 * @returns Material
 */
const fmtMaterial = ({
	material_id: materialId,
	emission_factor: emissionFactor,
	emission_factor_unit: emissionFactorUnit,
	...rest
}) => ({ materialId, emissionFactor, emissionFactorUnit, ...rest });

/**
 * @param {{
 *	 component_id: number;
 *	 product_components: {
 *	   percent_weight: number;
 *	 }[];
 *	 suppliers: {
 *		 supplier_id: number;
 *	 };
 *	 materials: {
 *		 material_id: number;
 *		 emission_factor: number;
 *		 emission_factor_unit: number;
 *	 }
 * }} rawComponent
 * @returns Component
 */
export const fmtComponent = ({
	component_id: componentId,
	product_components: pc,
	suppliers: s,
	materials: m,
	...rest
}) => ({
	componentId,
	percentWeight: pc[0].percent_weight,
	...rest,
	supplier: fmtSupplier(s),
	material: m ? fmtMaterial(m) : null
});

export {};
