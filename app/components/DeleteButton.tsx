"use client";

import { deleteUserAction } from "@/app/actions/user.action";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => deleteUserAction(id)}
      className="bg-red-600 text-white cursor-pointer px-4 py-2 mt-4"
    >
      Delete User
    </button>
  );
}