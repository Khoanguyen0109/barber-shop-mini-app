import { selector } from "recoil";
import supabase from "../client/client";
import { userTotalPointState } from "../state";

export const settingState = selector({
  key: "settings",
  get: async () => {
    const { data, error } = await supabase.from("settings").select();
    return data || [];
  },
});

export const minOrderItemSelector = selector({
  key: "minOrderItemSelector",
  get: ({ get }) => {
    const setting = get(settingState);
    return Number(setting.find((item) => item.name === "min").value) || 5;
  },
});

export const bannerState = selector({
  key: "banner",
  get: ({ get }) => {
    const setting = get(settingState);
    return setting.filter((item) => item.type === "panel");
  },
});

export const nextPointSelector = selector({
  key: "nextPointSelector",
  get: ({ get }) => {
    const userTotalPoint = get(userTotalPointState);
    const settings = get(settingState);
    const scores = settings.filter((item) => item.type === "score");
    const nextPoint = scores.find(
      (item) => Number(item.value) > userTotalPoint
    );
    if (nextPoint) {
      return Number(nextPoint?.value);
    }
    return 0;
  },
});
