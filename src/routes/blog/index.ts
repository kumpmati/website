import { getBlogPosts } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<Record<string, never>, { posts: any }> = async () => {
	const posts = await getBlogPosts();

	return {
		status: 200,
		body: { posts: posts }
	};
};
