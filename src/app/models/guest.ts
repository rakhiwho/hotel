import mongoose, { Schema, Document } from "mongoose";
 

// interface IGuest extends Document {
//   fullName :string;
//   mobileNumber:string;
//   reason :string;
//   emailID:string;
//   address :string;
//   start :string;
//   end:string;
//   IDProofNumber:string;
// }
 
const guestSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
    },
   
    address: {
      type: String,
      default: false,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    IDProofNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GuestModel = mongoose.model("Guest", guestSchema);

export default GuestModel;
