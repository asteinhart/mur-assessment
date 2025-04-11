<script>
	let { title = '', content = '' } = $props();
</script>

<div class="text-display">
	<div class="container">
		<h3>{title}</h3>
		<hr />
		<div class="content">
			{#if content}
				<ul>
					{#each content.split('\n').filter((line) => line.trim()) as line}
						<li>{@html line}</li>
					{/each}
				</ul>
			{:else}
				<p class="placeholder">No responses available for the current filters.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.text-display {
		background-color: #fef7ee;
		border-radius: 4px;
		padding: 1rem;
		margin-bottom: 1rem;
		position: relative;
		height: 400px;
	}

	ul {
		font-family: 'Inter', sans-serif;
		font-size: small;
		margin-block: 0;
		margin-inline: 0;
	}

	hr {
		border: none;
		border-top: 2px solid black;
		margin: 0.5rem 0;
	}

	h3 {
		font-family: 'Unna', serif;
		font-weight: 700;
		margin-bottom: 0.5rem;
		margin-top: 0;
		font-size: 18px;
		color: #333;
	}

	.content {
		position: relative;
		height: 325px;
		color: #444;
		overflow-y: auto;
	}

	.placeholder {
		color: #888;
		font-style: italic;
	}
</style>
