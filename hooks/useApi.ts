import useSWR from "swr";
import { clientFetcher } from "@/utils/api";

export function useApi<T>(url: string) {
  const { data, ...rest } = useSWR(url, (url) => clientFetcher<T>(url));
  const apiData = data?.data;

  return { data: apiData, ...rest };
}
