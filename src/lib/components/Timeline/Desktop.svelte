<script lang="ts">
	import type { TimelineStore } from '$lib/stores/page';
	import type { HeroBlock, PageBlock } from '$lib/types/contentful';
	import { getContext } from 'svelte';

	export let blocks: PageBlock[];
	const timeline = getContext<TimelineStore>('timeline');

	$: currentPos = Math.max($timeline.current, 0) / (blocks.length - 1);

	$: theme = (blocks[$timeline.current] as HeroBlock).fields?.textColor ?? 'Dark';
</script>

<aside class="wrapper" style="--color: {theme === 'Dark' ? '#000' : '#fff'}">
	<ul class="sections">
		{#each blocks as block, index (block.sys.id + index)}
			<button
				class="section"
				class:visible={$timeline.current === index}
				on:click={() => timeline.setCurrent(index, true)}
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
			padding-left: 1rem;
			height: 3rem;
			opacity: 0;

			transition: opacity 200ms;

			&.visible {
				opacity: 1;
				outline: none;
			}
			&:hover,
			&:focus-visible {
				opacity: 0.5;
				outline: none;
			}
		}
	}

	.bar-container {
		position: absolute;
		height: calc(100% - 3rem + 8px);
		top: calc(1.5rem - 4px);
		display: flex;
		pointer-events: none;

		.pointer {
			position: absolute;
			top: 50%;
			width: 8px;
			height: 8px;
			background: var(--color);
			border-radius: 100%;

			transition: top 200ms;
		}

		.bar {
			position: absolute;
			display: flex;
			width: 8px;
			height: 100%;
			background: var(--color);
			border-radius: 16px;
			opacity: 0.15;
		}
	}
</style>