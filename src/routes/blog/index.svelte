<script context="module">
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
			<ul class="posts">
				{#each posts as post (post.sys.id)}
					<li class="post">
						<a href="/blog/{post.fields.slug}">
							<h2>{post.fields.title}</h2>
							<div>
								<p>{post.fields.summary}</p>
							</div>
						</a>

						<ul class="tags">
							{#each post.fields?.tags ?? [] as tag}
								<li class="tag">{tag}</li>
							{/each}
						</ul>
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
		margin-bottom: 7rem;
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

	.posts {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;

		.post {
			margin-bottom: 2rem;
		}

		a {
			display: block;
			font-weight: 900;
			text-decoration: none;
			color: inherit;
			margin-bottom: 0.5rem;
			transition: transform 200ms;

			&:hover {
				transform: translateY(-2px);
			}

			h2 {
				font-size: 22px;
				margin: 0;
				margin-bottom: 0.25rem;
			}

			p {
				font-size: 14px;
				opacity: 0.6;
				margin: 0;
				font-weight: 500;
			}

			div {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}

		.tags {
			display: flex;
			list-style: none;
			padding: 0;

			.tag {
				font-size: 12px;
				font-weight: 500;
				background-color: var(--accent);
				border-radius: 1rem;
				color: #000;
				padding: 0.15rem 0.65rem;
				margin-right: 0.5rem;
			}
		}
	}
</style>
