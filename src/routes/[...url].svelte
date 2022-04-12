<script lang="ts">
	import type { Page } from '$lib/types/page';
	import BlockPicker from '$lib/components/Blocks/BlockPicker.svelte';
	import { pageSettings } from '$lib/stores/page';
	import Timeline from '$lib/components/Timeline/Timeline.svelte';
	import { setContext } from 'svelte';
	import { createTimeline } from '$lib/stores/timeline';

	export let page: Page;

	const { blocks, title, timeline: timelineEnabled } = page.fields;

	const timelineStore = createTimeline(blocks, timelineEnabled);
	$: timelineStore.setEnabled(timelineEnabled); // change enabled status based on page

	setContext('timeline', timelineStore);

	// set fallback background color
	$pageSettings.backgroundColor = '#fff';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div>
	{#if timelineEnabled}
		<Timeline {blocks} />
	{/if}

	{#each blocks as block, index (block.sys.id + index)}
		<BlockPicker {block} {index} />
	{/each}
</div>

<style>
	div {
		padding-bottom: 20rem;
	}
</style>
