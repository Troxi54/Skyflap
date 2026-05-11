"use server";

import postsConfig from "@/lib/config/posts";
import type { PostPreviewBatch } from "@/lib/types/post";
import prisma from "@/server/prisma";

export async function loadPosts(
  cursor?: string | null,
): Promise<PostPreviewBatch> {
  const limit = postsConfig.limit;

  const where = cursor
    ? {
        publishedAt: {
          lt: new Date(cursor),
        },
      }
    : {};

  const batch = await prisma.post.findManyPreviews({
    where,
    take: limit + 1,
  });

  const hasMore = batch.length > limit;
  const data = batch.slice(0, limit);
  const nextCursor = hasMore
    ? batch[limit - 1]?.publishedAt.toISOString()
    : null;

  return {
    data,
    nextCursor,
  };
}
