import Avatar from "@/lib/components/Avatar";
import type { PostDisplay, PostPreview } from "@/lib/types/post";
import { timeAgo } from "@/lib/utils/time";

type Props = {
  post: PostPreview | PostDisplay;
  content: string;
};

function PostContent({ post, content }: Props) {
  const { username, avatarUrl } = post.author;

  return (
    <article className="flex flex-col w-200 max-w-full items-start text-start border border-border p-8 shadow-card rounded-xl gap-2">
      <div className="flex items-center gap-2">
        {avatarUrl && <Avatar username={username} src={avatarUrl} />}
        <p>@{username}</p>
        <p className="text-muted">{timeAgo.format(post.publishedAt, "mini")}</p>
      </div>
      <h2 className="text-xl font-bold">{post.title}</h2>
      {content && <p className="text-[0.95rem]">{content}</p>}
    </article>
  );
}

export default PostContent;
