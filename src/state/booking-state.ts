import { DateTime } from "luxon";
import { atom, selector } from "recoil";
import { TService } from "../types/services";
import { TBooking } from "../types/booking";
import supabase from "../client/client";
import { userState } from "../state";
import { EBookingStatus } from "../constants";

export const selectServiceBookingState = atom<TService | null>({
  key: "selectServiceBookingState",
  default: null,
});

export const selectTimeBookingState = atom({
  key: "selectTimeBookingState",
  default: +new Date(),
});

export const dateSelectedState = selector({
  key: "dateSelectedState",
  get: ({ get }) => {
    const timestamp = get(selectTimeBookingState);
    const localDateOnly = DateTime.fromMillis(timestamp).toLocaleString({
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return localDateOnly;
  },
});

export const timeSelectedState = selector({
  key: "timeSelectedState",
  get: ({ get }) => {
    const timestamp = get(selectTimeBookingState);
    const localTimeOnly = DateTime.fromMillis(timestamp).toLocaleString(
      DateTime.TIME_SIMPLE
    );

    return localTimeOnly;
  },
});

export const bookingListSelector = selector<TBooking[]>({
  key: "bookingListSelector",
  get: async ({ get }) => {
    const user = get(userState);
    const { data } = await supabase
      .from("schedules")
      .select(
        "*, storeService: store_services(*, store: stores(*), service: services(*))"
      )
      .eq("userId", user.id);

    return data || [];
  },
});

export const bookingListState = atom<TBooking[]>({
  key: "bookingListState",
  default: bookingListSelector,
});

export const doneBookingSelector = selector<TBooking[]>({
  key: "doneBookingSelector",
  get: async ({ get }) => {
    const bookingList = get(bookingListState);
    return bookingList.filter((item) => item.status === EBookingStatus.DONE);
  },
});

export const notDoneBookingSelector = selector<TBooking[]>({
  key: "notDoneBookingSelector",
  get: async ({ get }) => {
    const bookingList = get(bookingListState);
    return bookingList.filter(
      (item) => item.status === EBookingStatus.NOT_DONE
    );
  },
});
