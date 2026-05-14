import prisma from "@/server/prisma";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

  const headerPayload = request.headers;
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      {
        error: "Missing svix headers",
      },
      { status: 400 },
    );
  }

  const body = await request.text();

  const webhook = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid signature",
      },
      { status: 400 },
    );
  }

  if (event.type === "user.created") {
    const {
      id,
      username,
      email_addresses,
      primary_email_address_id,
      image_url,
    } = event.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id,
    );

    await prisma.user.create({
      data: {
        clerkId: id,
        username: username ?? `${id}`,
        email:
          primaryEmail?.email_address ??
          email_addresses?.[0]?.email_address ??
          `test_${id}@test.com`,
        avatarUrl: image_url,
      },
    });
  } else if (event.type === "user.updated") {
    const { id, username, image_url } = event.data;

    await prisma.user.update({
      where: {
        clerkId: id,
      },
      data: {
        ...(username && { username }),
        avatarUrl: image_url,
      },
    });
  } else if (event.type === "user.deleted") {
    const { id } = event.data;

    await prisma.user.delete({
      where: {
        clerkId: id,
      },
    });
  }

  return NextResponse.json(null, {
    status: 204,
  });
}
