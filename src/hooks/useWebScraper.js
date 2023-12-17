import { useState, useEffect } from "react";
import axios from "axios";

const useWebScraper = () => {
  const [scrapedData, setScrapedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://news.ycombinator.com/"
      );
      const html = response.data;

      console.log(html);

      setScrapedData(html);
    } catch (error) {
      setError(error);
      console.error("There is an error in useWebScraper", error);

      window.confirm(
        "There was an error fetching data. Please go to https://cors-anywhere.herokuapp.com/https://news.ycombinator.com/ press: 'Request temporary access to the demo server'"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {};
};

export default useWebScraper;
