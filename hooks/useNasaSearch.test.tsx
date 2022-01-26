import { renderHook } from "@testing-library/react-hooks";
import { useNasaSearch } from "./useNasaSearch";
import { useFetch } from "./useFetch";

jest.mock("./useFetch");

const useFecthMock = useFetch as jest.MockedFunction<typeof useFetch>;

const data = {
  date: "2022-01-24",
  title: "Test Title",
  explanation: "Test Explanation",
  media_type: "image",
  url: "https://test.com",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data }),
  })
) as jest.Mock;

describe("useNasaSearch hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data correctly", () => {
    useFecthMock.mockImplementation(() => ({
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
    useFecthMock.mockImplementation(() => ({
      data,
      isLoading: true,
      error: null,
    }));

    const { result } = renderHook(useNasaSearch);

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("handles error state correctly", () => {
    useFecthMock.mockImplementation(() => ({
      data,
      isLoading: false,
      error: "Error Test",
    }));

    const { result } = renderHook(useNasaSearch);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Error Test");
  });
});
