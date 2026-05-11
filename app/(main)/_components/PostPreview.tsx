"use client";

import { type PostPreview as PostPreviewType } from "@/lib/types/post";
import Link from "next/link";
import PostContent from "../../../lib/components/PostContent";
import Button from "@/lib/components/Button";

function PostPreview({ post }: { post: PostPreviewType }) {
  return (
    <Link href={`posts/${post.id}`} className="max-w-full">
      <Button className="p-0 max-w-full border-none text-foreground">
        <PostContent post={post} content={post.excerpt} />
      </Button>
    </Link>
  );
}

export default PostPreview;
