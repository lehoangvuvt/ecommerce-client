import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { TPagingListResponse, TProducItem } from "@/types/api.type";
import { ProductService } from "@/services/product.service";

const getSearchProducts = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<TPagingListResponse<TProducItem>> => {
  const searchParams = queryKey[1];
  const result = await ProductService.searchProducts(searchParams);
  return result;
};

const useSearchProducts = (
  searchParams: string,
  deviceType: "desktop" | "mobile" | null
): {
  result: TPagingListResponse<TProducItem>;
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_SEARCH_PRODUCTS, searchParams],
    getSearchProducts,
    {
      enabled: searchParams.trim().length > 0 && deviceType === "desktop",
    }
  );
  return {
    result: data ?? {
      current_page: 0,
      data: [],
      has_next: false,
      total: 0,
      total_page: 0,
    },
    isError,
    isLoading,
  };
};

export default useSearchProducts;
