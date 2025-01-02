import HotelModel from "@/app/models/hotel";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINERY_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_API_SECRET,
  // Click 'View API Keys' above to copy your API secret
});

interface cloudinaryUpload {
  PUBLIC_ID: string;
  [key: string]: any;
}

export async function POST(req: NextRequest, res: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const id = formData.get("id") as File | null;
    if (!file) {
   
      return NextResponse.json({ type: "file not iploaded" }, { status: 400 });
    }
    if (!id) {
      
      return NextResponse.json({ type: "id is undefined" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<cloudinaryUpload>((resolve, reject) => {
      const upload_stream = cloudinary.uploader.upload_stream(
        { folder: "next-cloudinay" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as cloudinaryUpload);
        }
      );

      upload_stream.end(buffer);
    });
    const _id = new mongoose.Types.ObjectId(id)
    const hotel = await HotelModel.findById(_id);
    if (!hotel) {
      return NextResponse.json({ type: "hotel not found" }, { status: 404 });
    }

    hotel.logo = result.url;
    await hotel.save();
     
   console.log(hotel)
    return NextResponse.json({ type: hotel }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ type: "something went wrong" }, { status: 500 });
  }
}
