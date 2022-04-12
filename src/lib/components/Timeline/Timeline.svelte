<script lang="ts">
	import type { PageBlock } from '$lib/types/page';
	import { onMount } from 'svelte';
	import DesktopTimeline from './Desktop.svelte';
	import MobileTimeline from './Mobile.svelte';

	export let blocks: PageBlock[];

	$: isMobile = false;

	onMount(() => {
		const update = () => {
			isMobile = window.matchMedia('(max-width: 900px)').matches;
		};

		// call function on mount
		update();

		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	});
</script>

<svelte:component this={isMobile ? MobileTimeline : DesktopTimeline} {blocks} />
