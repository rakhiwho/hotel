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

    const hotel = await hotelModel.findById(id);
    if (!hotel) {
      return NextResponse.json({ type: "hotel doesnt exist" }, { status: 400 });
    }

    return NextResponse.json({ type: hotel, success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "internal server error" },
      { status: 500 }
    );
  }
}
