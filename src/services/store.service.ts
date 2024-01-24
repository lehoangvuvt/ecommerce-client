import { TStoreDetails, TStoreOverview } from "@/types/api.type";

const baseRoute = "store";

export const StoreService = {
  async getStoreDetails(url: string): Promise<TStoreDetails | null> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/${url}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (response.status === 200) {
      const data = (await response.json()) as TStoreDetails;
      return data;
    } else {
      return null;
    }
  },
  async getStoreOverview(storeId: number): Promise<TStoreOverview | null> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/overview/${storeId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (response.status === 200) {
      const data = (await response.json()) as TStoreOverview;
      return data;
    } else {
      return null;
    }
  },
};
