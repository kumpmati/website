<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load<{ pageParams: { url: string } }> = async ({ page, fetch }) => {
		const url = page.params.url;

		const res = await fetch(`/api/page?url=${url}`);

		if (res.ok) {
			return {
				status: 200,
				props: {
					page: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error('Error fetching page')
		};
	};
</script>

<script lang="ts">
	import type { Page } from '$lib/types/contentful';
	import BlockPicker from '$lib/components/Blocks/BlockPicker.svelte';

	export let page: Page;
	const { title } = page.fields;
</script>

<svelte:head>
	<title>
		{title}
	</title>
</svelte:head>

{#each page.fields.blocks as block (block.sys.id)}
	<BlockPicker {block} />
{/each}
