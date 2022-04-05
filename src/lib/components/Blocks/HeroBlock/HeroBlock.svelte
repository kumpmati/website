<script lang="ts">
	import type { HeroBlock } from '$lib/types/contentful';

	export let block: HeroBlock;
	export let index: number;

	const { backgroundColor } = block.fields;
</script>

<h1>Hero block {backgroundColor}</h1>

<style lang="scss">
</style>
