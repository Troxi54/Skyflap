import postsConfig from "@/lib/config/posts";
import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(postsConfig.minTitleLength)
    .max(postsConfig.maxTitleLength),
  content: z
    .string()
    .trim()
    .min(postsConfig.minContentLength)
    .max(postsConfig.maxContentLength),
});
