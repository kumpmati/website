<script lang="ts">
	import GitHub from '../Icons/GitHub.svelte';
	import LinkedIn from '../Icons/LinkedIn.svelte';
</script>

<footer>
	<div class="content">
		<a class="logo" href="/">mk</a>

		<p class="divider">|</p>

		<div class="links">
			<a href="https://github.com/kumpmati" target="_blank" referrerpolicy="no-referrer">
				<GitHub />
			</a>
			<a
				href="https://www.linkedin.com/in/matias-kumpulainen-27b4421b9/"
				target="_blank"
				referrerpolicy="no-referrer"
			>
				<LinkedIn />
			</a>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		margin: 0 auto;
		padding: 4rem 2rem;
		position: relative;
		color: #fff;
		background: #000;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	.content {
		margin: 0 auto;
		max-width: 45rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		font-size: 16px;
		font-weight: 900;
		text-decoration: none;

		&:hover {
			opacity: 1;
		}
	}

	.divider {
		margin-left: 2rem;
		margin-right: 2rem;
	}

	.links {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	a {
		color: inherit;
		transition: opacity 200ms;

		&:hover {
			opacity: 0.75;
		}
	}
</style>
