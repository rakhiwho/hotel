import HotelModel from "@/app/models/hotel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("_id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { type: "invalid or missing _id" },
        { status: 400 }
      );
    }
    const { hotelName, address, owner } = await req.json();

    const _id = new mongoose.Types.ObjectId(id);
    const hotel = await HotelModel.findById(_id);
    if (!hotel) {
       
      return NextResponse.json({ type: "hotel not found" }, { status: 404 });
    }
    if (hotelName) {
      hotel.hotelName = hotelName;
    }
    if (address) {
      hotel.address = address;
    }
    if (owner) {
      hotel.owner = owner;
    }
    await hotel.save();

    return NextResponse.json({ type: hotel }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ type: "something went wrong" }, { status: 500 });
  }
}
