import * as z from "zod";

export const serverErrorResponse = { serverError: true } as const;

export const buildZodErrorResponse = <T>(error: z.ZodError<T>) => {
  return {
    formErrors: z.flattenError(error).fieldErrors,
  };
};
