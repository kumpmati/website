<script lang="ts">
	import type { HeroBlock } from '$lib/types/contentful';
	import SplitSection from '../../SplitSection/SplitSection.svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import Parallax from '../../Parallax/Parallax.svelte';
	import Visible from '../../Visible/Visible.svelte';
	import Image from '$lib/components/Image/Image.svelte';

	export let block: HeroBlock;

	const { subheading, content, backgroundImage, textColor, subheadingColor, style, divider } =
		block.fields;
	const imageUrl = backgroundImage?.fields.file.url;

	let visible: boolean;
</script>

<Visible threshold={100} bind:visible once>
	<SplitSection {divider} fullHeight style={`background-color: #fff;`}>
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
					<Image
						className="background"
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
		margin-right: 6rem;

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

		:global(p) {
			opacity: 0.75;
		}
	}

	.backgroundContainer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: -1;
		transform: scale(1.25);
		overflow: hidden;
		background: #fff;

		transition: transform 500ms;

		&.visible {
			transform: scale(1.3);
		}

		:global(.background) {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
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

		.subheading {
			height: unset;
		}
	}

	@media screen and (max-width: 950px) {
		.subheading {
			margin: 0;
			text-align: left;
			max-width: 10rem;
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
