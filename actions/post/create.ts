"use server";

import { createPostSchema } from "@/lib/validators/post";
import { getCurrentUser } from "@/server/db/user/get";
import prisma from "@/server/prisma";

export async function createPostAction(data: {
  title: string;
  content: string;
}) {
  const result = createPostSchema.safeParse(data);
  if (!result.success) return;

  const user = await getCurrentUser();
  if (!user) return;

  const resultData = result.data;

  return prisma.post.createPreview({
    data: {
      title: resultData.title,
      content: resultData.content,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}
