<script lang="ts">
	const PROJECTS = [
		{
			name: 'Sliple',
			description: 'Web puzzle game',
			image: '/sliple.svg',
			url: 'https://pieni.link/sliple'
		},
		{
			name: 'ImGiving',
			description: 'Gift coordination',
			image: '/imgiving.svg',
			url: 'https://pieni.link/imgiving'
		},
		{
			name: 'Bubblewrap',
			description: 'Infinite bubbles',
			image: '/bubblewrap.svg',
			url: 'https://pieni.link/bubblewrap'
		},
		{
			name: 'Eatable',
			description: 'Is an episode/movie disgusting?',
			image: '/eatable.png',
			url: 'https://pieni.link/eatable'
		},
		{
			name: 'Superactions',
			description: 'Sveltekit data fetching library',
			image: '/superactions.webp',
			url: 'https://superactions.matsku.dev/'
		},
		{
			name: 'pieni.link',
			description: 'Personal URL shortener',
			image: '/pieni-link.svg',
			url: 'https://pieni.link'
		}
	] as const;
</script>

<h3 class="mt-8 text-2xl">Featured projects</h3>

<ul class="grid w-full grid-cols-[repeat(auto-fit,minmax(130px,1fr))] flex-col gap-4">
	{#each PROJECTS as project}
		<li class="contents">
			<a
				href={project.url}
				class="flex flex-col items-center gap-3 py-4 outline-none hover:underline focus:underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={project.image} alt="" class="size-8 rounded object-cover" />

				<div class="flex flex-col items-center text-center">
					<h3 class="text-lg leading-tight">{project.name}</h3>
					<p class="text-sm leading-tight">{project.description}</p>
				</div>
			</a>
		</li>
	{/each}
</ul>
