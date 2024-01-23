import baseAxios from "./baseAxios";
import { TSearchTerm } from "@/types/api.type";

const baseRoute = "search";

export const SearchService = {
  async getPopularSearchTerms(): Promise<TSearchTerm[]> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/popular-search-terms`,
        method: "GET",
      });
      if (response.status === 200) {
        const data = response.data as TSearchTerm[];
        return data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  async getSuggestedSearchTerms(term: string): Promise<TSearchTerm[]> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/suggestion/${term}`,
        method: "GET",
      });
      if (response.status === 200) {
        const data = response.data as TSearchTerm[];
        return data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
};
