"use server";

import prisma from "@/server/prisma";

export async function loadPostDisplay(id: string) {
  return prisma.post.findUniqueDisplay({
    where: {
      id,
    },
  });
}
