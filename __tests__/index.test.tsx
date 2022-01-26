/* eslint-disable react/display-name */
import { renderHook } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";
import { useNasaSearch } from "../hooks/useNasaSearch";

jest.mock("../hooks/useNasaSearch");

const useNasaSearchMock = useNasaSearch as jest.MockedFunction<
  typeof useNasaSearch
>;

jest.mock("../hooks/useNasaSearch");
jest.mock("../components/InfoSection", () => () => <div>InfoSection Mock</div>);
jest.mock("../components/DateForm", () => () => <div>DateForm Mock</div>);

const data = {
  date: "2022-01-24",
  title: "Test Title",
  explanation: "Test Explanation",
  media_type: "image",
  url: "test.com",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data }),
  })
) as jest.Mock;

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders InfoSection and DateForm when isLoading is false and error is null", async () => {
    useNasaSearchMock.mockImplementation(() => ({
      data,
      isLoading: false,
      error: null,
    }));

    renderHook(() => useNasaSearch(data.date));

    render(<Home />);

    expect(screen.getByText("InfoSection Mock")).toBeInTheDocument();
    expect(screen.getByText("DateForm Mock")).toBeInTheDocument();
  });

  it("renders Loader icon when isLoading is true", async () => {
    useNasaSearchMock.mockImplementation(() => ({
      data,
      isLoading: true,
      error: null,
    }));

    renderHook(() => useNasaSearch(data.date));

    render(<Home />);

    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
  });

  it("renders Error Message when an error ocurrs", async () => {
    useNasaSearchMock.mockImplementation(() => ({
      data,
      isLoading: false,
      error: "Error Test",
    }));

    renderHook(() => useNasaSearch(data.date));

    render(<Home />);

    expect(screen.getByText("Error Test")).toBeInTheDocument();
  });
});
