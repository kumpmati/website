<script lang="ts">
	import type { TimelineStore } from '$lib/stores/timeline';
	import type { HeroBlock, PageBlock } from '$lib/types/page';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let blocks: PageBlock[];
	const timeline = getContext<TimelineStore>('timeline');

	$: currentPos = Math.max($timeline.current, 0) / (blocks.length - 1);
	$: theme = (blocks[$timeline.current] as HeroBlock).fields?.textColor ?? 'Dark';

	const handleSetCurrent = (index: number) => {
		timeline.setCurrent(index, true); // scroll to newly selected element
	};
</script>

<aside
	class="wrapper"
	style="--color: {theme === 'Dark' ? '#000' : '#fff'}"
	transition:fade={{ duration: 200 }}
>
	<ul class="sections">
		{#each blocks as block, index (block.sys.id + index)}
			<button
				class="section"
				class:visible={$timeline.current === index}
				on:click={() => handleSetCurrent(index)}
			>
				{block.fields.entryTitle}
			</button>
		{/each}

		<div class="bar-container">
			<div class="bar" />

			<!-- Point that tells where in the timeline we are currently -->
			<div class="pointer" style="top: calc({currentPos}*(100% - 8px))" />
		</div>
	</ul>
</aside>

<style lang="scss">
	.wrapper {
		position: fixed;
		margin: 0;
		top: 50%;
		z-index: 50;

		transform: translateY(-50%);
	}

	.sections {
		position: relative;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		list-style: none;

		&:hover {
			.section {
				opacity: 0.5;
				outline: none;
			}
		}

		.section {
			font-size: 14px;
			font-family: var(--font-main);
			color: var(--color);

			display: flex;
			align-items: center;

			background: none;
			border: none;
			cursor: pointer;

			padding: 0;
			margin: 0;
			padding-inline: 1rem;
			height: 2rem;
			opacity: 0;

			transition: opacity 200ms, color 200ms;

			&:hover,
			&:focus-visible,
			&.visible {
				opacity: 1;
			}
		}
	}

	.bar-container {
		--section-height: 2rem;

		position: absolute;
		height: calc(100% - var(--section-height) + 8px);
		top: calc((var(--section-height) / 2) - 4px);
		display: flex;
		pointer-events: none;

		.pointer {
			position: absolute;
			top: 50%;
			width: 8px;
			height: 8px;
			background-color: var(--color);
			border-radius: 100%;

			transition: top 400ms, background-color 200ms;
		}

		.bar {
			position: absolute;
			display: flex;
			width: 8px;
			height: 100%;
			background-color: var(--color);
			border-radius: 16px;
			opacity: 0.15;

			transition: background-color 200ms;
		}
	}
</style>
