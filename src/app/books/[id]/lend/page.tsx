import { Button } from "@/components/FormComponents";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";
import SelectUserButton from "./components/SelectUserButton";
import { ListContainer, ListItem } from "@/components/List";
import authService from "@/services/auth.service";
import { notFound } from "next/navigation";
import usersService from "@/services/users.service";

export default async function LendBookPage() {
  if (!authService.is("admin")) notFound();

  const dialogId = "select-user-dialog";

  const users = await usersService.getAll();

  return (
    <>
      <div className="py-page-gutter grid grid-cols-2 grid-rows-[auto_1fr_auto] h-full gap-y-10">
        <PageTitle className="col-[span_2]">Lend Book</PageTitle>

        <div className="px-10 border-r border-amber-100">
          <SubTitle>Book information</SubTitle>

          <div className="mt-10">Title: Harry Porter 1</div>
        </div>

        <div className="px-10 grid grid-rows-[auto_1fr_auto]">
          <SubTitle>User information</SubTitle>

          <div className="mt-10">
            <div>Name: John Done</div>
            <div>Email: johndoen@john.com</div>
          </div>

          <div className="flex justify-center">
            <SelectUserButton dialogId={dialogId} />
          </div>
        </div>

        <div className="col-[span_2] flex justify-center">
          <Button variant="blue">Lend</Button>
        </div>
      </div>

      <dialog
        id={dialogId}
        className="bg-gray-800 p-page-gutter rounded-xl grid-rows-[auto_1fr] gap-10"
      >
        <SubTitle>Select a User</SubTitle>

        {users.length === 0 && (
          <p className="text-dimmed w-100 text-center">No users found</p>
        )}

        <ListContainer>
          {users.map((u) => (
            <ListItem key={u.id} className="w-100">
              {u.name}
            </ListItem>
          ))}
        </ListContainer>
      </dialog>
    </>
  );
}
