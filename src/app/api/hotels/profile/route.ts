import hotelModel from "@/app/models/hotel";
import { NextRequest, NextResponse } from "next/server";
import { promisify } from "util";
import multer from "multer";
// import upload from "../../../../helpers/coudinary"

// Configure Multer storage
const storage = multer.memoryStorage();  
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");

 

// Helper to run middleware
async function runMiddleware(req, middleware) {
  return new Promise((resolve, reject) => {
    middleware(req, {
      statusCode: 200,
      setHeader: () => {},
      end: () => {},
    }, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export async function POST(req : NextRequest ) {
  try {
    // Run the Multer middleware to process the file
    await runMiddleware(req, uploadMiddleware);

    // Retrieve file and body data
    const file = req.formData;
     console.log(file)
    if (!file) {
      return NextResponse.json({ error: "File upload failed" }, { status: 400 });
    }

    // Fetch the hotel and update its logo
    const hotel = await hotelModel.findById(id);
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    hotel.logo = file.buffer; // Save file data to your database (e.g., in a buffer or URL)
    await hotel.save();

    return NextResponse.json(
      { message: "File uploaded successfully", url: hotel.logo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}