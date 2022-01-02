<script lang="ts">
	import SplitSection from '$lib/components/SplitSection/SplitSection.svelte';
	import Visible from '$lib/components/Visible/Visible.svelte';
	import type { TextBlock } from '$lib/types/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	export let block: TextBlock;
	const { subheading, content, divider, textColor, subheadingColor } = block.fields;

	let visible: boolean;
</script>

<Visible bind:visible threshold={500}>
	<SplitSection fullHeight={false} {divider}>
		<div slot="left" class="subheading" style={`color: ${subheadingColor ?? '#000'}`}>
			{subheading ?? ''}
		</div>

		<div slot="right">
			<div class="content" class:visible style={`color: ${textColor ?? '#000'}`}>
				{@html documentToHtmlString(content)}
			</div>
		</div>
	</SplitSection>
</Visible>

<style lang="scss">
	.subheading {
		font-size: 18px;
		text-align: right;
		margin: 5rem 0 5rem 1rem;
		letter-spacing: var(--letter-spacing-100);
		font-weight: 700;
		color: var(--text200);
	}

	.content {
		position: relative;
		color: var(--text000);
		font-size: 1.25rem;
		margin: 5rem 2rem 5rem 0;
		max-width: 50rem;

		will-change: transform;

		opacity: 0.25;
		transition: opacity 200ms;

		&.visible {
			opacity: 1;
		}

		:global(*) {
			margin-top: 0;
			margin-bottom: 1rem;
		}

		:global(h1) {
			font-weight: 800;
			letter-spacing: var(--letter-spacing-200);
			font-size: 6rem;
		}
		:global(h2) {
			font-weight: 800;
			letter-spacing: var(--letter-spacing-200);
			font-size: 4rem;
		}

		:global(p) {
			opacity: 0.75;
		}

		:global(a) {
			color: inherit;
			display: inline-block;
			opacity: 1;
			font-weight: 400;
			font-size: 1.25em;

			&:hover {
				opacity: 0.5;
			}
		}
	}

	@media screen and (max-width: 950px) {
		.subheading {
			text-align: left;
			margin: 0;
			margin-top: 10rem;
		}

		.content {
			margin-top: 0;
			margin-right: 0;
		}
	}

	@media screen and (max-width: 600px) {
		.subheading {
			margin-left: 0;
		}

		.content {
			:global(h1) {
				font-size: 2.5rem;
			}
			:global(h2) {
				font-size: 2rem;
			}
		}
	}
</style>
