<script lang="ts">
	import type { PageBlocks } from '$lib/types/contentful';
	import FullPageBlock from './FullPageBlock.svelte';
	import GridBlock from './GridBlock/GridBlock.svelte';
	import IntroBlock from './IntroBlock.svelte';

	export let block: PageBlocks;
	const blockType = block.sys.contentType.sys.id;

	// map of components for each block type
	const components = {
		introBlock: IntroBlock,
		fullPageBlock: FullPageBlock,
		gridBlock: GridBlock
	};
</script>

<svelte:component this={components?.[blockType] ?? null} {block} />
