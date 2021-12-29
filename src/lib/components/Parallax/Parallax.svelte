<script lang="ts">
	import { scrollPosition } from '$lib/stores/scroll';

	export let direction: 'x' | 'y' = 'y';
	export let amount: number = 1;
	export let className: string = '';
	export let style: string = '';

	let element: HTMLDivElement;
	let offset = 0;
	let multiplier = amount / 100;

	$: styleString = `transform: translate${direction.toUpperCase()}(${
		offset * multiplier
	}px) ${style}`;

	scrollPosition.subscribe(() => {
		const rect = element?.getBoundingClientRect();
		if (rect) {
			offset = rect.top;
		}
	});
</script>

<div bind:this={element} class={`container ${className}`} style={styleString}>
	<slot />
</div>

<style lang="scss">
	.container {
		margin: 0;
		padding: 0;
		transition: transform 50ms;
	}
</style>
