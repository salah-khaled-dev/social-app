import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Post from "./Posts";

export default function PostDetails() {
  const { id } = useParams();

  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        token: localStorage.getItem("userToken"),
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPostDetails", id],
    queryFn: getPostDetails,
  });

  const post = data?.data?.data?.post;

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors mb-5 hover:opacity-100 opacity-80"
          style={{ color: "var(--brand-primary)" }}
        >
          &larr; Back to feed
        </Link>

        {isLoading && (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="w-14 h-14 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {isError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-sm">
            {(error as any)?.message}
          </div>
        )}

        {post && <Post post={post} isPostDetails />}
      </div>
    </section>
  );
}
