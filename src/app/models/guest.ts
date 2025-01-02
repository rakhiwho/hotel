import mongoose, { Schema, model , models } from "mongoose";
import { IGuest } from "@/interface/guest";
const guestShema: Schema<IGuest> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required:  true,
      
    },
    mobileNumber: {
      type: String,
      required: true,
    },
     emailID: {
      type: String,
      required: false,
    },
    reason :{
      type: String,
      required: false,
    },
    address :{
      type: String,
      default: false,

    },
     start:{
        type :String,
    },
     end:{
        type :String,
    },
     IDProofNumber:{
        type :String,
    }
  },
  { timestamps: true }
);
 
 
const   GuestModel = models.guest || model<IGuest>("guest",  guestShema);
export default   GuestModel;
