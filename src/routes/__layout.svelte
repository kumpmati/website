<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const res = await fetch('/api/navigation');

		if (res.ok) {
			return {
				props: {
					key: url.pathname,
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
	import '../globals.scss'; // global css file
	import Navigation from '$lib/components/Navigation/Navigation.svelte';
	import type { Navigation as NavigationT } from '$lib/types/contentful';
	import { navigation } from '$lib/stores/navigation';
	import PageTransition from '$lib/components/PageTransition/PageTransition.svelte';
	import { pageSettings, scrollPosition } from '$lib/stores/page';
	import { browser } from '$app/env';
	import { page } from '$app/stores';

	export let nav: NavigationT;
	export let key: string;

	$navigation = nav;
	$scrollPosition = 0;

	// sets the body and html element background color to match the page settings
	$: {
		if (browser) {
			document.body.style.backgroundColor = $pageSettings.backgroundColor;
			document.querySelector('html').style.backgroundColor = $pageSettings.backgroundColor;
		}
	}
</script>

<svelte:window
	on:resize={() => ($scrollPosition = window.scrollY)}
	on:scroll={() => ($scrollPosition = window.scrollY)}
/>

{#if $page.url.pathname !== '/'}
	<Navigation />
{/if}

<PageTransition {key}>
	<main>
		<!-- Page content -->
		<slot />

		<!-- Footer -->
	</main>
</PageTransition>

<style lang="scss">
	main {
		margin-inline: 40px;

		@media screen and (max-width: 400px) {
			margin-inline: 20px;
		}
	}
</style>
