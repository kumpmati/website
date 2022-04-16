import { API_URL } from '$lib/config/env';
import type { BlogPostFeedback } from '$lib/types/blog';

export const getBlogPostFeedback = async (slug: string): Promise<BlogPostFeedback | null> => {
	const response = await fetch(`${API_URL}/feedback/post/${slug}`).catch(() => null);

	if (!response) return null;
	return await response.json();
};

export const submitFeedback = async (slug: string): Promise<BlogPostFeedback> => {
	const response = await fetch(`${API_URL}/feedback/post/${slug}`, {
		method: 'POST'
	});

	return await response.json();
};
