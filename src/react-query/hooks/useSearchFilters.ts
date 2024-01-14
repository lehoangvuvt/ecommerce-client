import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { TSearchFilters } from "@/types/api.type";
import { ProductService } from "@/services/product.service";

const getSearchFilters = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<TSearchFilters> => {
  const serachParams = queryKey[1];
  const result = await ProductService.getSearchFilters(serachParams);
  return result;
};

const useSearchFilters = (searchParams: {
  [key: string]: string;
}): {
  result: TSearchFilters | null;
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_SEARCH_FILTERS, searchParams],
    getSearchFilters,
    {
      enabled: !!searchParams,
    }
  );
  return {
    result: data ?? null,
    isError,
    isLoading,
  };
};

export default useSearchFilters;
