<script lang="ts">
	import Link from '../icons/Link.svelte';

	export let raw;
	export let text;

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
		transform: scale(.8);

		&:hover {
			border-bottom: 1px solid black;
		}
	}
</style>