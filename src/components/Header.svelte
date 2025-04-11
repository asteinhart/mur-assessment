<header class="header">
	<div class="logo">
		<h1>Steinhart</h1>
	</div>
	<div class="right-section">
		<nav class="navigation">
			<ul>
				<li><a href="#about">about</a></li>
				<li><a href="#impact">impact</a></li>
				<li><a href="#careers">careers</a></li>
			</ul>
		</nav>
		<div class="auth">
			<button class="login-btn">log in</button>
		</div>
	</div>
</header>

<style>
	h1 {
		font-family: 'Unna', serif;
		font-weight: 700;
		margin: 0;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: white;
		border-bottom: 1px solid #e0e0e0;
	}

	.right-section {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.navigation {
		font-family: 'Inter', sans-serif;
	}

	.navigation ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.navigation li {
		margin-left: 2rem;
	}

	.navigation li:first-child {
		margin-left: 0;
	}

	.navigation a {
		text-decoration: none;
		color: #333;
		font-size: 1rem;
	}

	.login-btn {
		font-family: 'Inter', sans-serif;
		background-color: #2c3e50;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
