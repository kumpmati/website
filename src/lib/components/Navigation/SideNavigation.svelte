<script lang="ts">
	import type { Navigation } from '$lib/types/contentful';
	import { navigation } from '$lib/stores/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let style: string = '';

	const nav: Navigation | null = $navigation;

	let path: string;

	onMount(() => {
		// only get path when mounting, do not update when page changes
		path = $page.path;
	});
</script>

<nav {style}>
	{#each nav?.fields.links ?? [] as link (link.sys.id)}
		<a class="link" class:active={path === link.fields.url} href={link.fields.url}>
			{link.fields.text}
		</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 1.25rem 0;
		margin-top: 5rem;
	}

	.link {
		width: max-content;
		text-align: right;
		position: relative;
		padding: 0.4rem 0;
		font-weight: 700;
		font-size: 1rem;
		text-decoration: none;
		letter-spacing: var(--letter-spacing-100);
		color: var(--text100);
		transition: color 100ms;

		&.active {
			display: none;
			font-weight: 800;
			color: var(--text300);
			cursor: default;

			&::before {
				width: calc(100% + 2rem);
			}
		}

		&:not(.active):hover {
			color: var(--text300);

			&::before {
				width: calc(100% + 2rem);
			}
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: -1rem;
			background: var(--text000);
			width: 0%;
			height: 100%;
			z-index: -1;

			transition: width 200ms;
		}
	}
</style>
