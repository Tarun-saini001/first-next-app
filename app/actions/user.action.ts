"use server";

import connectDB from "../lib/db";
import { User } from "@/app/lib/models/user"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUserAction(formData: FormData) {
    await connectDB();

    const data = {
        name: formData.get("name"),
        age: Number(formData.get("age")),
        gender: formData.get("gender"),
        address: formData.get("address"),
        company: formData.get("company"),
        profile:formData.get("profile")
    }

    await User.create(data)
    revalidatePath("/");
    redirect("/ ")
}