import "server-only";

import postsConfig from "@/lib/config/posts";
import z from "zod";

export const postDisplaySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.date(),
  author: z.object({
    username: z.string(),
    avatarUrl: z.string(),
  }),
});

export const postPreviewSchema = postDisplaySchema.transform((data) => {
  const { content, ...rest } = data;

  return {
    ...rest,
    excerpt:
      content.substring(0, postsConfig.maxPreviewContentLength) +
      (content.length > postsConfig.maxPreviewContentLength ? "..." : ""),
  };
});
