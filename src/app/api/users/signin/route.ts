import db from "@/dbConfig/dbConfog";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import { generate_Access_Refresh_Token } from "@/helpers/auth.hepers"; 


db();

export async function POST(request: NextRequest) {
   
  try {
     
    const { userName, password } =await request.json();
 
    if ([userName, password].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        { type:"missing info"},
        { status: 400 }
      );
    }

    //checking if user exists
    const user = await UserModel.findOne({ userName });
  
    if (!user) {
      return NextResponse.json(
        { type:"missing info" },
        { status: 404 }
      );
    }

    const password_is_valid = await user.isPasswordCorrect(password);
    if (!password_is_valid) {
      return NextResponse.json(
        { type: "missing info" },
        { status: 400 }
      );
    }
    const { refreshToken, accessToken } = await generate_Access_Refresh_Token(
      user._id
    );
    const options = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
    };
 
    const response = NextResponse.json(
      { type: "logged in successfully" + user },
      { status: 200 }
    );

    // Set cookies
    response.cookies.set("accessToken", accessToken, options);
    response.cookies.set("refreshToken", refreshToken, options);


    return  response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "statusError.INTERNAL_SERVER_ERROR "},
      { status: 500 }
    );
  }
}
