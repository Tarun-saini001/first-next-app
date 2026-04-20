import connectDB from "@/app/lib/db";
import { User } from "@/app/lib/models/user";
import { RefreshToken } from "@/app/lib/models/refreshToken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/lib/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

   
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

   
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const res = NextResponse.json({
      message: "Login successful",
    },{status:200});

    
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60,
      path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;

  } catch (error) {
    console.log("Login error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}