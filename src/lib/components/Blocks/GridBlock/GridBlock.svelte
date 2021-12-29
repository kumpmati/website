<script lang="ts">
	import SplitSection from '$lib/components/SplitSection/SplitSection.svelte';
	import { scrollPosition } from '$lib/stores/scroll';
	import type { GridBlock } from '$lib/types/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import GridImage from './GridImage/GridImage.svelte';
	import { scaleDelayed } from '$lib/utils/transition';
	import { getTileWidth } from '$lib/utils/grid';
	import { fade } from 'svelte/transition';
	import Parallax from '$lib/components/Parallax/Parallax.svelte';

	export let block: GridBlock;
	const { subheading, content, items, columns, layout } = block.fields;

	const style = `display: ${
		layout === 'Normal' ? 'grid' : 'flex'
	};grid-template-columns: repeat(${columns}, 1fr)`;

	let element;
	let yOffset: number = 0;
	$: visible = yOffset < 200;

	// update yOffset whenever scroll position is changed
	scrollPosition.subscribe(() => {
		const rect = element?.getBoundingClientRect();
		if (rect) yOffset = rect.top;
	});
</script>

<SplitSection bind:element fullHeight={false} offset="10rem" style="padding-bottom: 3rem;">
	<span slot="left">
		{#if subheading}
			<p class="subheading">{subheading}</p>
		{/if}
	</span>

	<Parallax amount={2} slot="right">
		<div class="content" class:visible>
			{#if content}
				{@html documentToHtmlString(content)}
			{/if}
		</div>
	</Parallax>
</SplitSection>

<div class="container" style={`min-height: ${Math.ceil(items.length / 2) * 30}rem; ${style}`}>
	{#if visible}
		{#each items as item, index (item.sys.id)}
			<div
				in:scaleDelayed={{ duration: 500, delay: index * 200 }}
				out:fade={{ duration: 200 }}
				style={`width: ${getTileWidth(layout, index)}`}
			>
				<GridImage {item} {index} />
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.container {
		flex-wrap: wrap;
		grid-auto-rows: 30rem;

		margin-bottom: 10rem;

		& > :global(*) {
			height: 30rem;
		}
	}

	@media screen and(max-width: 1000px) {
		.container {
			display: grid !important;
			grid-template-columns: 1fr !important;

			:global(*) {
				width: 100% !important;
			}
		}
	}

	.subheading {
		text-align: right;
		font-weight: 700;
		letter-spacing: var(--letter-spacing-100);
		color: var(--text100);
	}

	.content {
		margin-bottom: 3rem;
		color: var(--text100);
		font-size: 1.25rem;
		opacity: 0.5;

		transition: opacity 200ms;

		&.visible {
			opacity: 1;
		}

		:global(*) {
			margin: 0;
		}

		:global(h1) {
			color: var(--text000);
			font-size: 6rem;
			letter-spacing: var(--letter-spacing-100);
			font-weight: 800;
		}
	}
</style>
