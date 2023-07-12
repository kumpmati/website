<script lang="ts">
	import { spring } from 'svelte/motion';

	const size = spring(1, { stiffness: 0.04, damping: 0.25, precision: 0.001 });

	const pos = spring(
		{ x: 1920 / 2, y: 1080 / 2 },
		{ stiffness: 0.04, damping: 0.25, precision: 0.001 }
	);
</script>

<svelte:window
	on:mousemove={(e) => {
		pos.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(0.7)}
	on:mouseup={() => size.set(1)}
/>

<div
	style:transform="translate({$pos.x - 50}px, {$pos.y - 50}px) scale({$size})"
	style:opacity={$size ** 4}
/>

<style lang="scss">
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
		border-radius: 100%;
		background-color: transparent;
		border: 2px solid #eee;
		z-index: 10;
		pointer-events: none;
	}
</style>
