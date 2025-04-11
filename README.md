# Data Design Engineer Assessment

## Set up 

first install dependencies

```bash
npm install
```

then run the development server:

```bash
npm run dev
```
## Overview

### Tools Used:

- Svelte
- D3.js

### Assumptions:

- For Likert-Scale, 1 is Strongly Disagree, 2 is Disagree, 3 is Neutral, 4 is Agree, 5 is Strongly Agree
- I assumed the main use case of this dashboard would be to have a particular segment of the population in mind that a user wanted to better view. Thus, the filtering options are set up to allow the user to filter by a particular segment of the population.

### Visualization Choices

- For the Likert-Scale question I opted to create visuals with small multiple bars. I wanted to keep the visuals simple and easy to read and kept the same style for each rating question to lower the cognitive load of undertaking multiple charts. I did not include a tooltip as I felt it would be unnecessary and would clutter the chart.
- For filtering, given my assumption of the use case, I allowed the user to choose up to one filter for each field. For fields with a small amount of options I opted for buttons and for those with large amounts of options I opted for a dropdown.

### Other Considerations

- Conversations with users are very helpful to decide how to group categories or response together. For example, age buckets would be wider, education level could be grouped to just high school, college, and advanced degree, and the Likert-Scale question could be simplified to agree, neutral, disagree. These are all design choices that should be discussed with the users.

### Additional Features With More Time

- Ability to compare responses between segments such as men vs women. This could be down by showing a side-by-side bar chart.
- Visualizing sentiment of each response. Since there are only three categories, I mostly likely would have also used a bar chart but vertical with different colors to remain simple but differentiate the bar charts for the rating questions.
- Clean up styling of the dropdowns
- Include an option to either see the percentages or the number of responses for each rating. I would have done this by adding a toggle button to the top of the chart.
- I would have liked to add a button to download the data as a CSV. This would be helpful for users who want to do further analysis on the data.

### Known Issues that I would have liked to address:

- I opted to simply show all the free response questions as a list. With additional time, I would have liked to do some light cleaning on the text and use aI would have liked to implement a word cloud or some other visualization to show the most common words used in the responses with additional time
- I also would spend more time on mobile development 

### Deign Draft Link

[Figma Design Board](https://www.figma.com/design/zujlvbGnnkjapUKXVdCwFl/murmuration-assessment?node-id=0-1&p=f)



