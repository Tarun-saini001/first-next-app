import connectDB from "@/app/lib/db";
import {
    getUserById,
    updateUser,
    deleteUser       
} from "@/app/services/user.service"
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
    await connectDB();
    const { id } = await params;
    const user = await getUserById(id);
    return NextResponse.json({ message: "User Fetched Successfully", data: user })
}

export async function PUT(req: Request, { params }: any) {
    await connectDB();
    const body = await req.json();
      const { id } = await params;
    const user = await updateUser(id, body);
    return NextResponse.json({ message: "User Updated Successfully", data: user });
}

export async function DELETE(_: Request, { params }: any) {
    await connectDB();
      const { id } = await params;
    await deleteUser(id);
    return NextResponse.json({ message: "User Deleted Successfully" })
}