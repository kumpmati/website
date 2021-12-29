<script lang="ts">
	import type { FullPageBlock } from '$lib/types/contentful';
	import SplitSection from '../SplitSection/SplitSection.svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import { scrollPosition } from '$lib/stores/scroll';

	export let block: FullPageBlock;

	const { subheading, content, backgroundImage, textColor, subheadingColor, style, divider } =
		block.fields;
	const imageUrl = backgroundImage?.fields.file.url;

	let element;
	let yOffset = 0;
	let visible = false;

	// update yOffset whenever scroll position is changed
	scrollPosition.subscribe(() => {
		const rect = element?.getBoundingClientRect();
		if (rect) {
			visible = rect.top < 200;
			yOffset = rect.top;
		}
	});
</script>

<SplitSection bind:element offset="35vh" {divider}>
	<p slot="left" class="left" style={`color: ${subheadingColor};`}>
		{subheading}
	</p>

	<div
		slot="right"
		class="right"
		class:difference={style === 'Difference'}
		class:visible
		style={`color: ${textColor}; transform: translateY(${yOffset / 12}px);`}
	>
		{@html documentToHtmlString(content)}
	</div>

	<span slot="background" class="backgroundContainer" class:visible>
		{#if imageUrl}
			<img
				class="background"
				src={imageUrl}
				alt={backgroundImage.fields.title}
				style={`transform: scale(0.8) translateY(${-yOffset / 8}px);`}
			/>
		{/if}
	</span>
</SplitSection>

<style lang="scss">
	.left {
		text-align: right;
		margin-top: 2.5rem;
		letter-spacing: var(--letter-spacing-100);
		font-weight: 700;
	}

	.right {
		position: relative;
		color: var(--text200);
		font-size: 1.25rem;
		margin: 0;

		will-change: transform;

		opacity: 0.25;
		transition: opacity 200ms;

		&.visible {
			opacity: 1;
		}

		&.difference {
			mix-blend-mode: difference;
		}

		:global(*) {
			margin-top: 0;
			margin-bottom: 1rem;
		}

		:global(h1) {
			font-weight: 800;
			letter-spacing: var(--letter-spacing-200);
			font-size: 7rem;
		}
		:global(h2) {
			font-weight: 800;
			letter-spacing: var(--letter-spacing-200);
			font-size: 5rem;
		}
	}

	.backgroundContainer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		transform: scale(1);
		overflow: hidden;

		transition: transform 500ms;

		&.visible {
			transform: scale(1.15);
		}
	}

	.background {
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		/* This prevents white edges when scrolling fast */
		will-change: transform;
	}
</style>
