import React from "react";
import useWebScraper from "../hooks/useWebScraper";

const ScraperComponent = () => {
  const { scrapedData, isLoading, error, refetch } = useWebScraper();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <p>List Length: {scrapedData.length}</p>

      {scrapedData.length > 0 && (
        <ul>
          {scrapedData.map((item, index) => (
            <>
              <p>{item.title}</p>
              <p>Rank: {item.rank}</p>
              <p>Comments: {item.comments}</p>
              <p>Points: {item.points}</p>
            </>
          ))}
        </ul>
      )}

      {/* <button onClick={refetch}>Refetch Data</button> */}
    </div>
  );
};

export default ScraperComponent;
