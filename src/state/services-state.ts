import { atom, selector } from "recoil";
import supabase from "../client/client";
import { TService } from "../types/services";

export const servicesSelector = selector({
  key: "servicesSelector",
  get: async ({ get }) => {
    const { data, error } = await supabase.from("services").select("*");
    return data || [];
  },
});

export const selectedServiceState = atom<TService[]>({
  key: "selectedServiceState",
  default: [],
});

export const selectStoreByServiceSelector = selector({
  key: "selectStoreByServiceSelector",
  get: async ({ get }) => {
    const selectedService = get(selectedServiceState);
    const { data } = await supabase
      .from("services")
      .select("* , store_services(* , stores(*))")
      .in(
        "id",
        selectedService.map((item) => item.id)
      );
    return data;
  },
});

export const selectServiceState = atom<TService | null>({
  key: "selectServiceState",
  default: null,
});
