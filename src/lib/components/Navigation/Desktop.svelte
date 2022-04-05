<script lang="ts">
	import type { Navigation } from '$lib/types/contentful';

	export let nav: Navigation;
</script>

<nav>desktop nav</nav>

<style lang="scss">
	nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
</style>
