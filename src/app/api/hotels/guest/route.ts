import GuestModel from "@/app/models/guest";
import hotelModel from "@/app/models/hotel";
import db from "@/dbConfig/dbConfog";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

db();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    if (!_id) {
      return NextResponse.json({ type: "missing credential" }, { status: 404 });
    }

    const id = new mongoose.Types.ObjectId(_id);

    const guest = await GuestModel.findById(id);
    if (!guest) {
      return NextResponse.json({ type: "hotel doesnt exist" }, { status: 400 });
    }

    return NextResponse.json({ type: guest , success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const _id = searchParams.get("_id");
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { type: "invalid or missing _id" },
        { status: 400 }
      );
    }
    const {
      fullName,
      mobileNumber,
      address,
      emailID,
      reason,
      start,
      end,
      IDProofNumber,
    } = await req.json();
    
    const id = new mongoose.Types.ObjectId(_id);
    console.log(id)
    
    const guest = await GuestModel.findById(id);
  
    if (!guest) {
      return NextResponse.json({ type: "not found" }, { status: 404 });
    }

    if (fullName) {
      guest.fullName = fullName;
    }

    if (address) {
      guest.address = address;
    }

    if (mobileNumber) {
      guest.mobileNumber = mobileNumber;
    }

    if (reason) {
      guest.reason = reason;
    }

    if (emailID) {
      guest.emailID = emailID;
    }

    if (start) {
      guest.start = start;
    }

    if (end) {
      guest.end = end;
    }

    if (IDProofNumber) {
      guest.IDProofNumber = IDProofNumber;
    }

    await guest.save();

    console.log(guest);

    return NextResponse.json({ type: guest, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ type: error }, { status: 500 });
  }
}


