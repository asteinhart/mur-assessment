<script>
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';
	import SidebarFilter from '../components/SidebarFilter.svelte';
	import BarChart from '../components/BarChart.svelte';
	import TextDisplay from '../components/TextDisplay.svelte';

	import '../app.css';

	import { loadData, processRating } from '../utils/dataProcessing.js';

	let innerWidth = $state();
	let isMobile = $derived(innerWidth < 900 ? true : false);

	let currentFilters = $state({
		age: 'all',
		state: 'all',
		gender: 'all',
		education: 'all'
	});

	let allData = [];
	let filteredData = $state([]);
	let q3_open = $state('');
	let q5_open = $state('');

	onMount(async () => {
		// Load data
		allData = await loadData('/src/lib/data/data_mur.csv');
		// Apply initial filters
		filteredData = allData;
		processTextData();
	});

	//------- HELPER FUNCTIONS -------

	// passed to SidebarFilter component to update when filters change
	function onFilterChange(type, value) {
		currentFilters[type] = value;
		applyFilters(currentFilters);
	}

	function applyFilters(filters) {
		filteredData = allData;
		filteredData =
			currentFilters.state === 'all'
				? filteredData
				: filteredData.filter((d) => d.state === currentFilters.state);
		filteredData =
			currentFilters.age === 'all'
				? filteredData
				: filteredData.filter((d) => d.age_bucket === currentFilters.age);
		filteredData =
			currentFilters.gender === 'all'
				? filteredData
				: filteredData.filter((d) => d.gender === currentFilters.gender);
		filteredData =
			currentFilters.education === 'all'
				? filteredData
				: filteredData.filter((d) => d.education_level === currentFilters.education);
		processTextData();
	}

	// Process data for text displays
	function processTextData() {
		// Add clear separators between responses
		q3_open = filteredData
			.map((d) => d.q3_open?.trim())
			.filter((text) => text && text.length > 0)
			.join('\n');

		q5_open = filteredData
			.map((d) => d.q5_open?.trim())
			.filter((text) => text && text.length > 0)
			.join('\n');
	}
</script>

<svelte:window bind:innerWidth />

<Header />

<main class="content">
	<div class="title-area">
		<h2>What do people think about AI?</h2>
		<p>50 real and AI-generated responses from a public opinion survey</p>
	</div>
	<hr />

	<div class="dashboard">
		<div class="sidebar-container">
			<SidebarFilter
				ageFilter={currentFilters.age}
				genderFilter={currentFilters.gender}
				stateFilter={currentFilters.state}
				educationFilter={currentFilters.education}
				{onFilterChange}
			/>
		</div>

		<div class="charts-container">
			<div class="response-count">{filteredData.length} Responses</div>
			<div class="chart-column">
				<BarChart
					data={processRating(filteredData, 'q1_words')}
					title="AI is beneficial for the progress of society."
					width={isMobile ? 300 : 500}
					height={isMobile ? 200 : 250}
				/>

				<BarChart
					data={processRating(filteredData, 'q2_words')}
					title="I trust AI systems to make important decisions."
					width={isMobile ? 300 : 500}
					height={isMobile ? 200 : 250}
				/>

				<BarChart
					data={processRating(filteredData, 'q4_words')}
					title="AI will lead to significant job losses in the next decade."
					width={isMobile ? 300 : 500}
					height={isMobile ? 200 : 250}
				/>
			</div>

			<div class="text-column">
				<TextDisplay
					title="What concerns, if any, do you have about the development of AI?"
					content={q5_open}
				/>
				<TextDisplay
					title="How do you think AI will affect your personal or professional life?"
					content={q3_open}
				/>
			</div>
		</div>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Unna:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	:global(body) {
		margin: 0;
		padding: 0;
		width: 100%;
	}

	hr {
		opacity: 50%;
	}
	.content {
		max-width: 1300px;
		margin: 0 auto;
		padding: 1rem;
	}

	.title-area {
		margin: 2rem 0;
		background-color: #e66100;
		padding: 10px 30px 10px 30px;
		border-radius: 5px;
		width: fit-content;
	}

	.title-area h2 {
		font-family: 'Unna', serif;
		font-weight: 200;
		font-size: 3rem;
		color: white;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
	}

	.title-area p {
		font-family: 'Inter', serif;
		color: white;
		margin-top: 0;
	}

	.dashboard {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.sidebar-container {
		grid-column: 1;
	}

	.response-count {
		position: absolute;
		top: 0.8rem;
		left: 2rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		font-weight: 500;
		color: #555;
		background-color: rgba(255, 255, 255, 0.7);
		padding: 0.3rem 0.7rem;
		border-radius: 4px;
		z-index: 1;
	}

	.charts-container {
		position: relative;
		background-color: #fceed7;
		grid-column: 2;
		padding: 2rem;
		padding-top: 3rem;
		border-radius: 8px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.chart-column,
	.text-column {
		padding-top: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	@media (max-width: 900px) {
		.dashboard {
			grid-template-columns: 1fr;
		}

		.sidebar-container,
		.charts-container {
			grid-column: 1;
		}

		.charts-container {
			grid-template-columns: 1fr;
		}

		.chart-column,
		.text-column {
			gap: 1rem;
		}

		.response-count {
			top: 0.8rem;
			left: 2rem;
		}
	}
</style>
