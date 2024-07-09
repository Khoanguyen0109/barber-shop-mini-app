import { atom, selector } from "recoil";
import supabase from "../client/client";
import { TStore } from "../types/store";
import { selectServiceState } from "./services-state";

export const storesSelector = selector<TStore[]>({
  key: "storesSelector",
  get: async ({ get }) => {
    const serviceSelected = get(selectServiceState);
    if (serviceSelected) {
      const { data: storeServiceData } = await supabase
        .from("store_services")
        .select("*, stores(*)")
        .eq("serviceId", serviceSelected.id);
      return storeServiceData?.map((item) => item.stores) || [];
    }
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
        .select("*, storeServices:store_services(*, services(*))")
        .eq("id", selectedStore?.id);
      if (data && data.length) {
        return data[0] || {};
      }
    }
    return {};
  },
});
