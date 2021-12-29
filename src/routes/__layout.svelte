<script context="module" lang="ts">
	import '../globals.scss';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/navigation');

		if (res.ok) {
			return {
				props: {
					nav: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load globals`)
		};
	};
</script>

<script lang="ts">
	import TopNavigation from '$lib/components/Navigation/TopNavigation.svelte';
	import type { Navigation as NavigationT } from '$lib/types/contentful';
	import { scrollPosition } from '$lib/stores/scroll';
	import { navigation } from '$lib/stores/navigation';
	import { onMount } from 'svelte';

	export let nav: NavigationT;

	$navigation = nav;

	onMount(() => ($scrollPosition = window.scrollY));
</script>

<svelte:window on:scroll={() => ($scrollPosition = window.scrollY)} />

<TopNavigation />

<slot />
