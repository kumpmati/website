<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { pageSettings } from '$lib/stores/page';
	import type { Homepage } from '$lib/types/page';
	import { onDestroy, onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { fly } from 'svelte/transition';

	export let page: Homepage;

	// set page background
	$pageSettings.backgroundColor = page.fields.backgroundColor;

	let ready = false;
	let showPicture = false;
	let timeout = null;

	const onClickPicture = () => {
		if (showPicture) return;

		showPicture = true;

		// hide picture after a few seconds
		timeout = setTimeout(() => {
			showPicture = false;
		}, 1500);
	};

	onMount(() => (ready = true));
	onDestroy(() => clearTimeout(timeout));
</script>

<svelte:head>
	<title>Matias Kumpulainen</title>
</svelte:head>

<div class="container" style="--bg-col:{page.fields.backgroundColor}">
	<img
		in:fly={{ x: -5 }}
		class:show={showPicture}
		src={page.fields.picture.fields.file.url}
		alt={page.fields.picture.fields.description}
		on:click={onClickPicture}
	/>

	{#if showPicture}
		<h2 in:fly|local={{ y: -5 }} class="hover-text">{page.fields.pictureHoverText}</h2>
	{:else if ready}
		<div in:fly|local={{ y: -10 }}>
			<div class="content">
				<SvelteMarkdown source={page.fields.content} />
			</div>

			<ul class="links" in:fly|local={{ y: -10, delay: 100 }}>
				{#each page.fields.links as link (link.sys.id)}
					<li>
						<a href={link.fields.url}>
							{link.fields.text}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		position: static;
		margin: 0 auto;
		padding-top: calc(50vh - 6rem);
		max-width: 34rem;
		width: 100%;
		min-height: 13rem;
		display: flex;
		flex-direction: row;
		align-items: center;

		@media screen and (max-width: 900px) {
			flex-direction: column-reverse;
			padding-top: max(25vh, 10rem);
			max-width: 22rem;
		}
	}

	.content {
		position: relative;
		z-index: 20;

		:global(p) {
			font-size: 14px;
			margin: 0;
			color: rgba(0, 0, 0, 0.5);
		}

		:global(h1) {
			margin: 0;
			margin-top: 0.5rem;
			line-height: 1em;
			letter-spacing: -0.075em;
			font-size: 64px;

			@media screen and (max-width: 900px) {
				font-size: 55px;
			}

			@media screen and (max-width: 300px) {
				font-size: 45px;
			}
		}
	}

	.links {
		position: relative;
		z-index: 1;
		list-style: none;
		display: flex;
		gap: 0.5rem;
		margin: 0;
		padding: 2rem 0 0 0;

		@media screen and (max-width: 300px) {
			padding-left: 0;
			justify-content: space-between;
		}

		a {
			display: block;
			position: relative;
			font-size: 14px;
			color: rgba(0, 0, 0, 0.5);
			text-decoration: none;
			transition: color 200ms;
			padding: 0.25rem 1rem;

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				background: #000;
				border-radius: 3px;
				z-index: -1;
				width: 0;
				opacity: 0;
				transition: width 200ms, opacity 200ms;
			}

			&:hover {
				color: var(--bg-col);

				&::after {
					opacity: 1;
					width: 100%;
				}
			}

			@media screen and (max-width: 300px) {
				margin-right: 0;
			}
		}
	}

	img {
		margin-right: 1rem;
		width: 100%;
		height: auto;
		max-height: 16rem;
		max-width: 12rem;
		object-fit: contain;
		object-position: center right;
		cursor: pointer;
		mix-blend-mode: color;
		z-index: 0;
		user-select: none;

		transition: transform 200ms;

		&:hover {
			transform: scale(1.05);
		}

		@media screen and (max-width: 900px) {
			margin-right: 0;
			max-height: min(25rem, 50vh);
			max-width: 20rem;
			width: 90%;
			position: absolute;
			left: 50%;
			top: unset;
			bottom: 0;
			transform: translateX(-50%);
			object-position: center bottom;
			transform-origin: bottom center;

			&:hover {
				transform: scale(1.05) translateX(-50%);
			}
		}

		&.show {
			transform: scale(1.125);
			mix-blend-mode: normal;
			cursor: default;

			@media screen and (max-width: 900px) {
				transform: scale(1.125) translateX(-50%);
				bottom: 0;
			}
		}
	}

	.hover-text {
		position: relative;
		top: 0rem;
		left: 1rem;
		margin: 0;
		font-size: 40px;

		@media screen and (max-width: 900px) {
			text-align: center;
			position: absolute;
			left: unset;
			top: unset;
			bottom: min(calc(100vh - 5rem), 30rem);
		}
	}
</style>
