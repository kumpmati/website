<script lang="ts">
	import { pageSettings, type TimelineStore } from '$lib/stores/page';
	import type { AccordionBlock, GridItem } from '$lib/types/contentful';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getContext, onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import X from '$lib/components/icons/X.svelte';

	export let block: AccordionBlock;
	export let index: number;
	const { backgroundColor, textColor, content, items } = block.fields;

	const timeline = getContext<TimelineStore>('timeline');

	let element;
	let visible;

	// item currently shown
	let activeItem: GridItem | null = null;

	$: {
		if (visible) {
			timeline.setCurrent(index, false);
		} else {
			// close modal when not visible any more
			activeItem = null;
		}
	}

	$: {
		// change background color when active
		if ($timeline.current === index) {
			$pageSettings.backgroundColor = backgroundColor;
			$pageSettings.textColor = textColor;
		}
	}

	const handleOpenModal = (item: GridItem) => (activeItem = item);
	const handleCloseModal = () => (activeItem = null);

	// register element so that it can be scrolled into view by timeline
	onMount(() => {
		const unregister = timeline.register(index, element);
		return () => unregister();
	});
</script>

<!-- Checks visibility of 'trigger' element -->
<IntersectionObserver {element} threshold={0.5} bind:intersecting={visible} />

<!-- Content -->
<div class="container" style="--text-color: {textColor === 'Dark' ? '#000' : '#fff'}">
	<span class="trigger" bind:this={element} />

	{#if content}
		<span class="content">
			<SvelteMarkdown source={content} />
		</span>
	{/if}

	<ul class="items" class:opened={!!activeItem}>
		{#if visible}
			{#each items as item, index (item.sys.id)}
				<a
					in:fly={{ y: -25, delay: index * 100 }}
					animate:flip={{ duration: 200 }}
					href={item.fields.link}
					class="item {item.fields.theme}"
					class:collapsed={activeItem && activeItem.sys.id !== item.sys.id}
					class:opened={activeItem?.sys.id === item.sys.id}
				>
					{#if activeItem?.sys.id === item.sys.id}
						<button class="closeButton" on:click={handleCloseModal}>
							<X />
						</button>

						<span class="itemContent">
							<SvelteMarkdown source={item.fields.description} />
						</span>
					{:else}
						<button class="openButton" on:click={() => handleOpenModal(item)}>
							{item.fields.title}
						</button>
					{/if}
				</a>
			{/each}
		{/if}
	</ul>
</div>

<style lang="scss">
	.container {
		min-height: max(90vh, 50rem);
		color: var(--text-color);
		position: relative;
		max-width: 45rem;
		margin: 0 auto;
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
			font-size: 20px;
		}
	}

	.items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: 0.75rem;
		list-style: none;
		margin: 5rem 0 0 0;

		padding: 0;

		&.opened {
			display: flex;

			@media screen and (max-width: 900px) {
				flex-direction: column;
			}
		}

		.item {
			position: relative;
			width: 100%;
			height: 13rem;
			padding: 0;
			border-radius: 3px;
			text-decoration: none;

			transition: height 200ms, transform 200ms;

			// theme colors
			color: var(--text-color, #000);
			background: var(--bg-color, #fff);
			border: 2px solid var(--border-color, transparent);

			&.Accent {
				--text-color: #000;
				--bg-color: #a6ff8f;
				--border-color: var(--bg-color);
			}

			&.Light {
				--text-color: #000;
				--bg-color: #fff;
				--border-color: var(--bg-color);
			}

			&.Dark {
				--text-color: #fff;
				--bg-color: #000;
				--border-color: #fff;
			}

			// Modal stuff
			&.collapsed {
				min-width: unset;
				width: 1.5rem;

				// hide janky flip animation
				opacity: 0;
				animation: fade-in 200ms both;

				@media screen and (max-width: 900px) {
					width: 90%;
					margin: 0 auto;
					height: 1.5rem;
				}

				.openButton {
					overflow: hidden;
					padding: 0;
					opacity: 0;
				}
			}

			&.opened {
				margin: 0 auto;
				width: 100%;
				max-width: 42rem;
				min-height: 42rem;
				padding: 6rem 4.5rem;
				transform: translateY(-25%);
				transition: height 200ms;

				@media screen and (max-width: 900px) {
					transform: none;
					padding: 5rem 1.75rem;
					height: fit-content;
					min-height: 30rem;
				}
			}

			&:not(.opened):hover {
				transform: translateY(-0.25rem);
			}

			.openButton {
				border: none;
				width: 100%;
				height: 100%;
				background: none;
				font-size: 22px;
				font-family: var(--font-main);
				font-weight: 900;
				color: var(--text-color);
				cursor: pointer;
				padding-inline: 2rem;
				transition: padding 200ms, opacity 200ms;
			}

			.closeButton {
				position: absolute;
				right: 1.75rem;
				top: 1.75rem;
				border: none;
				background: transparent;
				color: var(--text-color);
				cursor: pointer;

				@media screen and (max-width: 900px) {
					right: 1rem;
				}
			}
		}
	}

	.itemContent {
		color: var(--text-color);

		:global(p) {
			font-size: 20px;
			line-height: 1.25em;
		}

		:global(a) {
			font-weight: 900;
			color: inherit;
			text-decoration-thickness: 1px;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
