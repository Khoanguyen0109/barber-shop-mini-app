import { atom, selector, selectorFamily } from "recoil";
import supabase from "../client/client";
import { TStore } from "../types/store";

export const storesSelector = selector<TStore[]>({
  key: "storesSelector",
  get: async () => {
    const { data, error } = await supabase.from("stores").select("*");
    return data || [];
  },
});

export const selectedStoreState = atom<TStore | null>({
  key: "selectedStoreState",
  default: null,
});

export const storeServicesSelector = selector({
  key: "selectStoreServices",
  get: async ({ get }) => {
    const selectedStore = get(selectedStoreState);
    if (selectedStore) {
      const { data, error } = await supabase
        .from("stores")
        .select("*, store_services(*)")
        .eq("id", selectedStore?.id);
    }
    return {};
  },
});
