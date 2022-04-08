<script lang="ts">
	import type { PageBlock } from '$lib/types/contentful';
	import { createEventDispatcher } from 'svelte';

	export let blocks: PageBlock[];
	export let current: number;

	const dispatch = createEventDispatcher();

	$: currentPos = Math.max(current, 0) / (blocks.length - 1);

	const onClick = (index: number) => {
		dispatch('setCurrent', index);
	};
</script>

<aside class="wrapper" style="--color: #000">
	<ul class="sections">
		{#each blocks as block, index (block.sys.id + index)}
			<button class="section" class:visible={current === index} on:click={() => onClick(index)}>
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
		top: 2rem;

		transform: translateY(-50%);
	}

	.sections {
		position: relative;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.section {
			font-family: var(--font-main);
			color: var(--color);

			padding-left: 1rem;
			height: 3rem;
			border: none;
			cursor: pointer;
			background: none;
			opacity: 0;

			transition: opacity 200ms;

			&:hover,
			&:focus-visible,
			&.visible {
				opacity: 1;
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
