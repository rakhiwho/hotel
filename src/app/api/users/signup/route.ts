import db from "@/dbConfig/dbConfog";
import UserModel from "@/app/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

db();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, password, email } = reqBody;
 
    if ([email, userName, password].some((field) => field?.trim() === "")) {
      return NextResponse.json({ type: "missing info" }, { status: 404 });
    }

    //checking if user exists
    const user = await UserModel.findOne({ userName });
    if (user) {
      return NextResponse.json({ type: "user already exist" }, { status: 400 });
    }
     

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    const saved_User = await new_user.save();
    console.log(saved_User);
    return NextResponse.json(
      { type: "user created", success: true, saved_User },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: " internal server error " },
      { status: 500 }
    );
  }
}
