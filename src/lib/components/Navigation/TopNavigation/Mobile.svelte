<script lang="ts">
	import type { Navigation } from '$lib/types/contentful';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	export let nav: Navigation;
	export let isOpen: boolean;
</script>

{#if isOpen}
	<div class="links">
		{#each nav?.fields.links ?? [] as link, index (link.sys.id)}
			<a
				class="link"
				on:click={() => (isOpen = false)}
				class:active={$page.path === link.fields.url}
				href={link.fields.url}
				in:fly={{ duration: 200, y: -20, delay: index * 50 }}
				out:fade={{ duration: 200 }}
			>
				{link.fields.text}
			</a>
		{/each}
	</div>
	<div class="backdrop" transition:fade={{ duration: 200 }} />
{/if}

<style lang="scss">
	.backdrop {
		padding: 0 1.25rem;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 120%;
		background-color: white;
		z-index: 1;
	}

	.links {
		font-size: 1.5rem;
		padding: 0 2rem;
		position: fixed;
		top: 5rem;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		z-index: 11;

		a {
			color: #000;
			text-decoration: none;

			transition: font-size 200ms, margin 200ms;

			&.active {
				font-weight: 800;
				margin: 1rem 0;
				font-size: 3rem;
			}
		}
	}

	@media screen and (max-width: 500px) {
		.links {
			padding: 0 1.25rem;
		}
	}
</style>
