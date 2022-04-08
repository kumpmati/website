<script lang="ts">
	import { pageSettings, type TimelineStore } from '$lib/stores/page';
	import type { SkillsBlock } from '$lib/types/contentful';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getContext, onMount } from 'svelte';

	export let block: SkillsBlock;
	export let index: number;

	const { backgroundColor, topContent, leftColumnTitle, rightColumnTitle, bottomTitle, textColor } =
		block.fields;

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

	onMount(() => {
		const unregister = timeline.register(index, element);
		return () => unregister?.();
	});
</script>

<!-- Checks visibility of 'trigger' element -->
<IntersectionObserver {element} threshold={0.3} bind:intersecting={visible} />

<div class="container" style="--text-color: {textColor === 'Dark' ? '#000' : '#fff'};">
	<span class="trigger" bind:this={element} />

	<span class="content" class:visible>
		<p class="top">{topContent}</p>

		<div class="section-container">
			<section class="left">
				<p class="small">{leftColumnTitle}</p>

				<h1 style="color: var(--text-color)">Next.js</h1>
				<h2 style="color: #6CBE49">Node.js</h2>
				<h2 style="color: #5570FF">TypeScript</h2>
				<h2 style="color: var(--text-color)">SCSS</h2>
			</section>

			<section class="right">
				<p class="small">{rightColumnTitle}</p>

				<h3 style="color: #FF5E2B">SvelteKit</h3>
				<h3 style="color: #58C0EC">Go</h3>
				<h3 style="color: #FFAA2B">Firebase</h3>
			</section>
		</div>

		<section class="bottom">
			<p class="small">{bottomTitle}</p>

			<div>
				<h3>AWS</h3>
				<h3>DigitalOcean</h3>
				<h3>Heroku</h3>
			</div>
		</section>
	</span>
</div>

<style lang="scss">
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 15rem auto;
		max-width: 45rem;
		height: fit-content;
	}

	.trigger {
		position: absolute;
		top: 0;
		height: 100%;
		visibility: hidden;
	}

	.content {
		opacity: 0;
		transform: translateX(1rem);
		transition: opacity 300ms, transform 300ms;

		&.visible {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.top {
		margin-bottom: 6.25rem;
		max-width: 32rem;
	}

	p {
		font-size: 22px;
		color: var(--text-color);
		opacity: 0.5;
		margin: 0;
		margin-bottom: 0.5rem;

		&.small {
			font-size: 14px;
		}
	}

	.section-container {
		display: flex;
		width: 100%;
		justify-content: space-between;
		max-width: 32rem;
		gap: 2rem;

		@media screen and (max-width: 900px) {
			flex-wrap: wrap;
		}
	}

	.bottom {
		margin-top: 5rem;
		max-width: 32rem;
		color: var(--text-color);

		div {
			display: flex;
			justify-content: space-between;

			@media screen and (max-width: 900px) {
				flex-direction: column;
			}
		}

		h3 {
			opacity: 0.75;
		}
	}

	h1 {
		font-size: 64px;
		margin: 0;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 48px;
		margin: 0;
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 36px;
		margin: 0;
		margin-bottom: 1rem;
	}
</style>
