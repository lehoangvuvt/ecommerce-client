import { TCart, TUserInfo } from "@/types/api.type";
import { create } from "zustand";

export type TPathItem = {
  name: string;
  value: string;
  route: string;
  isLink: boolean;
};

type State = {
  filters: { [key: string]: string[] };
  path: TPathItem[];
  userInfo: TUserInfo | null;
  addFilterValue: (queryKey: string, value: string) => void;
  addFilterValues: (queryKey: string, values: string[]) => void;
  removeFilterValue: (queryKey: string, value: string) => void;
  setNewFilters: (newFilters: { [key: string]: string[] }) => void;
  setPath: (newPath: TPathItem[]) => void;
  setUserInfo: (userInfo: TUserInfo | null) => void;
};

const useStore = create<State>((set) => ({
  filters: {},
  path: [],
  userInfo: null,
  addFilterValue: (queryKey: string, value: string) =>
    set((state: State) => ({
      filters: {
        ...state.filters,
        [queryKey]: state.filters[queryKey]
          ? [...state.filters[queryKey], value]
          : [value],
      },
    })),
  addFilterValues: (queryKey: string, values: string[]) =>
    set((state: State) => ({
      filters: {
        ...state.filters,
        [queryKey]: values,
      },
    })),
  removeFilterValue: (queryKey: string, value: string) =>
    set((state: State) => ({
      filters: {
        ...state.filters,
        [queryKey]: state.filters[queryKey].filter((item) => item !== value),
      },
    })),
  setNewFilters: (newFilters: { [key: string]: string[] }) =>
    set((state: State) => ({
      filters: newFilters,
    })),
  setPath: (newPath: TPathItem[]) =>
    set((state: State) => ({
      path: newPath,
    })),
  setUserInfo: (userInfo: TUserInfo | null) =>
    set((state: State) => ({
      userInfo: userInfo,
    })),
}));

export default useStore;
