import HotelModel from "@/app/models/hotel";
import db from "@/dbConfig/dbConfog";
import { NextRequest, NextResponse } from "next/server";

db();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { hotelName, owner, address } = reqBody;
    if (!hotelName || !owner || !address) {
      return NextResponse.json({ type: "missing credential" }, { status: 404 });
    }

    if ([hotelName, owner, address].some((field) => field?.trim() === "")) {
      return NextResponse.json({ type: "missing info" }, { status: 404 });
    }
    const hotel = await HotelModel.findOne({hotelName} );
    if (hotel) {
      return NextResponse.json(
        { type: "hotel name already exist" },
        { status: 400 }
      );
    }

    const newHotel = new HotelModel({
      hotelName,
      owner,
      address,
    });
   await newHotel.save();
    return NextResponse.json(
      { type: newHotel, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "internal server error" },
      { status: 500 }
    );
  }
}
