### `npm start`

### `npm test`

# StackBuilders Hiring Technical Test

This project demonstrates a web crawler using scraping techniques to gather data from Hacker News. It utilizes plain React for the front-end development, Tailwind for styling, and Axios for data fetching.

## Features

The web crawler effectively extracts and displays relevant information from Hacker News, including:

- Title of the news article
- Rank (position on Hacker News)
- Number of comments
- Points (score on Hacker News)

## CORS Handling

Cross-Origin Resource Sharing (CORS) restrictions posed a challenge in accessing Hacker News data directly. To overcome this, a temporary server called CORS Anywhere is employed. Users are prompted to visit the CORS Anywhere demo server and click the "Request temporary access to the demo server" button. This grants the app temporary access to the Hacker News domain, allowing it to scrape data effectively.

"https://cors-anywhere.herokuapp.com/https://news.ycombinator.com/"

## Project Structure and Implementation

The project's development follows a structured approach, reflecting the progress made in each commit:

1. **Scraping Hook:** Creating a scraping hook to retrieve the raw HTML of the Hacker News page.

2. **Data Extraction:** Employing scraping techniques to extract relevant information from the obtained HTML, such as title, rank, comments, and points.

3. **ArticleComponent:** Developing an `ArticleComponent` to structure the data into a readable format.

4. **Styling with Tailwind:** Incorporating Tailwind CSS for styling the application, including the layout and appearance of the scraped data.

5. **Filtering Options:** Implementing filtering options to enable users to refine the displayed articles based on their desired criteria.

6. **Testing:** Adding unit tests to ensure the functionality and accuracy of the scraping and data extraction processes.

7. **Styling and Readme:** Refining the overall styling of the application and enhancing the README file for better documentation.
