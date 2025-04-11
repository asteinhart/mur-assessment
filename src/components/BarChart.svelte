<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let {
		data = [],
		title = '',
		width = 400,
		height = 200,
		margin = { top: 40, right: 30, bottom: 30, left: 125 }
	} = $props();

	let chart;

	$effect(() => {
		if (chart && data.length > 0) {
			renderChart();
		}
	});

	function renderChart() {
		if (!chart) return;

		d3.select(chart).selectAll('*').remove();

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		const svg = d3.select(chart).append('svg').attr('width', width).attr('height', height);

		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		const x = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.percentage) + 10])
			.range([0, innerWidth]);

		const y = d3
			.scaleBand()
			.domain(data.map((d) => d.category))
			.range([0, innerHeight])
			.padding(0.2);

		const colors = {
			'Strongly Agree': '#003A44',
			Agree: '#7ACACC',
			Neutral: '#D9D9D9',
			Disagree: '#F0BC56',
			'Strongly Disagree': '#E66100'
		};

		g.append('g')
			.call(d3.axisLeft(y).tickSize(0))
			.selectAll('text')
			.attr('font-family', 'Inter')
			.attr('font-size', '12px');

		g.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('y', (d) => y(d.category))
			.attr('height', y.bandwidth())
			.attr('x', 0)
			.attr('width', (d) => x(d.percentage))
			.attr('fill', (d) => colors[d.category] || '#ccc');

		// Add percentages next to bars
		g.selectAll('.label')
			.data(data)
			.enter()
			.append('text')
			.attr('class', 'label')
			.attr('y', (d) => y(d.category) + y.bandwidth() / 2)
			.attr('x', (d) => x(d.percentage) + 5)
			.attr('dy', '.35em')
			.attr('font-family', 'Inter')
			.text((d) => `${d.percentage.toFixed(0)}%`);

		svg
			.append('text')
			.attr('x', margin.left - 100)
			.attr('y', margin.top / 2)
			.attr('text-anchor', 'start')
			.attr('font-size', '18px')
			.attr('font-weight', 'bold')
			.attr('font-family', 'Unna')
			.text(title);

		// Add line below title
		svg
			.append('line')
			.attr('x1', margin.left - 100)
			.attr('x2', width - margin.right)
			.attr('y1', margin.top / 2 + 10)
			.attr('y2', margin.top / 2 + 10)
			.attr('stroke', 'black')
			.attr('stroke-width', 2);
	}
</script>

<div class="chart-container" bind:this={chart}></div>

<style>
	.chart-container {
		background-color: #fef7ee;
		border-radius: 4px;
		padding: 1rem;
		margin-bottom: 1rem;
	}
</style>
