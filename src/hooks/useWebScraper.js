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

      const parsedData = parseHTML(html, 30);

      setScrapedData(parsedData);
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

  const parseHTML = (html, entryNumber) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const items = [];

    doc.querySelectorAll(".athing").forEach((athingElement, index) => {
      if (index < entryNumber) {
        const rank = athingElement
          .querySelector(".rank")
          .textContent.trim()
          .replace(/\D/g, "");

        const titleElement = athingElement.querySelector(".titleline a");
        const title = titleElement
          ? titleElement.textContent.trim()
          : "Title not found";

        const scoreElement =
          athingElement.nextElementSibling.querySelector(".score");
        const points = scoreElement
          ? scoreElement.textContent.trim().replace(/\D/g, "")
          : "0";

        const commentsElement =
          athingElement.nextElementSibling.querySelector(".subline");

        const comments =
          commentsElement && commentsElement.innerHTML
            ? commentsElement.innerHTML.match(/(\d+)\s*&nbsp;comments/)?.[1] ||
              "Comments not found"
            : "Comments not found";

        items.push({ rank, title, points, comments });
      }
    });

    return items;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  console.log(scrapedData, isLoading, error);

  return { scrapedData, isLoading, error, refetch };
};

export default useWebScraper;
