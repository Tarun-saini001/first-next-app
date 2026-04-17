import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUserPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Create User
      </h1>

      <CreateUserForm />
    </div>
  );
}