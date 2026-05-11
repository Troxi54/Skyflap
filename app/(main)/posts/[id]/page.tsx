import { loadPostDisplay } from "@/actions/post/loadDisplay";
import PostDisplay from "./_components/PostDisplay";
import Button from "@/lib/components/Button";
import GoBackArrow from "@/lib/components/icons/GoBackArrow";
import Link from "next/link";

async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postDisplay = await loadPostDisplay(id);

  return (
    <div className="flex flex-col relative max-w-full gap-2">
      <div className="lg:absolute lg:-left-2 lg:-translate-x-full">
        <Link href="/">
          <Button className="text-xl p-2 rounded-full">
            <GoBackArrow />
          </Button>
        </Link>
      </div>
      <PostDisplay post={postDisplay} />
    </div>
  );
}

export default PostPage;
