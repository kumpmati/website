<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		depth: number;
	};

	let { children, depth }: Props = $props();
</script>

{#if depth === 1}
	<h1 class="relative z-0 text-3xl font-bold leading-tight sm:text-4xl">
		<div class="bg-card absolute inset-x-3 inset-y-2 -z-10 translate-y-1 rounded-lg"></div>
		{@render children()}
	</h1>
{:else if depth === 2}
	<h2 class="font-body text-2xl font-bold">{@render children()}</h2>
{:else if depth === 3}
	<h3 class="font-body text-xl font-bold">{@render children()}</h3>
{:else if depth === 4}
	<h4 class="font-body text-lg font-bold">{@render children()}</h4>
{:else if depth === 5}
	<h5 class="font-body text-md font-bold">{@render children()}</h5>
{:else if depth === 6}
	<h6 class="text-md font-body text-base font-bold">{@render children()}</h6>
{/if}
