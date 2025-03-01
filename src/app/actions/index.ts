'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function createSnippet(formState: {message: string}, formData: FormData) {
  // Check the user's inputs and make sure they're valid
  try{
  const title = formData.get('title');
  const code = formData.get('code');

  if(typeof title !== "string" || title.length < 3){
    return {message: "longer title neede"}
  }
  if(typeof code !== "string" || code.length < 10){
    return {message: "longer code neede"}
  }
  // Create a new record in the database
  await db.snippet.create({
    data: {
      title,
      code,
    },
  });
} catch (err: unknown) {
  if (err instanceof Error) {
    return {
      message: err.message,
    };
  } else {
    return {
      message: 'Something went wrong...',
    };
  }
}

  // Redirect the user back to the root route
  revalidatePath('/');
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  const snippet = await db.snippet.update({
    where: { id },
    data: { code },
  });
  console.log(snippet);
  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath('/');
  redirect('/');
}
