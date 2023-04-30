# SimpleNews 📰
### The news, but simpler. 

## Motivation
As the world becomes more and more populated with news sources, bias and unreliability inevitably creep into the articles that people read. We wanted to create a page that not only simplified searching for the news, but enhanced it by factoring in reliability as a search metric and by making source biases transparent. 

## How it Works
Our functionality relies on two critical components:

1. A News API capable of fetching numerous articles relevant to a keyword.

2. A broad, objective rating source capable of providing both bias and reliability data on publishers. 

Each search is requested from our news article API, which then has its results filtered and rated by our bias / reliability data before being displayed to the end-user. 

![App Flow Diagram](https://user-images.githubusercontent.com/92756688/235375790-3add79fd-d54b-4e53-b29c-1659ef2a2d4b.png)

## The Sorting Process

We tried and tested a variety of methods to best sort our results. Initially, we put our faith into the sorting functionality of our news API which provided an option to sort by relevancy. However, this algorithm was unexplained by the site's documentation and after hundreds of tests, we found it to be inefficient in the way it provided relevant articles based on keywords. As a result, we decided to develop our own method to sort and filter the results.

### Our Algorithm

To optimize the recency and accuracy of our articles, we developed a date based reliability sorting method. This works as follows:

1. Receive articles sorted by relevancy from NewsAPI

2. Truncate the article list by excluding all duplicate publishers while maintaining their single most relevant article

3. Sort all articles in ascending order by date (recent -> oldest)

4. Sort all dates by their most reliable articles (most reliable -> least reliable)

This system prioritizes recency but creates more favorable results by highlighting the most reliable article published on each date. The value of this process can be demonstrated by recognizing that the top result of every search will be the most recent + most reliable article found.

# Run SimpleNews on your Computer
1. Clone the repository to your device
2. Download the LiveServer VSCode extension
3. Right click anywhere in the `index.html` file and select `Open with Live Server`

# Contributions
This project was made and developed by:

- Lev Sosani (@Sxzo) | Full-Stack Manager

- Joe Tamulaitis (@joetamulaitis) | Backend Developer

- Joseph Morrissey (@jmorrissey23) | Full Stack Developer

- Patrick Liu (@PatanL) Full-Stack | Full Stack Developer

# Sources:

> Our bias and reliability data: https://adfontesmedia.com/ 

> Our API: https://newsapi.org/








