import { atom } from "recoil";
import { TService } from "../types/services";

export const selectServiceBookingState = atom<TService | null>({
  key: "selectServiceBookingState",
  default: null,
});
