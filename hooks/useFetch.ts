import { useState, useEffect, useCallback } from "react";

interface Options {
  defaultValue?: any;
  params?: Record<string, string>;
}

function useFetch(
  url: string,
  options: Options = {
    defaultValue: null,
    params: {},
  }
) {
  const [data, setData] = useState(options.defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${url}?${new URLSearchParams(options.params)}`
      );
      const data = await response.json();
      if (response.ok) {
        setData(data);
      } else {
        setError(data.msg);
      }
    } catch {
      setError("There was an error, please try again.");
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, [url, options.params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}

export { useFetch };
