"use client";

import { createPostAction } from "@/actions/post/create";
import { createPostSchema } from "@/lib/validators/post";
import { type SubmitEvent, useEffect, useRef, useState } from "react";
import Container from "@/lib/components/Container";
import Button from "@/lib/components/Button";
import Textarea from "@/lib/components/Textarea";
import { type PostPreviewBatch } from "@/lib/types/post";
import useIntersection from "@/lib/hooks/useIntersection";
import { loadPosts } from "../_lib/loadPosts";
import Input from "@/lib/components/Input";
import PostPreview from "./PostPreview";
import postsConfig from "@/lib/config/posts";
import ProtectedAction from "@/lib/components/ProtectedAction";
import { useClerk } from "@clerk/nextjs";

function PostForm() {
  const [postBatch, setPostBatch] = useState<PostPreviewBatch>({
    data: [],
    nextCursor: null,
  });
  const [pending, setPending] = useState(false);
  const loadingMore = useRef(false);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const { isSignedIn } = useClerk();

  const containerRef = useRef<HTMLDivElement>(null);

  async function loadMore() {
    if (loadingMore.current) return;
    loadingMore.current = true;

    const batch = await loadPosts(postBatch.nextCursor);

    setLoadedOnce(true);

    loadingMore.current = false;

    setPostBatch((prev) => ({
      data: [...prev.data, ...batch.data],
      nextCursor: batch.nextCursor,
    }));
  }

  useEffect(() => {
    loadMore();
  }, []);

  useIntersection(containerRef, () => {
    if (!postBatch.nextCursor) return;
    loadMore();
  });

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSignedIn || pending) return;

    const formData = new FormData(event.currentTarget);

    const result = createPostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    if (!result.success) {
      return;
    }

    setPending(true);

    const response = await createPostAction(result.data);

    if (response) {
      setPostBatch((prev) => ({
        ...prev,
        data: [response, ...prev.data],
      }));
    }

    setPending(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center"
      >
        <Input
          name="title"
          placeholder="Title"
          maxLength={postsConfig.maxTitleLength}
        />
        <Textarea
          name="content"
          placeholder="Content"
          maxLength={postsConfig.maxContentLength}
        />
        <Container>
          <ProtectedAction>
            <Button disabled={pending} variant="primary" className="self-start">
              {pending ? "Posting..." : "Post"}
            </Button>
          </ProtectedAction>
        </Container>
      </form>
      <Container
        ref={containerRef}
        className="flex-col gap-4 max-w-full items-center"
      >
        {postBatch.data.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
        {!loadedOnce ? (
          <p className="text-center">Loading...</p>
        ) : (
          !postBatch.nextCursor &&
          (postBatch.data.length === 0 ? (
            <p className="text-center">No posts found</p>
          ) : (
            <p className="text-center">No more posts found</p>
          ))
        )}
      </Container>
    </>
  );
}

export default PostForm;
