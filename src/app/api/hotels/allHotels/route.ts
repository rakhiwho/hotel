import HotelModel from "@/app/models/hotel";
import db from "@/dbConfig/dbConfog";
import { NextRequest, NextResponse } from "next/server";
 
db();

export async function GET(req: NextRequest) {
  try {
    
   const hotels = await HotelModel.find();

    return NextResponse.json(
      { type: hotels },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "internal server error" },
      { status: 500 }
    );
  }
}
