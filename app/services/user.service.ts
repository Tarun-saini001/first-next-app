import {User} from "@/app/lib/models/user";


export async function getUsers() {
  return User.find();
}

export async function getUserById(id: string) {
  console.log('id: ', id);
  return User.findById(id);
}

export async function createUser(data: any) {
  return User.create(data);
}

export async function updateUser(id: string, data: any) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}