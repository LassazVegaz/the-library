"use server";
import authService from "@/services/auth.service";
import { redirect, unauthorized } from "next/navigation";

export const signoutAction = async () => {
  if (!(await authService.getAuth())) unauthorized();

  await authService.signOut();

  redirect("/");
};
