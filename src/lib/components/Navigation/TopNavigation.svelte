<script lang="ts">
	import type { Navigation } from '$lib/types/contentful';
	import { page } from '$app/stores';
	import SplitSection from '../SplitSection/SplitSection.svelte';
	import { navigation } from '$lib/stores/navigation';
	import { scrollPosition } from '$lib/stores/scroll';

	const nav: Navigation | null = $navigation;
</script>

<SplitSection
	divider={false}
	fullHeight={false}
	style="position: fixed; width: 100%; z-index: 1000000; mix-blend-mode: difference; padding-bottom: 0rem;"
>
	<nav slot="right" class:visible={$scrollPosition > 800}>
		{#each nav?.fields.links ?? [] as link (link.sys.id)}
			<a class="link" class:active={$page.path === link.fields.url} href={link.fields.url}>
				{link.fields.text}
			</a>
		{/each}
	</nav>
</SplitSection>

<style lang="scss">
	nav {
		position: relative;
		display: flex;
		margin: 1.25rem 0;
		top: -1rem;
		opacity: 0;
		visibility: hidden;

		transition: top 200ms, opacity 200ms, visibility 200ms;

		&.visible {
			top: 0;
			opacity: 1;
			visibility: visible;
		}
	}

	.link {
		position: relative;
		padding: 0.25rem 0.75rem;
		font-weight: 700;
		font-size: 14px;
		margin-right: 2.25rem;
		text-decoration: none;
		letter-spacing: var(--letter-spacing-100);
		color: var(--text200);
		transition: color 100ms;

		&.active {
			display: none;
			font-weight: 800;
			color: var(--text000);
			cursor: default;

			&::before {
				width: 100%;
			}
		}

		&:not(.active):hover {
			color: var(--text000);

			&::before {
				width: 100%;
			}
		}

		&::before {
			content: '';
			display: block;
			background: var(--text300);
			width: 0%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;

			backdrop-filter: blur(5px);

			transition: width 200ms;
		}
	}
</style>
