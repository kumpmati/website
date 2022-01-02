<script lang="ts">
	import type { Navigation } from '$lib/types/contentful';
	import { navigation } from '$lib/stores/navigation';
	import { pageSettings, scrollPosition } from '$lib/stores/page';
	import Mobile from './Mobile.svelte';
	import Desktop from './Desktop.svelte';
	import { onMount } from 'svelte';
	import { MenuIcon, XIcon } from 'svelte-feather-icons';

	const nav: Navigation | null = $navigation;

	$: visible = $scrollPosition >= $pageSettings.navigationVisibleThreshold;
	$: isMobile = false;
	$: isOpen = false;

	onMount(() => {
		const update = () => {
			isMobile = window.matchMedia('(max-width: 950px)').matches;
		};

		// call function on mount
		update();

		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	});
</script>

{#if visible}
	<h1 title="Matias Kumpulainen">
		<a href="/">MK</a>
	</h1>

	<nav class:visible>
		<svelte:component this={isMobile ? Mobile : Desktop} {nav} bind:isOpen />
	</nav>

	{#if isMobile}
		<button class="burger" class:open={isOpen} on:click={() => (isOpen = !isOpen)}>
			<svelte:component this={isOpen ? XIcon : MenuIcon} size="24" />
		</button>
	{/if}
{/if}

<style lang="scss">
	h1 {
		mix-blend-mode: difference;
		color: #fff;
		margin: 0;
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.25rem;
		position: fixed;
		top: 1.25rem;
		left: 2rem;
		z-index: 101;

		a {
			text-decoration: none;
			color: inherit;
		}
	}

	nav {
		position: fixed;
		display: flex;
		width: 75%;
		margin: 1.25rem 0 0 25%;
		padding: 0 2rem;
		z-index: 100;
		isolation: unset;
	}

	.burger {
		position: fixed;
		top: 1.25rem;
		right: 1rem;
		padding: 0;
		display: grid;
		place-content: center;
		background: none;
		border: none;
		margin-left: auto;
		margin-right: 1.25rem;
		color: #fff;
		mix-blend-mode: difference;
		z-index: 1000;
		cursor: pointer;

		transition: transform 200ms;

		&.open {
			transform: rotate(180deg);
		}
	}

	@media screen and (max-width: 950px) {
		nav {
			padding: 0;
		}
	}

	@media screen and (max-width: 500px) {
		h1 {
			left: 1rem;
		}
	}
</style>
