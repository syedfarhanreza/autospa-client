import { TUser } from "./user";

export interface IReview {
  _id: string;
  user: TUser;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
