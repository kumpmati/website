<script lang="ts">
	import type { TimelineStore } from '$lib/stores/timeline';
	import type { HeroBlock, PageBlock } from '$lib/types/page';
	import { getContext } from 'svelte';

	export let blocks: PageBlock[];

	const timeline = getContext<TimelineStore>('timeline');

	$: currentPos = Math.max($timeline.current, 0) / (blocks.length - 1);
	$: theme = (blocks[$timeline.current] as HeroBlock).fields?.textColor ?? 'Dark';
</script>

<div class="wrapper" style="--text-color: {theme === 'Dark' ? '#000' : '#fff'}">
	<div class="barContainer">
		<div class="bar" />

		<!-- Point that tells where in the timeline we are currently -->
		<div class="pointer" style="left: calc({currentPos} * (100% - 8px))">
			<p class="sectionTitle">{blocks[$timeline.current]?.fields.entryTitle}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: fixed;
		margin: 0;
		top: calc(6.75rem / 2);
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 50;
		width: 5rem;

		@media screen and (max-width: 400px) {
			top: calc(4rem / 2);
		}

		&:hover .sectionTitle {
			opacity: 1;
		}
	}

	.barContainer {
		width: 100%;
		height: 8px;
		top: 0;
		display: flex;
		pointer-events: none;

		.pointer {
			position: absolute;
			top: 0;
			width: 8px;
			height: 8px;
			background-color: var(--text-color);
			border-radius: 100%;

			transition: left 400ms, background-color 200ms;
		}

		.bar {
			position: absolute;
			display: flex;
			width: 100%;
			height: 8px;
			background-color: var(--text-color);
			border-radius: 16px;
			opacity: 0.15;

			transition: background-color 200ms;
		}
	}

	.sectionTitle {
		color: var(--text-color);
		position: absolute;
		width: max-content;
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity 200ms;
	}
</style>
