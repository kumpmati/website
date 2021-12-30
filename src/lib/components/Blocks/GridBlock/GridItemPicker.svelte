<script lang="ts">
	import type { GridBlockItem } from '$lib/types/contentful';
	import GridColorTile from './GridColorTile/GridColorTile.svelte';
	import GridImage from './GridImage/GridImage.svelte';

	export let item: GridBlockItem;
	export let index: number = 0;
	const blockType = item.sys.contentType.sys.id;

	// map of components for each block type
	const components = {
		gridColorTile: GridColorTile,
		gridImage: GridImage
	};
</script>

<svelte:component this={components?.[blockType] ?? null} {item} {index} />
