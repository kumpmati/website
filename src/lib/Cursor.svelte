<script lang="ts">
	import { spring } from 'svelte/motion';
	import { isTouchDevice } from './touch';
	import { onMount } from 'svelte';

	let enabled = false;
	let visible = false;
	const size = spring(1, { stiffness: 0.04, damping: 0.25, precision: 0.001 });

	const pos = spring({ x: 0, y: 0 }, { stiffness: 0.04, damping: 0.25, precision: 0.001 });

	onMount(() => {
		if (!isTouchDevice()) enabled = true;
	});
</script>

<svelte:window
	on:mousemove={(e) => {
		visible = true;
		pos.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(0.7)}
	on:mouseup={() => size.set(1)}
/>

{#if visible && enabled}
	<circle
		r={$size * 50}
		stroke="#eee"
		fill="none"
		stroke-width={2}
		cx={$pos.x}
		cy={$pos.y}
		style:opacity={$size ** 4}
	/>
{/if}

<style lang="scss">
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	circle {
		background-color: transparent;
		z-index: 10;
		pointer-events: none;

		animation: fade-in both 3s;
	}
</style>
