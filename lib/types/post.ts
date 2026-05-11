import z from "zod";
import type {
  postDisplaySchema,
  postPreviewSchema,
} from "@/server/schemas/post";

export type PostDisplay = z.infer<typeof postDisplaySchema>;

export type PostPreview = z.infer<typeof postPreviewSchema>;

export interface PostPreviewBatch {
  data: PostPreview[];
  nextCursor: string | null;
}
