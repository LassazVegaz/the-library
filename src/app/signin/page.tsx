import PageTitle from "@/components/PageTitle";
import Form from "./components/Form";
import authService from "@/services/auth.service";
import { redirect, RedirectType } from "next/navigation";

export default async function SignIn() {
  const auth = await authService.getAuth();
  if (auth) redirect("/", RedirectType.replace);

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <PageTitle>Sign In</PageTitle>

      <div className="flex justify-center items-center">
        <Form />
      </div>
    </div>
  );
}
