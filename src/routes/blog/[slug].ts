import { getBlogPostBySlug } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ slug: string }, { post: any }> = async ({ params }) => {
	const post = await getBlogPostBySlug(params.slug);

	if (!post) {
		return {
			status: 404,
			error: new Error('not found')
		};
	}

	return {
		status: 200,
		body: { post }
	};
};
