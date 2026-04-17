"use client";

import {
  createUserAction,
  updateUserAction,
} from "@/app/actions/user.action";

export default function CreateUserForm({ user }: any) {
  const action = user ? updateUserAction : createUserAction;

  return (
    <form action={action} className="space-y-3">
      {user && (
        <input type="hidden" name="id" value={user._id} />
      )}

      <input
        name="name"
        defaultValue={user?.name || ""}
        placeholder="Name"
        className="border p-2 w-full"
      />

      <input
        name="age"
        defaultValue={user?.age || ""}
        placeholder="Age"
        className="border p-2 w-full"
      />

      <input
        name="gender"
        defaultValue={user?.gender || ""}
        placeholder="Gender"
        className="border p-2 w-full"
      />

      <input
        name="address"
        defaultValue={user?.address || ""}
        placeholder="Address"
        className="border p-2 w-full"
      />

      <input
        name="company"
        defaultValue={user?.company || ""}
        placeholder="Company"
        className="border p-2 w-full"
      />

      <input
        name="profile"
        defaultValue={user?.profile || ""}
        placeholder="Profile"
        className="border p-2 w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2">
        {user ? "Update User" : "Create User"}
      </button>
    </form>
  );
}