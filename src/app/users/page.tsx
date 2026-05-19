import { LinkedListItem, ListContainer } from "@/components/List";
import PageTitle from "@/components/PageTitle";
import authService from "@/services/auth.service";
import usersService from "@/services/users.service";
import { notFound } from "next/navigation";

export default async function UsersPage() {
  if (!(await authService.is("admin"))) notFound();

  const users = await usersService.getAll();

  return (
    <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
      <PageTitle>Users</PageTitle>

      {users.length === 0 && (
        <p className="text-center text-dimmed mt-10">No users found</p>
      )}

      <ListContainer className="mt-10 max-w-md w-full mx-auto">
        {users.map((user) => (
          <li key={user.id}>
            <LinkedListItem href={`users/${user.id}`}>
              {user.name}
            </LinkedListItem>
          </li>
        ))}
      </ListContainer>
    </div>
  );
}
