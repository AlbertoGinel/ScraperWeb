import React from "react";
import useWebScraper from "../hooks/useWebScraper";

const ScraperComponent = () => {
  const { scrapedData, isLoading, error, refetch } = useWebScraper();
  return <div>ScraperComponent</div>;
};

export default ScraperComponent;
