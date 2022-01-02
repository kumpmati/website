<script lang="ts">
	import type { IntroBlock } from '$lib/types/contentful';
	import SplitSection from '$lib/components/SplitSection/SplitSection.svelte';
	import SideNavigation from '$lib/components/Navigation/SideNavigation.svelte';
	import Visible from '$lib/components/Visible/Visible.svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import { ChevronDownIcon } from 'svelte-feather-icons';

	export let block: IntroBlock;

	const { subheading, content, profilePicture, divider } = block.fields;
	const imageUrl = profilePicture?.fields.file.url;

	let visible: boolean;
</script>

<Visible threshold={-200} bind:visible>
	<SplitSection dividerOffset="13rem" fullHeight {divider} style="background: #fff;">
		<div slot="left" class="subheading">
			<p>{subheading}</p>
		</div>

		<div slot="right" class="content">
			{@html documentToHtmlString(content)}

			<SideNavigation />
		</div>

		<div slot="background">
			<span class="icon" class:visible={!visible}>
				<ChevronDownIcon size="20" />
			</span>

			{#if imageUrl}
				<img src={imageUrl} class="profilePicture" alt={profilePicture.fields.title} />
			{/if}
		</div>
	</SplitSection>
</Visible>

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

	.subheading {
		height: 20rem;
		text-align: right;
		letter-spacing: var(--letter-spacing-100);
		color: #9a9a9a;
		font-size: 18px;
		font-weight: 700;

		p {
			margin: 0;
		}
	}

	.icon {
		position: absolute;
		bottom: 1rem;
		left: 40%;
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
		height: 20rem;
		position: relative;
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
		overflow: hidden;
		bottom: -2.25rem;
		right: 5rem;
		position: absolute;
		width: 30rem;
		height: 70%;
		z-index: -1;
		object-fit: contain;
	}

	@media screen and (max-width: 950px) {
		.subheading {
			display: flex;
			text-align: left;
			align-items: flex-end;
			height: 4rem;
			padding: 1rem 0;
		}

		.icon {
			left: 2rem;
		}

		.content {
			top: 0;

			:global(h2) {
				font-size: 3.5rem;
			}
		}

		.profilePicture {
			height: 60%;
			right: -2rem;
		}
	}

	@media screen and (max-width: 600px) {
		.content {
			:global(h2) {
				font-size: 2.25rem;
			}
		}

		.profilePicture {
			width: unset;
		}
	}
</style>
