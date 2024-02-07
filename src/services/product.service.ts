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
  async searchProducts(
    searchParams: string
  ): Promise<TPagingListResponse<TProducItem>> {
    let searchParamsString = "";
    if (searchParams.includes("page")) {
      searchParamsString = searchParams;
    } else {
      searchParamsString = searchParams + "&page=0";
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/search/${searchParamsString}`,
      method: "GET",
    });
    const data = response.data as TPagingListResponse<TProducItem>;
    return data;
  },
  async getSearchFilters(searchParams: string): Promise<TSearchFilters> {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/search/search-filters/${searchParams}`,
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
