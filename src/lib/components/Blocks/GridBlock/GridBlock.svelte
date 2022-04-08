<script lang="ts">
	import { pageSettings, type TimelineStore } from '$lib/stores/page';
	import type { GridBlock } from '$lib/types/contentful';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getContext, onMount } from 'svelte';

	export let block: GridBlock;
	export let index: number;
	const { backgroundColor, textColor } = block.fields;

	const timeline = getContext<TimelineStore>('timeline');

	let element;
	let visible;

	$: if (visible) {
		$pageSettings.backgroundColor = backgroundColor;
		timeline.setCurrent(index, false);
	}

	// register element so that it can be scrolled into view by timeline
	onMount(() => {
		const unregister = timeline.register(index, element);
		return () => unregister();
	});
</script>

<!-- Checks visibility of 'trigger' element -->
<IntersectionObserver {element} threshold={0.9} bind:intersecting={visible} />

<div class="container" style="--text-color: {textColor === 'Dark' ? '#000' : '#fff'}">
	<span class="trigger" bind:this={element} />
	<h1>Grid block {backgroundColor} {$timeline.current === index}</h1>
</div>

<style lang="scss">
	.container {
		min-height: max(90vh, 40rem);
		color: var(--text-color);
		position: relative;
	}
	.trigger {
		position: absolute;
		top: 25%;
		height: 10rem;
		visibility: hidden;
	}
</style>
