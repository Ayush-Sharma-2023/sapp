import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);  // Keep track of the current page

  const articlesPerPage = 6;

  // Fetch news articles from the API
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=pandemic&language=en&sortBy=relevancy&pageSize=${
          articlesPerPage * page
        }&apiKey=858a39ca377e4b8a9cccdd2f712c9aba`
      );
      const data = await response.json();
      if (data.status === "ok") {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);  // Re-fetch when the page number changes

  useEffect(() => {
    setVisibleArticles(articles.slice(0, page * articlesPerPage));  // Update visible articles based on the current page
  }, [articles, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);  // Increase page number to load more articles
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Latest News on Pandemic</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleArticles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            url={article.url}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-6">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default NewsList;
