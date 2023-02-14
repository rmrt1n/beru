import { rankItem } from '@tanstack/match-sorter-utils';

/** @type {import('@tanstack/svelte-table').FilterFn<any>} */
export const fuzzyFilter = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);
	// Store the itemRank info
	addMeta(itemRank);
	// Return if the item should be filtered in/out
	return itemRank.passed;
};
