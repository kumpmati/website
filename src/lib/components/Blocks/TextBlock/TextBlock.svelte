<script lang="ts">
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import type { TextBlock } from '$lib/types/page';
	import { type TimelineStore, timelineSection } from '$lib/stores/timeline';
	import { getContext } from 'svelte';
	import { pageSettings } from '$lib/stores/page';

	export let block: TextBlock;
	export let index: number;

	const { content } = block.fields;

	const timeline = getContext<TimelineStore>('timeline');

	$: isCurrent = $timeline.current === index;

	// change background color when active
	$: if (isCurrent) {
		$pageSettings.backgroundColor = '#fff';
		$pageSettings.textColor = 'Dark';
	}
</script>

<div class="container" class:visible={isCurrent} use:timelineSection={{ timeline, index }}>
	<Markdown value={content} />
</div>

<style lang="scss">
	.container {
		display: block;
		position: relative;
		margin: 5rem auto;
		padding: 5rem 0;
		max-width: 45rem;
		transition: opacity 200ms;
		opacity: 0;

		&.visible {
			opacity: 1;
		}
	}
</style>
