import "server-only";

import postsConfig from "@/lib/config/posts";
import { Prisma } from "@/server/generated/prisma/client";
import type {
  PostCreateArgs,
  PostFindManyArgs,
  PostFindUniqueArgs,
} from "@/server/generated/prisma/models";
import prisma from "@/server/prisma";
import { postDisplaySchema, postPreviewSchema } from "@/server/schemas/post";

const postExtension = Prisma.defineExtension({
  model: {
    post: {
      async findManyPreviews(args?: PostFindManyArgs) {
        const data = await prisma.post.findMany({
          take: postsConfig.limit,
          orderBy: [
            {
              publishedAt: "desc",
            },
            {
              id: "desc",
            },
          ],
          omit: {
            authorId: true,
          },
          include: {
            author: {
              select: {
                username: true,
                avatarUrl: true,
              },
            },
          },
          ...args,
        });

        return data.map((post) => postPreviewSchema.parse(post));
      },
      async createPreview(args: PostCreateArgs) {
        const data = await prisma.post.create({
          omit: {
            authorId: true,
          },
          include: {
            author: {
              select: {
                username: true,
                avatarUrl: true,
              },
            },
          },
          ...args,
        });

        return postPreviewSchema.parse(data);
      },
      async findUniqueDisplay(args: PostFindUniqueArgs) {
        const data = await prisma.post.findUnique({
          omit: {
            authorId: true,
          },
          include: {
            author: {
              select: {
                username: true,
                avatarUrl: true,
              },
            },
          },
          ...args,
        });

        return postDisplaySchema.parse(data);
      },
    },
  },
});

export default postExtension;
