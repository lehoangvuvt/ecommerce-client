import { create } from "zustand";

type State = {
  filters: { [key: string]: string[] };
  addFilterValue: (queryKey: string, value: string) => void;
  addFilterValues: (queryKey: string, values: string[]) => void;
  removeFilterValue: (queryKey: string, value: string) => void;
  setNewFilters: (newFilters: { [key: string]: string[] }) => void;
};

const useStore = create<State>((set) => ({
  filters: {},
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
}));

export default useStore;
