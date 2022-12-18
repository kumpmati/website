import { getHomePage } from '$lib/services/contentful';
import type { Load } from '@sveltejs/kit';

export const load: Load<Record<string, never>> = async () => {
	const page = await getHomePage();

	if (!page) throw new Error('page not found');

	return {
		status: 200,
		body: { page }
	};
};
