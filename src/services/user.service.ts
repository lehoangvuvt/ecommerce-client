import axios from "axios";
import { TUserInfo, TCart, TFormattedCartItem } from "@/types/api.type";

const baseRoute = "users";

export const UserService = {
  async login(username: string, password: string): Promise<TUserInfo | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/login`,
        method: "POST",
        withCredentials: true,
        data: { username, password },
      });
      const data = response.data as TUserInfo;
      return data;
    } catch (error) {
      return null;
    }
  },
  async authentication(): Promise<TUserInfo | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/authentication`,
        method: "GET",
        withCredentials: true,
      });
      const data = response.data as TUserInfo;
      return data;
    } catch (error) {
      return null;
    }
  },
  async loginByRefreshToken(): Promise<TUserInfo | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/refresh-token`,
        method: "GET",
        withCredentials: true,
      });
      const data = response.data as TUserInfo;
      return data;
    } catch (error) {
      return null;
    }
  },
  async addToCart(
    product_variance_id: string,
    quantity: number
  ): Promise<TCart | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/add-to-cart`,
        method: "POST",
        withCredentials: true,
        data: {
          product_variance_id,
          quantity,
        },
      });
      const data = response.data as TCart;
      return data;
    } catch (error) {
      return null;
    }
  },
  async removeFromCart(product_variance_id: string): Promise<TCart | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/remove-from-cart`,
        method: "POST",
        withCredentials: true,
        data: {
          product_variance_id,
        },
      });
      const data = response.data as TCart;
      return data;
    } catch (error) {
      return null;
    }
  },
  async getCheckoutSummary(
    cartItemIdsString: string | null
  ): Promise<TFormattedCartItem[] | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/check-out/summary/${cartItemIdsString}`,
        method: "GET",
        withCredentials: true,
      });
      const data = response.data as TFormattedCartItem[];
      return data;
    } catch (error) {
      return null;
    }
  },
  async logout() {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/logout`,
        withCredentials: true,
        method: "GET",
      });
      const data = response.data;
      return data;
    } catch (error) {
      return null;
    }
  },
  async signUp(signUpData: {
    username: string;
    password: string;
    email: string;
  }): Promise<{ message: string } | null> {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/sign-up`,
        withCredentials: true,
        method: "POST",
        data: signUpData,
      });
      const data = response.data as { message: string };
      return data;
    } catch (error) {
      return null;
    }
  },
  async verifyAccount(
    verifyId: string
  ): Promise<
    { status: "Success"; message: string } | { status: "Failed"; error: string }
  > {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${baseRoute}/verify`,
        withCredentials: true,
        method: "PUT",
        data: {
          verify_id: verifyId,
        },
      });
      const data = response.data as { message: string };
      return {
        status: "Success",
        message: data.message,
      };
    } catch (e: any) {
      return {
        status: "Failed",
        error: e.response.data.error,
      };
    }
  },
};
