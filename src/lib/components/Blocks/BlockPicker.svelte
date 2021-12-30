<script lang="ts">
	import type { PageBlocks } from '$lib/types/contentful';
	import GridBlock from './GridBlock/GridBlock.svelte';
	import IntroBlock from './IntroBlock/IntroBlock.svelte';
	import HeroBlock from './HeroBlock/HeroBlock.svelte';

	export let block: PageBlocks;
	$: blockType = block.sys.contentType.sys.id;

	// map of components for each block type
	const components = {
		introBlock: IntroBlock,
		fullPageBlock: HeroBlock,
		gridBlock: GridBlock
	};

	$: component = components?.[blockType] ?? null;
</script>

<svelte:component this={component} {block} />
