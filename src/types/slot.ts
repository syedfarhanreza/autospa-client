import { IService } from "./service";
export interface ISlot {
  _id: string;
  service: IService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "cancel";
}
