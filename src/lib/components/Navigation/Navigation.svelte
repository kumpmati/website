<script lang="ts">
	import { pageSettings } from '$lib/stores/page';

	import type { Navigation } from '$lib/types/contentful';
	import Menu from '../icons/Menu.svelte';
	import X from '../icons/X.svelte';

	export let nav: Navigation;

	let open = false;
</script>

<nav style="--text-color: {$pageSettings.textColor === 'Dark' ? '#000' : '#fff'}">
	<a href="/">mk</a>

	<button on:click={() => (open = !open)}>
		{#if !open}
			<Menu />
		{:else}
			<X />
		{/if}
	</button>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 6.75rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-inline: 40px;

		@media screen and (max-width: 400px) {
			padding-inline: 20px;
		}
	}

	a {
		text-decoration: none;
		font-weight: 900;
		color: var(--text-color);
	}

	button {
		display: grid;
		place-content: center;
		background: none;
		border: none;
		border-radius: 100%;
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		color: var(--text-color);
	}
</style>
