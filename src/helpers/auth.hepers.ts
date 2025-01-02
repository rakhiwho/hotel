 
import UserModel from "@/app/models/user";
import mongoose from "mongoose";
import { ApiError } from "next/dist/server/api-utils";
 
 interface Tokens {
    accessToken: string;
    refreshToken: string;
}
async function generate_Access_Refresh_Token(userId: string | mongoose.Types.ObjectId) :Promise<Tokens>{
  
    try {
        const User = await UserModel.findById(userId);

        if (!User) {
            throw new ApiError(404, "UserError.NO_USER_FOUND");
        }
        if (typeof User.generateAccessToken !== "function" || typeof User.generateRefreshToken !== "function") {
            console.error("Token generation methods missing on User model instance.");
            throw new ApiError(500, "statusError.INTERNAL_SERVER_ERROR");
          }
        const accessToken = User.generateAccessToken();
        const refreshToken = User.generateRefreshToken();

        User.refreshToken = refreshToken;
        await User.save();

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "statusError.INTERNAL_SERVER_ERROR");
    }
}
export {generate_Access_Refresh_Token}