import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { TSearchTerm } from "@/types/api.type";
import { SearchService } from "@/services/search.service";

const getSuggestedSearchTerms = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<TSearchTerm[]> => {
  const term = queryKey[1];
  const result = await SearchService.getSuggestedSearchTerms(term);
  return result;
};

const useSuggestedSearchTerms = (
  term: string
): {
  suggestedTerms: TSearchTerm[];
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_SUGGESTED_SEARCH_TERMS, term],
    getSuggestedSearchTerms,
    {
      enabled: term.length > 2,
    }
  );
  return {
    suggestedTerms: data ?? [],
    isError,
    isLoading,
  };
};

export default useSuggestedSearchTerms;
