import connectDB from "@/app/lib/db";
import { getUsers, createUser } from "@/app/services/user.service";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const users = await getUsers();
    return NextResponse.json({ message: "Users Fetched Successfully", data: users })
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const user = await createUser(body);
    return NextResponse.json({ message: "User Created Successfully", data: user })
}