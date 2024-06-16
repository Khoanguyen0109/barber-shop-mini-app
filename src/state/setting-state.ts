import { selector } from "recoil";
import supabase from "../client/client";

export const settingState = selector({
  key: "settings",
  get: async () => {
    const { data, error } = await supabase.from("settings").select();
    return data;
  },
});

export const minOrderItemSelector = selector({
  key: "minOrderItemSelector",
  get: ({ get }) => {
    const setting = get(settingState);
    return Number(setting.find((item) => item.name === "min").value) || 5;
  },
});
