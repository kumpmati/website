<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { pageSettings } from '$lib/stores/page';
	import type { BlogPost } from '$lib/types/blog';

	export let posts: BlogPost[];

	const splitByMonth: Record<string, BlogPost[]> = posts.reduce((months, curr) => {
		const dateStr = new Date(curr.fields.published).toLocaleString('en', {
			month: '2-digit',
			year: 'numeric'
		});

		if (!months[dateStr]) {
			months[dateStr] = [curr];
		} else {
			months[dateStr].push(curr);
		}

		return months;
	}, {});

	$pageSettings.backgroundColor = '#fff';
	$pageSettings.textColor = 'Dark';
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="container">
	<h1>blog</h1>

	<div>
		{#each Object.entries(splitByMonth) as [month, posts] (month)}
			<h3>{month}</h3>
			<ul>
				{#each posts as post (post.sys.id)}
					<li>
						<a href="/blog/{post.fields.slug}">
							<h2>{post.fields.title}</h2>
							<div>
								<p>{new Date(post.fields.published).toLocaleDateString('fi')}</p>
								<p>-</p>
								<p>{post.fields.summary}</p>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		margin-top: 10rem;
		max-width: 45rem;
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-size: 64px;
		margin: 0;
		margin-bottom: 3rem;
		letter-spacing: -0.07em;

		@media screen and (max-width: 900px) {
			font-size: 50px;
		}
	}

	h3 {
		font-size: 14px;
		font-weight: 500;
		opacity: 0.6;
		margin: 0;
	}

	ul {
		list-style: none;
		padding-left: 1rem;
		display: flex;
		flex-direction: column;

		a {
			display: block;
			font-weight: 900;
			text-decoration: none;
			color: inherit;
			opacity: 0.6;
			margin-bottom: 2rem;

			h2 {
				font-size: 22px;
				margin: 0;
			}

			p {
				font-size: 14px;
				opacity: 0.6;
				margin: 0;
				font-weight: 500;
			}

			div {
				display: flex;
				flex-direction: row;
				gap: 0.5rem;
			}

			&:hover {
				opacity: 1;
			}
		}
	}
</style>
