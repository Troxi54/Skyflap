import "server-only";
import prisma from "@/server/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserByClerkId(id: string) {
  return prisma.user.findUnique({
    where: {
      clerkId: id,
    },
  });
}

export async function getCurrentUser() {
  const session = await auth();

  const { userId } = session;
  if (!userId) return;

  return getUserByClerkId(userId);
}
