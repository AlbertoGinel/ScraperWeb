import React, { useState, useEffect } from "react";
import useWebScraper from "../hooks/useWebScraper";
import ArticleElement from "./ArticleElement";

const ScraperComponent = () => {
  const { scrapedData, isLoading, error, refetch } = useWebScraper();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {scrapedData.length > 0 && (
        <ul>
          {scrapedData.map((item, index) => (
            <ArticleElement key={index} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScraperComponent;
