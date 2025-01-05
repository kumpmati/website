<script lang="ts">
	import TablerArrowLeft from '~icons/tabler/arrow-left';
	import Heading from '$lib/Heading.svelte';

	let { children, title } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mb-16 flex flex-col gap-6">
	<a href="/blog" class="w-fit">
		<TablerArrowLeft class="size-6" />
	</a>

	<Heading depth={1}>{title}</Heading>

	{@render children()}
</div>
