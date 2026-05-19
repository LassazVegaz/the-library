import authService from "@/services/auth.service";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
  if (await authService.getAuth()) redirect("/books", RedirectType.replace);
  else redirect("/signin", RedirectType.replace);
}
