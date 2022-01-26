import { renderHook } from "@testing-library/react-hooks";
import { useNasaSearch } from "./useNasaSearch";
import * as useFetch from "./useFetch";

const data = {
  date: "2022-01-24",
  title: "Test Title",
  explanation: "Test Explanation",
  media_type: "image",
  url: "https://test.com",
};

describe("useNasaSearch hook", () => {
  const spy = jest.spyOn(useFetch, "useFetch");

  afterEach(() => {
    spy.mockClear();
  });

  it("fetches data correctly", () => {
    spy.mockImplementation(() => ({
      data,
      isLoading: false,
      error: null,
    }));

    const { result } = renderHook(useNasaSearch);

    expect(result.current.data).toEqual(data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("handles isLoading state correctly", () => {
    spy.mockImplementation(() => ({
      data,
      isLoading: true,
      error: null,
    }));

    const { result } = renderHook(useNasaSearch);

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("handles error state correctly", () => {
    spy.mockImplementation(() => ({
      data,
      isLoading: false,
      error: "Error Test",
    }));

    const { result } = renderHook(useNasaSearch);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Error Test");
  });
});
