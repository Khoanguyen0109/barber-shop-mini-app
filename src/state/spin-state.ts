import { atom, selector } from "recoil";
import { TCampaign, TPrize, TUserPrize } from "../types/spint";
import supabase from "../client/client";
import { userState } from "../state";
import { settingState } from "./setting-state";
import { WheelDataType } from "react-custom-roulette";
import { isEmpty } from "lodash";

export const backGroundSelector = selector({
  key: "background",
  get: ({ get }) => {
    const setting = get(settingState);
    const background = setting.find((item) => item.name === "background");
    return background?.value;
  },
});

export const backGroundPrizeSelector = selector({
  key: "backGroundPrizeSelector",
  get: ({ get }) => {
    const setting = get(settingState);
    const background = setting.find(
      (item) => item.name === "background_phan_thuong"
    );
    return background?.value;
  },
});

export const backGroundReceivedSelector = selector({
  key: "backGroundReceivedSelector",
  get: ({ get }) => {
    const setting = get(settingState);
    const background = setting.find(
      (item) => item.name === "backgroun_nhan_qua"
    );
    return background?.value;
  },
});

export const campaignSelector = selector<TCampaign>({
  key: "campaign",
  get: async () => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select(`*, prizes(*)`)
        .eq("status", "Active")
        .limit(1);
      return data?.[0] || null;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  },
});

export const userPrizeSelector = selector({
  key: "userPrizeSelector",
  get: async ({ get }) => {
    try {
      const user = get(userState);
      get(userPrizeState);
      if (user.id) {
        const { data, error } = await supabase
          .from("users")
          .select(`*, userPrizes: user_prizes(*)`)
          .eq("id", user.id);
        if (data?.length) {
          return data[0].userPrizes;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  },
});

export const canSpinSelector = selector<boolean>({
  key: "haveSpinAllSelector",
  get: ({ get }) => {
    const campaign = get(campaignSelector);
    if (campaign) {
      const userPrizeOfCampaign = get(userPrizeSelector).filter(
        (item) => item.campaignId === campaign.id
      );

      return Number(campaign.spinTimes) > userPrizeOfCampaign.length;
    }
    return false;
  },
});

export const userPrizeListState = atom({
  key: "userPrizeListState",
  default: userPrizeSelector,
});

export const userPrizeState = atom<TUserPrize | null>({
  key: "userPrizeState",
  default: null,
});

export const receivedPrizeState = atom<TPrize | null>({
  key: "receivedPrize",
  default: null,
});

export const wheelDataState = selector<WheelDataType[]>({
  key: "wheelData",
  get: ({ get }) => {
    const campaign = get(campaignSelector);
    if (campaign || !isEmpty(campaign)) {
      const wheelData = campaign.prizes.map((item) => ({
        option: item.name,
        ...(item?.image
          ? {
              image: {
                uri: item.image,
                offsetY: 80,
                sizeMultiplier: 0.6,
              },
            }
          : {}),
      }));
      return wheelData;
    }
    return [];
  },
});
