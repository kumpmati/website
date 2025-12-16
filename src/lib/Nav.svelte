<script lang="ts">
	import TablerBrandSpotify from '~icons/tabler/brand-spotify';
	import TablerBrandGithub from '~icons/tabler/brand-github';
	import TablerBrandLinkedin from '~icons/tabler/brand-linkedin';
	import TablerPencilCode from '~icons/tabler/pencil-code';

	const ITEMS = [
		{ label: 'spotify', icon: TablerBrandSpotify, href: 'https://pieni.link/spotify' },
		{ label: 'github', icon: TablerBrandGithub, href: 'https://pieni.link/github' },
		{ label: 'linkedin', icon: TablerBrandLinkedin, href: 'https://pieni.link/linkedin' },
		{ label: 'blog', icon: TablerPencilCode, href: '/blog' }
	] as const;
</script>

<nav class="flex flex-wrap justify-center gap-4 font-normal">
	{#each ITEMS as item (item.href)}
		{@const relative = item.href.startsWith('/')}

		<a
			href={item.href}
			target={!relative ? '_blank' : undefined}
			rel={!relative ? 'noopener' : undefined}
			class="flex items-center gap-0.5 outline-none hover:underline focus:underline"
		>
			<item.icon class="size-5" />
			{item.label}
		</a>
	{/each}
</nav>
