import React from "react";

interface NewsCardProps {
  title: string;
  description: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, url }) => {
  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden w-full p-4 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      {/* Card Title */}
      <h3 className="text-2xl font-bold text-gray-100 mb-4">{title}</h3>
      
      {/* Card Description */}
      <p className="text-gray-400 text-base mb-4">{description}</p>
      
      {/* Read More Link */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-400 font-semibold hover:text-blue-600 transition-colors duration-300"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
