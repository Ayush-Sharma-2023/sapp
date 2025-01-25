const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('858a39ca377e4b8a9cccdd2f712c9aba');

newsapi.v2.everything({
    q: 'pandemic',
    language: 'en',
    sortBy: 'relevancy',
}).then(response => {
    if (response.status === "ok") {
      response.articles.forEach(article => {
        console.log(`Title: ${article.title}`);
        console.log(`Description: ${article.description}`);
        console.log(`URL: ${article.url}`);
        console.log('------------------------');
      });
    }
}).catch(error => {
    console.error('Error fetching news related to pandemic:', error);
});
