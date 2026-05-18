import PageTitle from "@/components/PageTitle";
import usersService from "@/services/users.service";
import Link from "next/link";

export default async function UsersPage() {
  const users = await usersService.getAll();

  return (
    <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
      <PageTitle>Users</PageTitle>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No users found</p>
      )}

      <ul className="mt-10 max-w-md w-full mx-auto flex flex-col gap-4 overflow-y-auto px-5 styled-scrollbar">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`users/${user.id}`}
              className="block border border-gray-300 rounded-md p-2 hover:bg-gray-100 hover:text-black duration-500 cursor-pointer"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
