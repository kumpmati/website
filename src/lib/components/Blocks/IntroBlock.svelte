<script lang="ts">
	import type { IntroBlock } from '$lib/types/contentful';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import SplitSection from '../SplitSection/SplitSection.svelte';
	import { ChevronDownIcon } from 'svelte-feather-icons';
	import { scrollPosition } from '$lib/stores/scroll';
	import SideNavigation from '../Navigation/SideNavigation.svelte';

	export let block: IntroBlock;

	const { subheading, content, profilePicture } = block.fields;
	const imageUrl = profilePicture?.fields.file.url;

	let visible = false;
	let element;

	// update yOffset whenever scroll position is changed
	scrollPosition.subscribe(() => {
		const rect = element?.getBoundingClientRect();
		if (rect) visible = rect.top < -200;
	});
</script>

<SplitSection bind:element offset="35vh" dividerOffset="35vh" style="background: #fff">
	<div slot="left" class="left">
		<p>{subheading}</p>
	</div>

	<div slot="right" class="content">
		{@html documentToHtmlString(content)}

		<SideNavigation />

		<span class="icon" class:visible={!visible}>
			<ChevronDownIcon size="20" />
		</span>
	</div>

	<div slot="background">
		{#if imageUrl}
			<img src={imageUrl} class="profilePicture" alt={profilePicture.fields.title} />
		{/if}
	</div>
</SplitSection>

<style lang="scss">
	@keyframes bounce {
		0% {
			transform: translateY(-10px);
		}
		50% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(-10px);
		}
	}

	.left {
		text-align: right;
		letter-spacing: var(--letter-spacing-100);
		color: #9a9a9a;
		font-size: 14px;
		font-weight: 700;

		p {
			margin: 0;
		}
	}

	.icon {
		position: absolute;
		bottom: -10rem;
		left: 40%;
		transform: translateX(-50%);
		z-index: 100;

		visibility: hidden;
		opacity: 0;

		animation: bounce 1s infinite;
		transition: visibility 200ms, opacity 200ms;

		&.visible {
			visibility: visible;
			opacity: 1;
		}
	}

	.content {
		position: relative;
		top: -1.25rem;
		height: 100%;
		width: min-content;

		:global(*) {
			margin-top: 0;
		}

		:global(h1) {
			font-weight: 800;
			font-size: 6rem;
			letter-spacing: var(--letter-spacing-100);
		}
		:global(h2) {
			font-weight: 800;
			font-size: 4rem;
			letter-spacing: var(--letter-spacing-100);
		}
	}

	.profilePicture {
		bottom: 0;
		right: 8rem;
		position: absolute;
		width: fit-content;
		height: 70%;
		z-index: -1;
		object-fit: contain;
	}
</style>
