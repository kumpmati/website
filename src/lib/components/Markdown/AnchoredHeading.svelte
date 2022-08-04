<script lang="ts">
	import Link from '../Icons/Link.svelte';

	export let raw: string;
	export let text: string;

	const num = raw.split('#').length - 1;
	const tag = 'h' + num;

	const link = text.toLowerCase().replace(/\s/g, '-');
</script>

<svelte:element this={tag} id={link} class="heading">
	<a href="#{link}">
		{text}
		<span class="icon">
			<Link />
		</span>
	</a>
</svelte:element>

<style lang="scss">
	.heading {
		position: relative;

		a {
			text-decoration: none;
			display: flex;
			align-items: center;
		}

		&:hover {
			text-decoration: underline;

			.icon {
				opacity: 1;
			}
		}
	}

	.icon {
		display: flex;
		align-items: center;
		position: absolute;
		left: -2rem;
		opacity: 0;
		transform: scale(0.8);
		transition: opacity 200ms;

		@media screen and (max-width: 400px) {
			position: static;
			margin-left: 0.25rem;
		}
	}
</style>
