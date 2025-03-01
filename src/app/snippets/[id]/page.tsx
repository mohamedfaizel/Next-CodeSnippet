import Link from 'next/link';
import { notFound } from "next/navigation";
import { db } from "@/db";
import DeleteButton from './components/DeleteButton';

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));

  const { id } = await props.params;
  const parseId = parseInt(id)
  const snippet = await db.snippet.findFirst({
    where: { id:  parseId},
  });

  if (!snippet) {
    return notFound();
  }
 
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          {/* <form action={deleteActionHandler}>
          <button className="p-2 border rounded">Delete</button>
          </form> */}
          <DeleteButton deleteId={parseId} >Delete</DeleteButton>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
export const revalidate = 3;
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}