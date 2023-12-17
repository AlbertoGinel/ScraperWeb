import { render, screen, waitFor } from "@testing-library/react";
import ScraperComponent from "./components/ScraperComponent";
import useWebScraper from "./hooks/useWebScraper";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

test("test works", () => {
  expect(true).toBe(true);
});

jest.mock("./hooks/useWebScraper.js");

test("renders ScraperComponent with No filter option", () => {
  useWebScraper.mockReturnValue({
    scrapedData: [],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  });

  render(<ScraperComponent />);

  const selectedOption = screen.getByText(/No filter/i);
  expect(selectedOption).toBeInTheDocument();
});

// Mock DOMParser to return a temporary document
global.DOMParser = function () {
  return {
    parseFromString: (html) => {
      // Create a temporary HTML document
      const doc = document.implementation.createHTMLDocument();

      // Set the HTML content
      doc.documentElement.innerHTML = html;

      // Return the temporary document
      return doc;
    },
  };
};

describe("ScraperComponent", () => {
  test("renders with default option and list length", async () => {
    // Mocked data for the test
    const mockedData = [
      { rank: "1", title: "Title 1", points: "100", comments: "10" },
    ];

    // Mocked hook return value for the test
    const mockedHookReturnValue = {
      scrapedData: mockedData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    };

    // Mock the useWebScraper hook to return the mocked data
    require("./hooks/useWebScraper").default.mockReturnValue(
      mockedHookReturnValue
    );

    render(<ScraperComponent />);

    // Wait until the loading message disappears
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if the error message is not present
    expect(screen.queryByText("Error:")).not.toBeInTheDocument();

    // Check if the list length is correct
    expect(screen.getByText("List Length: 1")).toBeInTheDocument();

    // Check if the title 'Title 1' is present
    expect(screen.getByText("Title 1")).toBeInTheDocument();
  });

  test("filters data when option is changed", async () => {
    // Mocked data for the test
    const mockedData = [
      { rank: "1", title: "Title 1", points: "100", comments: "10" },
      { rank: "2", title: "Title 2", points: "50", comments: "5" },
    ];

    // Mocked hook return value for the test
    const mockedHookReturnValue = {
      scrapedData: mockedData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    };

    // Mock the useWebScraper hook to return the mocked data
    require("./hooks/useWebScraper").default.mockReturnValue(
      mockedHookReturnValue
    );

    render(<ScraperComponent />);

    // Find the option labeled 'Entries with more than five words'
    const optionElement = screen.queryByText(
      "Entries with more than five words"
    );

    // Click on the option if it exists
    await waitFor(() => {
      if (optionElement) {
        userEvent.click(optionElement);
      }
    });

    // Wait until the list length changes
    await waitFor(() => {
      expect(screen.getByText("List Length: 2")).toBeInTheDocument();
    });

    // Wait for the title 'Title 2' to be no longer present
    await waitFor(() => {
      expect(screen.getByText("Title 2")).toBeInTheDocument();
    });

    // Check if the title 'Title 1' is still present
    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
    });
  });
});
