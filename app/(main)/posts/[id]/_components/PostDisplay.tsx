import PostContent from "@/lib/components/PostContent";
import type { PostDisplay as PostDisplayType } from "@/lib/types/post";

type Props = {
  post: PostDisplayType;
};

function PostDisplay({ post }: Props) {
  return <PostContent post={post} content={post.content} />;
}

export default PostDisplay;
