<script lang="ts">
	import type { HeroBlock } from '$lib/types/page';
	import { pageSettings } from '$lib/stores/page';
	import SvelteMarkdown from 'svelte-markdown';
	import { getContext } from 'svelte';
	import { type TimelineStore, timelineSection } from '$lib/stores/timeline';

	export let block: HeroBlock;
	export let index: number;

	const { backgroundColor, textColor } = block.fields;
	const timeline = getContext<TimelineStore>('timeline');

	$: isCurrent = $timeline.current === index;

	$: if (isCurrent) {
		$pageSettings.backgroundColor = backgroundColor;
		$pageSettings.textColor = textColor;
	}
</script>

<div
	class="container"
	use:timelineSection={{ timeline, index }}
	style="--bg-color: {backgroundColor}; --text-color: {textColor === 'Dark' ? '#000' : '#fff'}"
>
	<span class="content" class:visible={isCurrent}>
		<SvelteMarkdown source={block.fields.content} />
	</span>
</div>

<style lang="scss">
	.container {
		position: relative;
		height: fit-content;
		margin: 15rem auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 45rem;
		color: var(--text-color);
	}

	.content {
		opacity: 0;
		transform: translateX(1rem);
		transition: opacity 300ms, transform 300ms;

		animation: fly 500ms both;

		&.visible {
			opacity: 1;
			transform: translateX(0);
		}

		:global(h1) {
			font-size: 96px;
			margin-top: 0;
			margin-bottom: 0.75em;
		}

		:global(h2) {
			font-size: 64px;
			margin-top: 0;
			margin-bottom: 1.25rem;
		}

		:global(p) {
			font-size: 22px;
			margin: 0;
			opacity: 0.5;
		}

		// tablet
		@media screen and (max-width: 900px) {
			:global(h1) {
				font-size: 80px;
			}

			:global(h2) {
				font-size: 40px;
			}

			:global(p) {
				font-size: 18px;
			}
		}

		// mobile
		@media screen and (max-width: 500px) {
			:global(h1) {
				font-size: 48px;
			}

			:global(h2) {
				font-size: 36px;
			}
		}
	}

	@keyframes fly {
		from {
			transform: translateX(-1rem);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
