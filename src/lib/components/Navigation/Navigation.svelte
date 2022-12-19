<script lang="ts">
	import { page } from '$app/stores';
	import { navigation } from '$lib/stores/navigation';
	import { pageSettings } from '$lib/stores/page';
	import X from '../Icons/X.svelte';
	import Menu from '../Icons/Menu.svelte';
	import { fly, fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';

	let nav = $navigation;
	let open = false;

	$: textColor = $pageSettings.textColor === 'Dark' || open ? '#000' : '#fff';

	afterNavigate(() => (open = false));
</script>

<a
	aria-roledescription="logo that links to the homepage"
	class="logo"
	href={base}
	style="color: {textColor};"
>
	mk
</a>

<nav>
	<button
		aria-roledescription="hamburger menu"
		aria-expanded={open}
		on:click={() => (open = !open)}
		class:open
		style="color: {textColor}"
	>
		{#if !open}
			<Menu />
		{:else}
			<X />
		{/if}
	</button>

	{#if open}
		<div class="menu" class:visible={open} transition:fade={{ duration: 200 }}>
			<div
				class="backdrop"
				in:fly={{ x: -2000, duration: 500, opacity: 1 }}
				out:fly={{ x: 0, duration: 500, delay: 200 }}
			/>

			<h2 transition:fly={{ x: 20, delay: 200 }}>menu</h2>
			<ul transition:fly={{ x: 10, delay: 300 }}>
				{#each nav.fields.links as link, index (link.sys.id)}
					<li in:fly={{ x: 10, delay: (index + 1) * 150 }}>
						<a
							href={base + link.fields.url}
							target={link.fields.openInNewTab ? '_blank' : null}
							class:active={$page.url.pathname === link.fields.url}
						>
							{link.fields.text}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>

<style lang="scss">
	.menu {
		background-color: rgba(0, 0, 0, 0.25);
	}

	a {
		text-decoration: none;
		color: var(--text-color);
	}

	.logo {
		position: fixed;
		display: grid;
		place-content: center;
		top: 3rem;
		left: 40px;
		height: 2rem;
		font-weight: 900;
		transition: color 200ms;
		z-index: 100;

		@media screen and (max-width: 400px) {
			top: 16px;
			left: 16px;
		}
	}

	button {
		position: fixed;
		top: 3rem;
		right: 40px;
		display: grid;
		place-content: center;
		background: none;
		border: none;
		border-radius: 100%;
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		color: var(--text-color);
		z-index: 100;
		transition: color 200ms 300ms, transform 200ms;

		&.open {
			transform: rotate(90deg);
		}

		@media screen and (max-width: 400px) {
			right: 16px;
			top: 16px;
		}
	}

	.menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 15vh;
		z-index: 60;

		h2 {
			color: #000;
			font-size: 64px;
			letter-spacing: -0.075em;
			z-index: 1;
		}

		ul {
			z-index: 10;
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			a {
				position: relative;
				display: block;
				font-size: 32px;
				font-weight: 500;
				opacity: 0.5;
				transition: color 200ms, opacity 200ms;
				padding: 0.25rem 1.5rem;

				@media screen and (max-width: 500px) {
					font-size: 24px;
				}

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 100%;
					background: #000;
					border-radius: var(--border-radius);
					z-index: -1;
					opacity: 0;
					transition: width 200ms, opacity 200ms;
				}

				&:hover {
					opacity: 1;
					color: #fff;

					&::after {
						opacity: 1;
						width: 100%;
					}
				}

				&.active {
					opacity: 1;
				}
			}
		}

		.backdrop {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: #fff;
			z-index: 0;
		}
	}
</style>
