import mongoose, { Schema, model , models } from "mongoose";
import { IUser } from "@/interface/IUser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "provide an email!"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    guestAdmin :{
      type: Boolean,
      default: false,

    } , 
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenEXpiry: Date,
    refreshToken: String,
    refreshTokenEXpiry: Date,
  },
  { timestamps: true }
);
//  comparing passwords
userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

// generating access token
userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.TOKEN_SECRET! as string,
    {
      expiresIn: "12h",
    }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET! as string,
    {
      expiresIn: "20d",
    }
  );
};
const UserModel = models.user || model<IUser>("user", userSchema);
export default UserModel;
