<script lang="ts">
	import SplitSection from '$lib/components/SplitSection/SplitSection.svelte';
	import type { GridBlock } from '$lib/types/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import { scaleDelayed } from '$lib/utils/transition';
	import { getTileWidth } from '$lib/utils/grid';
	import { fade } from 'svelte/transition';
	import Parallax from '$lib/components/Parallax/Parallax.svelte';
	import Visible from '$lib/components/Visible/Visible.svelte';
	import GridItemPicker from './GridItemPicker.svelte';

	export let block: GridBlock;
	const { subheading, content, items, columns, layout, divider } = block.fields;

	const style = `display: ${
		layout === 'Normal' ? 'grid' : 'flex'
	}; grid-template-columns: repeat(${columns}, 1fr)`;

	let contentVisible: boolean;
	let itemsVisible: boolean;
</script>

<Visible threshold={400} bind:visible={contentVisible} once style="z-index: 0">
	<SplitSection
		fullHeight={false}
		{divider}
		noContent={!subheading && !content}
		style="overflow: hidden;min-height: 0;"
	>
		<Parallax amount={0} slot="left">
			<p class="subheading">{subheading}</p>
		</Parallax>

		<Parallax amount={5} slot="right">
			<div class="content" class:visible={contentVisible}>
				{@html documentToHtmlString(content)}
			</div>
		</Parallax>
	</SplitSection>
</Visible>

<Visible threshold={800} bind:visible={itemsVisible} once style="z-index: 0">
	<div class="container" style={`min-height: ${Math.ceil(items.length / 2) * 10}rem;${style}`}>
		{#each items as item, index (item.sys.id)}
			{#if itemsVisible}
				<div
					in:scaleDelayed|local={{ duration: 500, delay: index * 200 }}
					out:fade|local={{ duration: 200 }}
					style={`width: ${getTileWidth(layout, index)}`}
				>
					<GridItemPicker {item} {index} />
				</div>
			{/if}
		{/each}
	</div>
</Visible>

<style lang="scss">
	.container {
		flex-wrap: wrap;
		grid-auto-rows: unset;

		margin-bottom: 10rem;
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

	@media screen and(max-width: 1100px) {
		.container {
			display: grid !important;
			grid-template-columns: 1fr !important;

			& > :global(*) {
				width: 100% !important;
			}
		}

		.content {
			:global(h1) {
				font-size: 4rem;
			}
		}
	}

	@media screen and(max-width: 950px) {
		.content {
			margin-bottom: 0 !important;
		}

		.subheading {
			text-align: left;
		}
	}

	@media screen and(max-width: 600px) {
		.content {
			:global(h1) {
				font-size: 2.75rem;
			}
		}
	}
</style>
