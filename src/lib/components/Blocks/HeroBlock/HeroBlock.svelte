<script lang="ts">
	import type { HeroBlock } from '$lib/types/contentful';
	import { pageSettings, type TimelineStore } from '$lib/stores/page';
	import SvelteMarkdown from 'svelte-markdown';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getContext, onMount } from 'svelte';

	export let block: HeroBlock;
	export let index: number;

	let element;
	let visible;

	const { backgroundColor, textColor } = block.fields;

	const timeline = getContext<TimelineStore>('timeline');

	$: if (visible) {
		timeline.setCurrent(index, false);
	}

	$: if ($timeline.current === index) {
		$pageSettings.backgroundColor = backgroundColor;
		$pageSettings.textColor = textColor;
	}

	// register element so that it can be scrolled into view by timeline
	onMount(() => {
		const unregister = timeline.register(index, element);
		return () => unregister();
	});
</script>

<!-- Checks visibility of 'trigger' element -->
<IntersectionObserver {element} threshold={0.9} bind:intersecting={visible} />

<div
	class="container"
	style="--bg-color: {backgroundColor}; --text-color: {textColor === 'Dark' ? '#000' : '#fff'}"
>
	<span class="trigger" bind:this={element} />

	<span class="content" class:visible>
		<SvelteMarkdown source={block.fields.content} />
	</span>
</div>

<style lang="scss">
	.trigger {
		position: absolute;
		top: 25%;
		height: 10rem;
		visibility: hidden;
	}

	.container {
		position: relative;
		height: max(100vh, 50rem);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 45rem;
		color: var(--text-color);

		:global(p) {
			font-size: 22px;
			margin: 0;
			opacity: 0.5;
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

		@media screen and (max-width: 900px) {
			:global(h1) {
				font-size: 64px;
			}

			:global(h2) {
				font-size: 40px;
			}
		}
	}

	.content {
		opacity: 0;
		transform: translateX(1rem);
		transition: opacity 300ms, transform 300ms;

		&.visible {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
