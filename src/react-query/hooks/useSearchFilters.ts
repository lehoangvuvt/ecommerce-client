import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { TSearchFilters } from "@/types/api.type";
import { ProductService } from "@/services/product.service";
import { ReadonlyURLSearchParams } from "next/navigation";

const getSearchFilters = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<TSearchFilters> => {
  const searchParams = queryKey[1];
  const result = await ProductService.getSearchFilters(searchParams);
  return result;
};

const useSearchFilters = (
  searchParams: string
): {
  result: TSearchFilters | null;
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_SEARCH_FILTERS, searchParams],
    getSearchFilters,
    {
      enabled: searchParams.trim().length > 0,
    }
  );
  return {
    result: data ?? null,
    isError,
    isLoading,
  };
};

export default useSearchFilters;
