<script lang="ts">
	import { pageSettings, type TimelineStore } from '$lib/stores/page';
	import type { GridBlock } from '$lib/types/contentful';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getContext, onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { fly } from 'svelte/transition';

	export let block: GridBlock;
	export let index: number;
	const { backgroundColor, textColor, content, items } = block.fields;

	const timeline = getContext<TimelineStore>('timeline');

	let element;
	let visible;

	$: if (visible) {
		timeline.setCurrent(index, false);
		$pageSettings.backgroundColor = backgroundColor;
		$pageSettings.textColor = textColor;
	}

	$: if ($timeline.current === index) {
		$pageSettings.backgroundColor = backgroundColor;
		$pageSettings.textColor = textColor;
	}

	// register element so that it can be scrolled into view by timeline
	onMount(() => {
		const unregister = timeline.register(index, element);
		return () => unregister?.();
	});
</script>

<!-- Checks visibility of 'trigger' element -->
<IntersectionObserver {element} threshold={0.75} bind:intersecting={visible} />

<div class="container" style="--text-color: {textColor === 'Dark' ? '#000' : '#fff'}">
	<span class="trigger" bind:this={element} />

	{#if content}
		<span class="content">
			<SvelteMarkdown source={content} />
		</span>
	{/if}

	<ul class="items">
		{#if visible}
			{#each items as item, index (item.sys.id)}
				<li in:fly={{ y: -25, delay: (index + 1) * 100 }} out:fly|local={{ y: -25, delay: 0 }}>
					<a href={item.fields.link} class="item {item.fields.theme}">
						<h2>{item.fields.title}</h2>

						<span class="description">
							<SvelteMarkdown source={item.fields.description} />
						</span>
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</div>

<style lang="scss">
	.container {
		height: fit-content;
		color: var(--text-color);
		position: relative;
		max-width: 45rem;
		margin: 15rem auto;
		padding: 5rem 0;
	}

	.trigger {
		position: absolute;
		top: 0;
		height: 100%;
		visibility: hidden;
	}

	.content {
		color: var(--text-color);

		:global(p) {
			opacity: 0.5;
			font-size: 22px;
		}
	}

	.items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: 0.75rem;
		list-style: none;
		margin: 5rem 0 0 0;

		padding: 0;

		.item {
			height: 13rem;
			padding: 2rem 1.5rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-radius: 3px;
			text-decoration: none;
			transition: transform 200ms;

			&:hover {
				transform: translateY(-0.25rem);
			}

			// theme colors
			color: var(--text-color, #000);
			background: var(--bg-color, #fff);
			border: 2px solid var(--border-color, transparent);

			&.Accent {
				--text-color: #000;
				--bg-color: #a6ff8f;
				--border-color: transparent;
			}

			&.Light {
				--text-color: #000;
				--bg-color: #fff;
				--border-color: transparent;
			}

			&.Dark {
				--text-color: #fff;
				--bg-color: #000;
				--border-color: #fff;
			}

			.description {
				:global(p) {
					margin: 0;
					font-size: 14px;
					opacity: 0.5;
				}
			}

			h2 {
				font-size: 24px;
				margin: 0;
			}
		}
	}
</style>
