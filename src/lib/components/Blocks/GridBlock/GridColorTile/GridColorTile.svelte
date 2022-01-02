<script lang="ts">
	import type { GridColorTile } from '$lib/types/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	export let item: GridColorTile;
	const { title, content, image, link, color, textColor } = item.fields;

	const imageUrl = image.fields.file.url;
	const isExternalLink = link?.startsWith('http');
</script>

<a
	class:link
	href={link || ''}
	target={isExternalLink ? '_blank' : ''}
	class="container"
	style={`background: ${color ?? '#000'};`}
>
	<h2 class="title" style={`color: ${textColor ?? '#fff'}`}>
		{title}
	</h2>

	{#if content}
		<div class="content" style={`color: ${textColor ?? '#fff'};`}>
			{@html documentToHtmlString(content)}
		</div>
	{/if}

	<img class="background" src={imageUrl} alt={image.fields.title} />
</a>

<style lang="scss">
	.container {
		display: grid;
		place-content: center;
		position: relative;
		height: 25rem;
		width: 100%;
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
				opacity: 0.25;
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
		z-index: 5;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		object-fit: cover;
		pointer-events: none;

		will-change: transform;

		opacity: 0;
		transform: scale(1);

		transition: opacity 200ms, transform 200ms;
	}

	@media screen and (max-width: 950px) {
		.container {
			height: 20rem;
		}

		.title {
			font-size: 2.5rem;
		}

		.content {
			width: calc(100% - 2rem) !important;
		}
		.title,
		.content {
			margin: 0 1rem;
		}
	}

	@media screen and (max-width: 600px) {
		.container {
			height: 20rem;
		}
	}
</style>
