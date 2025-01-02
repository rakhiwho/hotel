import { Document } from "mongoose";

export interface IHotel extends Document {
  hotelName: string;
  owner: string;
  logo?: string;
  address?: string;
}
