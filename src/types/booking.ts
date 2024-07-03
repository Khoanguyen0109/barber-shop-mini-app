import { EBookingStatus } from "../constants";
import { TService } from "./services";
import { TStore } from "./store";

export type TBooking = {
  id: number;
  createdAt: Date;
  date: string;
  time: string;
  userId: number;
  storeServiceId: string;
  status: EBookingStatus;
  storeService: {
    store: TStore;
    service: TService;
    price: number;
  };
};
