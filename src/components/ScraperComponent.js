import React, { useState, useEffect } from "react";
import useWebScraper from "../hooks/useWebScraper";
import ArticleElement from "./ArticleElement";

const ScraperComponent = () => {
  const { scrapedData, isLoading, error, refetch } = useWebScraper();

  const [selectedOption, setSelectedOption] = useState("option1");
  const [filteredData, setFilteredData] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Filter the data based on the selected option
    if (selectedOption === "option1") {
      setFilteredData(scrapedData); //original
    } else if (selectedOption === "option2") {
      setFilteredData(
        scrapedData
          .filter((item) => item.title.split(" ").length > 5)
          .sort((a, b) => b.comments - a.comments)
      );
    } else if (selectedOption === "option3") {
      setFilteredData(
        scrapedData
          .filter((item) => item.title.split(" ").length <= 5)
          .sort((a, b) => b.points - a.points)
      );
    } else {
      setFilteredData(scrapedData);
    }
  }, [selectedOption, scrapedData]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="flex flex-col space-y-4 p-5">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOption === "option1"}
            onChange={() => handleOptionChange("option1")}
            className="mr-2"
          />
          No filter
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOption === "option2"}
            onChange={() => handleOptionChange("option2")}
            className="mr-2"
          />
          Entries with more than five words in the title ordered by the number
          of comments first.
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedOption === "option3"}
            onChange={() => handleOptionChange("option3")}
            className="mr-2"
          />
          Entries with less than or equal to five words in the title ordered by
          points.
        </label>

        <p>List Length: {filteredData.length}</p>

        {false && (
          <p className="font-bold">
            Selected Option: {selectedOption || "None"}
          </p>
        )}
      </div>

      {filteredData.length > 0 && (
        <ul>
          {filteredData.map((item, index) => (
            <ArticleElement key={index} item={item} />
          ))}
        </ul>
      )}

      {false && <button onClick={refetch}>Refetch Data</button>}
    </div>
  );
};

export default ScraperComponent;
