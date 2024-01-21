import baseAxios from "./baseAxios";

const baseRoute = "category";

export const CategoryService = {
  async getAllCategories(): Promise<any[]> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/`,
        method: "GET",
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  async getCategoryDetails(categoryId: string): Promise<any> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/${categoryId}`,
        method: "GET",
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  async getCategoryDetailsBySlug(slug: string): Promise<any> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/slug/${slug}`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
};
