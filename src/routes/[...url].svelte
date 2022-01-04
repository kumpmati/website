<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load<{ pageParams: { url: string } }> = async ({ params, fetch }) => {
		const url = params.url;

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
			error: new Error('Page not found')
		};
	};
</script>

<script lang="ts">
	import type { Page } from '$lib/types/contentful';
	import BlockPicker from '$lib/components/Blocks/BlockPicker.svelte';
	import { browser } from '$app/env';
	import { pageSettings } from '$lib/stores/page';

	export let page: Page;

	$: backgroundColor = page.fields.backgroundColor ?? '#fff';
	$: blocks = page.fields.blocks;
	$: title = page.fields.title;

	// hide navigation when intro block is first
	$: {
		const hasIntroBlockFirst = blocks?.[0].sys.contentType.sys.id === 'introBlock';
		$pageSettings.navigationVisibleThreshold = hasIntroBlockFirst ? 800 : 0;
	}

	// set background color
	$: {
		if (browser) {
			$pageSettings.backgroundColor = backgroundColor;
			document.body.style.backgroundColor = backgroundColor;
			document.body.style.transition = 'background-color 500ms';
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#each blocks as block, index (block.sys.id)}
	<BlockPicker {block} {index} />
{/each}
