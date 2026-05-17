import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const FieldsContainer = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("flex items-center", className)} {...props} />
);

const Label = ({ className, ...props }: ComponentProps<"label">) => (
  <label className={twMerge("w-37.5", className)} {...props} /> // NOSONAR
);

const InputField = ({ className, ...props }: ComponentProps<"input">) => (
  <input className={twMerge("border p-2 rounded", className)} {...props} />
);

export default function BookPage() {
  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <h1 className="text-center text-2xl font-bold">Create a New Book</h1>

      <div className="flex justify-center items-center">
        <form className="border p-4 rounded">
          <FieldsContainer>
            <Label htmlFor="title">Title</Label>
            <InputField type="text" name="title" />
          </FieldsContainer>

          <div className="flex justify-center mt-10">
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
