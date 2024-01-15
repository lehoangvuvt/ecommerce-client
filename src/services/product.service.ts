import axios from "axios";
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
    let currentPage = 0;
    for (let key in searchParams) {
      if (key === "page") {
        currentPage = parseInt(searchParams[key]);
      } else {
        searchParamsString += `${key}=${searchParams[key]}&`;
      }
    }
    searchParamsString = searchParamsString.substring(
      0,
      searchParamsString.length - 1
    );
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/search/${searchParamsString}&page=${currentPage}`,
      method: "GET",
    });
    const data = response.data;
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
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/search/search-filters/${searchParamsString}`,
      method: "GET",
    });
    const data = response.data as TSearchFilters;
    console.log({ data });
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
