import { create } from "zustand";

type State = {
  filters: { [key: string]: string[] };
  path: string[];
  addFilterValue: (queryKey: string, value: string) => void;
  addFilterValues: (queryKey: string, values: string[]) => void;
  removeFilterValue: (queryKey: string, value: string) => void;
  setNewFilters: (newFilters: { [key: string]: string[] }) => void;
  setPath: (newPath: string[]) => void;
};

const useStore = create<State>((set) => ({
  filters: {},
  path: [],
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
  setPath: (newPath: string[]) =>
    set((state: State) => ({
      path: newPath,
    })),
}));

export default useStore;
