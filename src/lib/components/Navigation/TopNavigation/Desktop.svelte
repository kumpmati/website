<script lang="ts">
	import { page } from '$app/stores';

	import type { Navigation } from '$lib/types/contentful';

	export let nav: Navigation;
</script>

{#each nav?.fields.links ?? [] as link (link.sys.id)}
	<a
		class="link"
		sveltekit:prefetch
		class:active={$page.path === link.fields.url}
		href={link.fields.url}
	>
		{link.fields.text}
	</a>
{/each}

<style lang="scss">
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
