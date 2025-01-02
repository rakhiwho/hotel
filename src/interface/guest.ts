import { Document } from "mongoose";

export interface IGuest extends Document {
  fullName :string;
  mobileNumber:string;
  reason :string;
  address :string;
  emailID:string;
  start :string;
  end:string;
  IDProofNumber:string;
}
