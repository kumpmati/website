<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import AnchoredHeading from '$lib/components/Markdown/AnchoredHeading.svelte';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import { pageSettings } from '$lib/stores/page';
	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
	const { title, summary, content, published, coverImage, tags } = post.fields;

	$pageSettings.backgroundColor = '#fff';
	$pageSettings.textColor = 'Dark';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container" style="--text-color: {$pageSettings.textColor === 'Dark' ? '#000' : '#fff'}">
	{#if coverImage}
		<img
			class="coverImage"
			src={coverImage.fields.file.url}
			alt={coverImage.fields.title}
			width={coverImage.fields.file.details.image.width}
			height={coverImage.fields.file.details.image.height}
		/>
	{/if}

	<section>
		<h1>{title}</h1>

		<div class="details">
			<p class="summary">{summary}</p>
			<p>{new Date(published).toLocaleDateString('fi')}</p>
		</div>

		<ul class="tags">
			{#each tags ?? [] as tag}
				<li class="tag">{tag}</li>
			{/each}
		</ul>
	</section>

	<article id="content" style="--text-color-subtle: rgba(0,0,0,0.6)">
		<Markdown value={content} renderers={{ heading: AnchoredHeading }} />
	</article>

	<!--
		<div class="feedback">
			<h2>Feedback</h2>
			<p>Let me know how you liked / didn't like this post</p>
	
			<div class="buttons">
				<button class="positive"><ThumbsUp /></button>
				<button class="negative"><ThumbsDown /></button>
			</div>
		</div>
	-->
</div>

<style lang="scss">
	.container {
		position: relative;
		margin: 0 auto;
		margin-top: 8rem;
		max-width: 40rem;

		@media screen and (max-width: 400px) {
			margin-top: 5rem;
		}
	}

	.coverImage {
		width: 100%;
		height: auto;

		border-radius: var(--border-radius);
		box-shadow: 0 1.5rem 2.5rem rgba(0, 0, 0, 0.15);
		margin-bottom: 2rem;
		object-fit: cover;
	}

	section {
		position: relative;
		margin-top: 1rem;
		margin-bottom: 3rem;

		h1 {
			margin: 0;
			font-size: 50px;

			@media screen and (max-width: 900px) {
				font-size: 40px;
			}

			@media screen and (max-width: 500px) {
				font-size: 30px;
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

		.details {
			display: flex;
			flex-direction: column;
			margin-top: 1rem;

			.summary {
				font-size: 16px;
				font-weight: 900;
				margin-bottom: 0.5rem;
				font-style: italic;
			}

			p {
				opacity: 0.6;
				font-size: 14px;
				font-weight: 500;
				margin: 0;
			}
		}
	}

	// has to be an ID so that css specifity doesn't break when built
	// (could be some kind of bug)
	#content {
		padding-bottom: 5rem;

		:global(h1) {
			font-size: 40px;
		}

		:global(h2) {
			font-size: 30px;
		}

		:global(pre) {
			font-size: 16px;
		}

		:global(p) {
			opacity: 1;
			font-size: 18px;
			line-height: 1.6;
		}
	}

	/*
	.feedback {
		margin: 4rem 0;
		max-width: 20rem;

		.buttons {
			display: flex;
		}

		button {
			border: none;
			background: none;
			cursor: pointer;
			opacity: 0.6;
			transition: opacity 200ms;
			width: 2rem;
			height: 2rem;
			display: grid;
			place-content: center;

			&:hover {
				opacity: 1;
			}
		}
	}
	*/
</style>
