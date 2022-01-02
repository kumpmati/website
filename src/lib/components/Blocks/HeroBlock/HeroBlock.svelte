<script lang="ts">
	import type { HeroBlock } from '$lib/types/contentful';
	import SplitSection from '../../SplitSection/SplitSection.svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import Parallax from '../../Parallax/Parallax.svelte';
	import Visible from '../../Visible/Visible.svelte';

	export let block: HeroBlock;

	const { subheading, content, backgroundImage, textColor, subheadingColor, style, divider, size } =
		block.fields;
	const imageUrl = backgroundImage?.fields.file.url;

	let visible: boolean;
	let isFullPage = size === 'Full Page';
</script>

<Visible threshold={isFullPage ? 100 : 250} bind:visible once>
	<SplitSection {divider} fullHeight={isFullPage} style={`background-color: #fff;`}>
		<p slot="left" class="subheading" style={`color: ${subheadingColor};`}>
			{subheading ?? ''}
		</p>

		<div
			slot="right"
			class="content"
			class:difference={style === 'Difference'}
			class:visible
			style={`color: ${textColor}; `}
		>
			<Parallax amount={10}>
				{@html documentToHtmlString(content)}
			</Parallax>
		</div>

		<span slot="background" class="backgroundContainer" class:visible>
			{#if imageUrl}
				<Parallax
					amount={-20}
					style="width: 100%; height: calc(100% + 10rem); top: -5rem; position: relative"
				>
					<img
						class="background"
						src={imageUrl}
						alt={backgroundImage.fields.title}
						style={`transform: scale(0.8)`}
					/>
				</Parallax>
			{/if}
		</span>
	</SplitSection>
</Visible>

<style lang="scss">
	.subheading {
		font-size: 18px;
		text-align: right;
		margin: 2.5rem 0 0 1rem;
		letter-spacing: var(--letter-spacing-100);
		font-weight: 700;
	}

	.content {
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
		transform: scale(1.25);
		overflow: hidden;

		transition: transform 500ms;

		&.visible {
			transform: scale(1.3);
		}
	}

	.background {
		object-fit: cover;
		width: 100%;
		height: 100%;

		/* This prevents white edges when scrolling fast */
		will-change: transform;
	}

	@media screen and (max-width: 1200px) {
		.content {
			:global(h1) {
				font-size: 4rem;
			}
			:global(h2) {
				font-size: 3.5rem;
			}
		}
	}

	@media screen and (max-width: 950px) {
		.subheading {
			margin: 0;
			text-align: left;
			max-width: 10rem;
			padding-top: 5rem;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: flex-start;
		}

		.backgroundContainer.visible {
			transform: scale(1.3);
		}
	}

	@media screen and (max-width: 600px) {
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
