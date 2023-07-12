<script lang="ts">
	import { shapes } from './stores';
	import Shape from './Shape.svelte';

	export let zIndex: number;

	let w: number, h: number;
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<svg viewBox="viewcircles 0 {w} {h}" filter="url(#goo)" style:z-index={zIndex}>
	{#each $shapes as data (data.id)}
		<Shape {data} />
	{/each}
</svg>

<style lang="scss">
	svg {
		position: absolute;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
