import PageTitle from "@/components/PageTitle";
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

export default async function BookPage(
  props: Readonly<PageProps<"/books/[id]">>,
) {
  const { id } = await props.params;

  const isNew = id.toLowerCase() === "new";

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <PageTitle>{isNew ? "Create a New Book" : "Update Book"}</PageTitle>

      <div className="flex justify-center items-center">
        <form className="border p-4 rounded">
          <FieldsContainer>
            <Label htmlFor="title">Title</Label>
            <InputField type="text" name="title" />
          </FieldsContainer>

          <div className="flex justify-center mt-10">
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
              {isNew ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
