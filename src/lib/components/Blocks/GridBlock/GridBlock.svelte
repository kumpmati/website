<script lang="ts">
	import { pageSettings } from '$lib/stores/page';
	import type { GridBlock } from '$lib/types/page';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getContext, onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { fly } from 'svelte/transition';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import { type TimelineStore, timelineSection } from '$lib/stores/timeline';

	export let block: GridBlock;
	export let index: number;
	const { backgroundColor, textColor, content, items } = block.fields;

	const timeline = getContext<TimelineStore>('timeline');

	let element;
	let visible;

	$: if ($timeline.current === index) {
		$pageSettings.backgroundColor = backgroundColor;
		$pageSettings.textColor = textColor;
	}
</script>

<!-- Checks visibility of 'trigger' element -->
<IntersectionObserver {element} threshold={0} bind:intersecting={visible} />

<div
	class="container"
	bind:this={element}
	use:timelineSection={{ timeline, index }}
	style="--text-color: {textColor === 'Dark' ? '#000' : '#fff'}"
>
	{#if content}
		<span class="content">
			<Markdown value={content} />
		</span>
	{/if}

	<ul class="items">
		{#each items as item, index (item.sys.id)}
			<li>
				{#if visible}
					<a
						href={item.fields.link}
						class="item {item.fields.theme}"
						in:fly={{ y: -10, duration: 200, delay: (index + 1) * 150 }}
						out:fly|local={{ y: 0 }}
					>
						<h2>{item.fields.title}</h2>

						<span class="description">
							<SvelteMarkdown source={item.fields.description} />
						</span>
					</a>
				{/if}
			</li>
		{/each}
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
		top: 25%;
		left: -10px;
		height: 75%;
		visibility: hidden;
	}

	.content {
		color: var(--text-color);
	}

	.items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: 0.75rem;
		list-style: none;
		margin: 5rem 0 0 0;
		padding: 0;

		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr;
		}

		li {
			min-height: 13rem;
		}

		.item {
			height: 13rem;
			padding: 2rem 1.5rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-radius: var(--border-radius);
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
				--bg-color: var(--accent);
				--border-color: transparent;
			}

			&.Light {
				--text-color: #000;
				--bg-color: #fff;
				--border-color: transparent;
				box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
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
