<script lang="ts">
	import type { GridImage } from '$lib/types/contentful';
	import Parallax from '$lib/components/Parallax/Parallax.svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	export let item: GridImage;
	export let index: number = 0;
	const { title, content, image, link, color, textColor } = item.fields;

	const imageUrl = image.fields.file.url;
	const isExternalLink = link?.startsWith('http');

	let multiplier = (index % 2) * 1 - 0.5;
</script>

<a
	class:link
	href={link || ''}
	target={isExternalLink ? '_blank' : '_self'}
	class="container"
	style={`background: ${color ?? '#000'};`}
>
	<Parallax direction="y" amount={multiplier * 5}>
		<h2 class="title" style={`color: ${textColor ?? '#fff'}`}>
			{title}
		</h2>
	</Parallax>

	<Parallax direction="x" amount={-multiplier * 2.5}>
		{#if content}
			<div class="content" style={`color: ${textColor ?? '#fff'};`}>
				{@html documentToHtmlString(content)}
			</div>
		{/if}
	</Parallax>

	<img class="background" src={imageUrl} alt={image.fields.title} />
</a>

<style lang="scss">
	.container {
		display: grid;
		place-content: center;
		position: relative;
		height: 100%;
		overflow: hidden;

		text-decoration: none;

		cursor: default;

		&.link {
			cursor: pointer;
		}

		&:hover,
		&:focus-visible {
			.title,
			.content {
				visibility: visible;
				opacity: 1;
			}

			.background {
				opacity: 0.3;
				transform: scale(1.05);
			}
		}
	}

	.title,
	.content {
		visibility: visible;
		opacity: 1;
		transition: visibility 200ms, opacity 200ms, transform 50ms;
	}

	.title {
		max-width: fit-content;
		font-size: 3.5rem;
		letter-spacing: var(--letter-spacing-100);
		font-weight: 800;

		margin: 0 2rem;

		z-index: 1;
	}

	.content {
		margin: 0 2rem 0;
		opacity: 0.7;
		z-index: 1;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		object-fit: cover;

		will-change: transform;

		opacity: 0;
		transform: scale(1);

		transition: opacity 200ms, transform 200ms;
	}
</style>
