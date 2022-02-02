import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";
import * as useNasaSearch from "../hooks/useNasaSearch";

jest.mock("../hooks/useNasaSearch");

const data = {
  date: "2022-01-24",
  title: "Test Title",
  explanation: "Test Explanation",
  media_type: "image",
  url: "https://test.com",
};

describe("Home Page", () => {
  const spy = jest.spyOn(useNasaSearch, "useNasaSearch");

  afterEach(() => {
    spy.mockClear();
  });

  it("renders Home Page elements when isLoading is false and error is null", async () => {
    spy.mockImplementation(() => ({
      data,
      isLoading: false,
      error: null,
    }));

    render(<Home />);

    const DateFormTitle = screen.getByText("Try another date!");
    const inputDate = screen.getByTestId("date-input");
    const showPicButton = screen.getByRole("button", {
      name: "Show Picture",
    });

    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.date)).toBeInTheDocument();
    expect(screen.getByText(data.explanation)).toBeInTheDocument();
    expect(DateFormTitle).toBeInTheDocument();
    expect(inputDate).toBeInTheDocument();
    expect(showPicButton).toBeInTheDocument();
  });

  it("renders Loader icon when isLoading is true", async () => {
    spy.mockImplementation(() => ({
      data,
      isLoading: true,
      error: null,
    }));

    render(<Home />);

    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
  });

  it("renders Error Message when an error ocurrs", async () => {
    spy.mockImplementation(() => ({
      data,
      isLoading: false,
      error: "Error Test",
    }));

    render(<Home />);

    expect(screen.getByText("Error Test")).toBeInTheDocument();
  });
});
