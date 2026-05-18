import PageTitle from "@/components/PageTitle";
import Form from "./components/Form";

export default async function BookPage(
  props: Readonly<PageProps<"/books/[id]">>,
) {
  const { id } = await props.params;

  const isNew = id.toLowerCase() === "new";

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <PageTitle>{isNew ? "Create a New Book" : "Update Book"}</PageTitle>

      <div className="flex justify-center items-center">
        <Form isNew={isNew} />
      </div>
    </div>
  );
}
