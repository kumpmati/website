<script lang="ts">
	import type { Page } from '$lib/types/contentful';
	import BlockPicker from '$lib/components/Blocks/BlockPicker.svelte';

	export let page: Page;

	$: blocks = page.fields.blocks;
	$: title = page.fields.title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#each blocks as block, index (block.sys.id)}
	<BlockPicker {block} {index} />
{/each}
