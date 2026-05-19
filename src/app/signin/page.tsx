import PageTitle from "@/components/PageTitle";
import Form from "./components/Form";

export default function SignIn() {
  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <PageTitle>Sign In</PageTitle>

      <div className="flex justify-center items-center">
        <Form />
      </div>
    </div>
  );
}
