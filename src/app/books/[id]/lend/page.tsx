import { Button } from "@/components/FormComponents";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";
import SelectUserButton from "./components/SelectUserButton";

export default function LendBookPage() {
  const dialogId = "select-user-dialog";

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

      <dialog id={dialogId}>Hello World</dialog>
    </>
  );
}
