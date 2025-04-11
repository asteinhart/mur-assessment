import * as d3 from 'd3';

// Function to load and parse CSV data
export async function loadData(filePath) {
	try {
		const data = await d3.csv(filePath);
		return data;
		console.log('Data loaded successfully:', data);
	} catch (error) {
		console.error('Error loading survey data:', error);
		return [];
	}
}

// Function to process rating
export function processRating(data, col) {
	const categories = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];
	if (!data || !Array.isArray(data) || data.length === 0) {
		return categories.map((category) => ({
			category,
			percentage: 0,
			count: 0
		}));
	}

	const result = categories.map((category) => {
		const count = data.filter((d) => d[col] === category).length;
		const percentage = (count / data.length) * 100;
		return {
			category,
			percentage,
			count
		};
	});
	return result;
}
