import axios from "axios";
import baseAxios from "./baseAxios";
import {
  TProductDetails,
  TProducItem,
  TSearchFilters,
  TPagingListResponse,
  TProductReview,
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
    const data = response.data as TPagingListResponse<TProducItem>;
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
    return data;
  },
  async getProductDetails(slug: string): Promise<TProductDetails> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/${slug}`,
      {
        method: "GET",
      }
    );
    const data = (await response.json()) as TProductDetails;
    return data;
  },
  async getSimilarProducts(slug: string): Promise<TProducItem[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/similar-products/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = (await response.json()) as TProducItem[];
    return data;
  },
  async getProductReviews(
    id: string,
    page: number
  ): Promise<TPagingListResponse<TProductReview>> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/review/id=${id}&page=${page}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = (await response.json()) as TPagingListResponse<TProductReview>;
    return data;
  },
};
