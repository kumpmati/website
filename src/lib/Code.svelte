<script>
	import TablerCopy from '~icons/tabler/copy';
	import TablerCheck from '~icons/tabler/check';
	import hljs from 'highlight.js/lib/common';
	import 'highlight.js/styles/monokai.min.css';

	let { text, lang } = $props();

	let highlighted = $derived(hljs.highlight(text, { language: lang }));

	let copied = $state(false);
</script>

<div
	class="overflow-x-auto rounded-md bg-[#272822] text-sm text-[#ddd] {highlighted.language} relative"
>
	<button
		class="absolute right-1 top-1 flex rounded-md p-1 text-slate-400 hover:text-white"
		aria-label="copy to clipboard"
		onclick={() => {
			navigator.clipboard.writeText(text).then(() => {
				copied = true;
				setTimeout(() => (copied = false), 1500);
			});
		}}
		title="copy to clipboard"
	>
		{#if copied}
			<TablerCheck class="size-5" />
		{:else}
			<TablerCopy class="size-5" />
		{/if}
	</button>

	<pre class="w-fit p-3"><code>{@html highlighted.value}</code></pre>
</div>
