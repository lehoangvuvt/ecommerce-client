import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { TSearchTerm } from "@/types/api.type";
import { SearchService } from "@/services/search.service";

const getPopularSearchTerms = async (): Promise<TSearchTerm[]> => {
  const result = await SearchService.getPopularSearchTerms();
  return result;
};

const usePopularSearchTerms = (): {
  terms: TSearchTerm[];
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_POPULAR_SEARCH_TERMS],
    getPopularSearchTerms
  );
  return {
    terms: data ?? [],
    isError,
    isLoading,
  };
};

export default usePopularSearchTerms;
