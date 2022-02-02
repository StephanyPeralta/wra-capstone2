import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "./useFetch";

const data = {
  date: "2022-01-24",
  title: "Test Title",
  explanation: "Test Explanation",
  media_type: "image",
  url: "https://test.com",
};

const optionsMock = {
  defaulValue: [],
  params: {
    api_key: process.env.NEXT_PUBLIC_NASA_API_KEY as string,
    date: "2022-01-24",
  },
};

describe("useFetch hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the API correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data }),
      })
    ) as jest.Mock;

    renderHook(() =>
      useFetch("https://api.nasa.gov/planetary/apod", optionsMock)
    );

    expect(global.fetch).toBeCalledWith(
      `https://api.nasa.gov/planetary/apod?api_key=${optionsMock.params.api_key}&date=${optionsMock.params.date}`
    );
  });

  it("fetches API data when response.ok is true", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data }),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.nasa.gov/planetary/apod", optionsMock)
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ data });
  });

  it("handles error state when response.ok is false", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        ok: false,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.nasa.gov/planetary/apod", optionsMock)
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("There was an error, please try again.");
  });

  it("handles API errors when response.ok is false", async () => {
    const errorMsg = "API Error";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            msg: errorMsg,
          }),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.nasa.gov/planetary/apod", optionsMock)
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMsg);
  });
});
