<script lang="ts">
	import type { Page } from '$lib/types/contentful';
	import BlockPicker from '$lib/components/Blocks/BlockPicker.svelte';
	import { pageSettings } from '$lib/stores/page';
	import Timeline from '$lib/components/Timeline/Timeline.svelte';
	import { setContext } from 'svelte';
	import { createTimeline } from '$lib/stores/timeline';

	export let page: Page;

	$: blocks = page.fields.blocks;
	$: title = page.fields.title;
	$: timelineEnabled = page.fields.timeline;

	// set default background color
	$pageSettings.backgroundColor = '#fff';

	const timelineStore = createTimeline(blocks, timelineEnabled);
	$: timelineStore.setEnabled(timelineEnabled); // change enabled status based on page

	setContext('timeline', timelineStore);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if timelineEnabled}
	<Timeline {blocks} />
{/if}

{#each blocks as block, index (block.sys.id + index)}
	<BlockPicker {block} {index} />
{/each}
