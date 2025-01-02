import GuestModel from "@/app/models/guest";
import HotelModel from "@/app/models/hotel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const hotel = await HotelModel.findById(id);

    if (!hotel) {
      return NextResponse.json({ type: "not found" }, { status: 404 });
    }
    if (
      [
        fullName,
        mobileNumber,
        address,
        reason,
        emailID,
        start,
        end,
        IDProofNumber,
      ].some((field) => field?.trim() === "")
    ) {
      return NextResponse.json({ type: "missing info" }, { status: 400 });
    }

    const newGuest = new GuestModel({
      fullName,
      mobileNumber,
      address,
      reason,
      emailID,
      start,
      end,
      IDProofNumber,
    });

    if (!newGuest) {
      return NextResponse.json(
        { type: "something went wrong with proceess" },
        { status: 300 }
      );
    }

    await newGuest.save();

    await hotel.guest.push(newGuest._id);
    await hotel.save();
    console.log(hotel);
    console.log(newGuest);
    return NextResponse.json(
      { type: "success", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ type: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const _id = searchParams.get("_id");
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { type: "invalid or missing _id" },
        { status: 400 }
      );
    }

    const id = new mongoose.Types.ObjectId(_id);
    const hotel = await HotelModel.findById(id);

    if (!hotel) {
      return NextResponse.json({ type: "not found" }, { status: 404 });
    }

    const guests = await Promise.all(
      hotel.guest.map((g: string) => GuestModel.findById(g))
    );

    if (!guests) {
      return NextResponse.json(
        { type: "something went wrong with proceess" },
        { status: 300 }
      );
    }

    return NextResponse.json({ type: guests, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ type: "something went wrong" }, { status: 500 });
  }
}