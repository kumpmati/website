import { getBlogPostBySlug } from '$lib/services/contentful';
import { getBlogPostFeedback } from '$lib/services/feedback';
import type { BlogPostFeedback } from '$lib/types/blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<
	{ slug: string },
	{ post: any; feedback: BlogPostFeedback | null }
> = async ({ params }) => {
	const post = await getBlogPostBySlug(params.slug);
	const feedback = await getBlogPostFeedback(params.slug);

	if (!post) {
		return {
			status: 404,
			error: new Error('not found')
		};
	}

	return {
		status: 200,
		body: { post, feedback }
	};
};
