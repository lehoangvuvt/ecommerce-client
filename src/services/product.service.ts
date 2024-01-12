import baseAxios from "./baseAxios";
import {
  TProductDetails,
  TProducItem,
  TSearchFilters,
  TPagingListResponse,
} from "@/types/api.type";

const baseRoute = "product";

export const ProductService = {
  async searchProducts(searchParams: {
    [key: string]: string;
  }): Promise<TPagingListResponse<TProducItem>> {
    let searchParamsString = "";
    for (let key in searchParams) {
      searchParamsString += `${key}=${searchParams[key]}&`;
    }
    searchParamsString = searchParamsString.substring(
      0,
      searchParamsString.length - 1
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/search/${searchParamsString}&page=0`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  },
  async getSearchFilters(searchParams: {
    [key: string]: string;
  }): Promise<TSearchFilters> {
    let searchParamsString = "";
    for (let key in searchParams) {
      searchParamsString += `${key}=${searchParams[key]}&`;
    }
    searchParamsString = searchParamsString.substring(
      0,
      searchParamsString.length - 1
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/search/search-filters/${searchParamsString}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = (await response.json()) as TSearchFilters;
    return data;
  },
  async getProductDetails(slug: string): Promise<TProductDetails> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  },
};
