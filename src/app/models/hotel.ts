import mongoose, { Schema, model , models } from "mongoose";
import { IHotel } from "@/interface/IHotel";
const hotelShema: Schema<IHotel> = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required:  true,
      unique: true,
    },
    owner: {
      type: String,
      required: true,
    },
     logo: {
      type: String,
      required: false,
    },
    address :{
      type: String,
      default: false,

    },
    guest:{
        type :[String],
    }
  },
  { timestamps: true }
);
 
 
const  HotelModel = models.hotel || model<IHotel>("hotel", hotelShema);
export default  HotelModel;
