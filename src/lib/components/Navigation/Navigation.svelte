<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { navigation } from '$lib/stores/navigation';
	import { pageSettings } from '$lib/stores/page';
	import Menu from '../icons/Menu.svelte';
	import X from '../icons/X.svelte';
	import { fly, fade } from 'svelte/transition';

	let nav = $navigation;
	let open = false;

	const closeOnNavigateComplete = () => {
		setTimeout(() => (open = false), 250);
	};
</script>

<nav
	transition:fade={{ duration: 200 }}
	style="--text-color: {$pageSettings.textColor === 'Dark' || open ? '#000' : '#fff'}"
>
	<a class="logo" href="/">mk</a>

	<button on:click={() => (open = !open)}>
		{#if !open}
			<Menu />
		{:else}
			<X />
		{/if}
	</button>
</nav>

{#if open}
	<div class="menu">
		<div
			class="backdrop"
			in:fly={{ x: -2000, duration: 500 }}
			out:fly={{ x: 0, duration: 500, delay: 200 }}
		/>

		<h2 transition:fly={{ x: 20, delay: 200 }}>menu</h2>
		<ul transition:fly={{ x: 10, delay: 300 }}>
			{#each nav.fields.links as link, index (link.sys.id)}
				<li in:fly={{ x: 10, delay: (index + 2) * 150 }}>
					<a
						href={link.fields.url}
						target={link.fields.openInNewTab ? '_blank' : null}
						class:active={$page.url.pathname === link.fields.url}
						on:click={closeOnNavigateComplete}
					>
						{link.fields.text}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}

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
		color: var(--text-color);
	}

	.logo {
		font-weight: 900;
		transition: color 200ms;
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
		transition: color 200ms;
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
				margin-bottom: 0.5rem;
				padding: 0.25rem 1.5rem;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 100%;
					background: #000;
					border-radius: 3px;
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
