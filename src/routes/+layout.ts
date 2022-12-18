import { error } from '@sveltejs/kit';
import type { LayoutLoad } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch, url }) => {
	const res = await fetch('/api/navigation');

	if (res.ok) {
		return {
			key: url.pathname,
			nav: await res.json()
		};
	}

	throw error(500, `Could not load globals`);
};
