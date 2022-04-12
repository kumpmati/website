<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Arrow from '$lib/components/icons/Arrow.svelte';
	import AnchoredHeading from '$lib/components/Markdown/AnchoredHeading.svelte';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import { pageSettings } from '$lib/stores/page';
	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
	const { title, summary, content, published } = post.fields;

	$pageSettings.backgroundColor = '#fff';
	$pageSettings.textColor = 'Dark';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container" style="--text-color: {$pageSettings.textColor === 'Dark' ? '#000' : '#fff'}">
	<a href="/blog"> <Arrow /></a>

	<section>
		<h1>{title}</h1>

		<div class="details">
			<p class="summary">{summary}</p>
			<p>{new Date(published).toLocaleDateString('fi')}</p>
		</div>
	</section>

	<article class="content" style="--text-color-subtle: rgba(0,0,0,0.6)">
		<Markdown value={content} renderers={{ heading: AnchoredHeading }} />
	</article>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		margin-top: 10rem;
		max-width: 40rem;
	}

	a {
		display: grid;
		place-content: center;
		align-content: center;
		text-decoration: none;
		color: var(--text-color);
		border-radius: 100%;
		width: 2rem;
		height: 2rem;
	}

	section {
		margin-block: 3rem;

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

		.details {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			p {
				opacity: 0.6;
				font-size: 16px;
				font-weight: 900;
				margin-right: 1.5rem;
			}
		}
	}

	.content {
		padding-bottom: 12rem;

		:global(h1) {
			font-size: 40px !important;
		}

		:global(h2) {
			font-size: 30px !important;
		}

		:global(pre) {
			font-size: 16px !important;
		}

		:global(p) {
			opacity: 1;
			font-size: 18px;
			line-height: 1.6;
		}
	}
</style>
