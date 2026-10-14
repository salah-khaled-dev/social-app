import axios from "axios";
import React from "react";
import { PostType } from "../Types/Post.type";
import Posts from "../Components/Posts/Posts";
import Loading from "../Components/Loading/Loading";
import CreatePost from "../Components/Posts/CreatePost";
import { Helmet } from "react-helmet-async";
import usePost from "../Hooks/usePost";
export default function Home() {


  
  const { data, isLoading, isError, error, isFetching, refetch } = usePost();
  const posts: PostType[] = data?.data?.data?.posts || [];

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Helmet>
      <CreatePost />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* ── Page Header ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 border"
              style={{
                backgroundColor: "var(--accent-purple-bg)",
                borderColor: "var(--accent-purple-border)",
                color: "var(--accent-purple-text)",
              }}
            >
              <span>✨</span> Community Feed
            </div>
            <h1
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Latest Posts
            </h1>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Explore thoughts, photos, and updates from the community
            </p>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer disabled:opacity-50 hover:opacity-90 shadow-sm"
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <svg
              className={`w-4 h-4 ${isLoading || isFetching ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh</span>
          </button>
        </div>

        {/* ── Error State ── */}
        {isError && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-sm flex items-center justify-between">
            <span>
              {(error as any)?.response?.data?.message ||
                error?.message ||
                "Failed to load posts"}
            </span>
            <button
              onClick={() => refetch()}
              className="underline font-semibold hover:opacity-80 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Loading State ── */}
        {isLoading ? (
          <Loading text="Loading posts..." />
        ) : posts.length > 0 ? (
          /* ── Posts Grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post: PostType) => (
              <Posts key={post._id || post.id} post={post} />
            ))}
          </div>
        ) : (
          /* ── Empty State ── */
          <div
            className="text-center py-16 border rounded-3xl p-8"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 text-2xl">
              📝
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              No posts found
            </h3>
            <p
              className="text-xs sm:text-sm max-w-sm mx-auto mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Be the first one to share an update or refresh to see new posts.
            </p>
            <button
              onClick={() => refetch()}
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-95 transition-all cursor-pointer shadow-md shadow-purple-500/20"
            >
              Check again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
