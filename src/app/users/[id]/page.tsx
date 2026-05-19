import PageTitle from "@/components/PageTitle";
import usersService from "@/services/users.service";
import { SafeUser } from "@/types/user.type";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import authService from "@/services/auth.service";

export default async function UserPage(
  props: Readonly<PageProps<"/users/[id]">>,
) {
  const { id } = await props.params;

  const isNew = id.toLowerCase() === "new";

  const auth = await authService.getAuth();

  let user: SafeUser | null = null;

  if (isNew && auth) notFound();
  else if (auth) {
    const userId = Number(id);
    if (Number.isNaN(userId) || (auth.role === "user" && auth.id !== userId))
      notFound();
    user = await usersService.findById(userId);
    if (!user) notFound();
  }

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <PageTitle>
        {isNew ? "Create a Library Account" : "Update User"}
      </PageTitle>

      <div className="flex justify-center items-center">
        <Form isNew={isNew} user={user} />
      </div>
    </div>
  );
}
