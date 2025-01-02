import db from "@/dbConfig/dbConfog";
 
import { getDataFromToken } from "@/helpers/get.tokendata";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

db();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userID = await getDataFromToken(req);
    if (!userID || typeof userID === "object") {
      return userID;
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      return NextResponse.json(
        { type: "UserError.NO_USER_FOUND" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type:" statusError.INTERNAL_SERVER_ERROR" , error },
      { status: 500 }
    );
  }
}
