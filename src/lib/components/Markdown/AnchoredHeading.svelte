<script lang="ts">
	import Link from '../icons/Link.svelte';

	export let raw: string;
	export let text: string;

	const num = raw.split('#').length - 1;
	const tag = 'h' + num;

	const link = text.toLowerCase().replace(/\s/g, '-');
</script>

<svelte:element this={tag} id={link} class="heading">
	<a href="#{link}">
		<Link />
	</a>
	{text}
</svelte:element>

<style lang="scss">
	.heading {
		display: flex;
		align-items: center;
		position: relative;
	}

	a {
		position: absolute;
		left: -2rem;
		opacity: 0.6;
		transform: scale(0.8);
		transition: opacity 200ms;

		&:hover {
			opacity: 1;
		}

		@media screen and (max-width: 400px) {
			position: static;
			margin-right: 0.25rem;
		}
	}
</style>
