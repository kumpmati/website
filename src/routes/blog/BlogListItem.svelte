<script lang="ts">
	import TablerCodeDots from '~icons/tabler/code-dots';

	type Props = {
		type?: 'snippet';
		href: string;
		title: string;
		excerpt?: string;
	};

	let { type, href, title, excerpt }: Props = $props();
</script>

<a
	{href}
	class="relative z-0 flex flex-col [&>div]:hover:opacity-100 [&>div]:focus-visible:opacity-100"
>
	<div class="bg-card absolute inset-2 -z-10 rounded-xl opacity-0 transition-opacity"></div>

	{#if type === 'snippet'}
		<p class="text-secondary flex items-center gap-1 font-bold">
			<TablerCodeDots class="size-6" />
			Snippet
		</p>
	{/if}
	<h2 class="font-body text-xl font-bold sm:text-2xl">{title}</h2>
	<p class="text-primary">{excerpt}</p>
</a>
