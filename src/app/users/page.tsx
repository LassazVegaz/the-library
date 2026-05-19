import { LinkedListItem, ListContainer } from "@/components/List";
import PageTitle from "@/components/PageTitle";
import usersService from "@/services/users.service";

export default async function UsersPage() {
  const users = await usersService.getAll();

  return (
    <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
      <PageTitle>Users</PageTitle>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No users found</p>
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
