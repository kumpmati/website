import type { GridBlockLayout } from '$lib/types/contentful';

export const getTileWidth = (layout: GridBlockLayout, index: number): string => {
	if (layout === 'Normal') return '100%';

	return index % 4 == 0 || (index + 1) % 4 == 0 ? `calc(100% * (3/5))` : `calc(100% * (2/5))`;
};
