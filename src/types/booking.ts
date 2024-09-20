import { IService } from "./service";
import { ISlot } from "./slot";
import { TUser } from "./user";

export interface IBooking {
  customer: string;
  slot: string;
  service: string;
}
export interface IUserBooking {
  _id: string;
  customer: TUser;
  slot: ISlot;
  service: IService;
  payment: string;
  status: "cancel" | "confirm";
}

export type TBookingCountDown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
