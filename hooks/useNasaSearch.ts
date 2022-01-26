import { useMemo } from "react";
import { useFetch } from "./useFetch";

function useNasaSearch(searchDate: string) {
  const params = useMemo(
    () => ({
      api_key: process.env.NEXT_PUBLIC_NASA_API_KEY as string,
      date: searchDate,
    }),
    [searchDate]
  );

  const { data, isLoading, error } = useFetch(
    "https://api.nasa.gov/planetary/apod",
    { defaultValue: [], params }
  );

  return { data, isLoading, error };
}

export { useNasaSearch };
