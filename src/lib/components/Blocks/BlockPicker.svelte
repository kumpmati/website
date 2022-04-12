<script lang="ts">
	import type { PageBlock } from '$lib/types/page';
	import AccordionBlock from './AccordionBlock/AccordionBlock.svelte';
	import GridBlock from './GridBlock/GridBlock.svelte';
	import HeroBlock from './HeroBlock/HeroBlock.svelte';
	import SkillsBlock from './SkillsBlock/SkillsBlock.svelte';
	import TextBlock from './TextBlock/TextBlock.svelte';

	export let block: PageBlock;
	export let index: number;

	$: blockType = block.sys.contentType.sys.id;

	// map of components for each block type
	const components = {
		fullPageBlock: HeroBlock,
		gridBlock: GridBlock,
		textBlock: TextBlock,
		skillsBlock: SkillsBlock,
		accordionBlock: AccordionBlock
	};

	$: component = components?.[blockType] ?? null;
</script>

<svelte:component this={component} {block} {index} />
