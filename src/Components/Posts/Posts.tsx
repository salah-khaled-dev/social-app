import React, { useState, useRef, useEffect } from "react";
import { PostType, formatDate } from "../../Types/Post.type";
import Comment from "../Comment/Comment";
import CreateComment from "../Comment/CreateComment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentType } from "../../Types/Comment";
import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { getCurrentUserId } from "../../utils/auth";
import UpdatePost from "./UpdatePost";

interface PostsProps {
  post: PostType;
  isPostDetails?: boolean;
}

export default function Posts({ post, isPostDetails }: PostsProps) {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    post.user?.name || "User",
  )}&background=7c3aed&color=fff`;

  const {
    body,
    image,
    user,
    likesCount,
    commentsCount,
    sharesCount,
    bookmarked,
    topComment,
    createdAt,
    _id,
  } = post;

  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          token: localStorage.getItem("userToken"),
        },
      },
    );
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["getPostComments", _id],
    queryFn: getPostComments,
    enabled: !!isPostDetails,
  });

  const comments: CommentType[] = (data?.data?.data?.comments ?? []).filter(
    (comment: CommentType) => comment._id !== topComment?._id,
  );
  const [showAllComments, setShowAllComments] = useState(false);
  const hasMoreComments = (commentsCount ?? 0) > 1;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ── Delete Post Function & Mutation ──
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem("userToken");
      return axios.delete(`https://route-posts.routemisr.com/posts/${_id}`, {
        headers: {
          token: token,
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
      queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getPostDetails", _id] });
      setMenuOpen(false);
      setConfirmDelete(false);
      if (isPostDetails) {
        navigate("/home");
      }
    },
    onError: (err: any) => {
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete post",
      );
    },
  });

  function handleDeletePost() {
    deletePost();
  }

  const currentUserId = getCurrentUserId();
  const postUserId =
    typeof post.user === "string"
      ? post.user
      : post.user?._id || (post.user as any)?.id || (post as any)?.userId;
  const isOwner = Boolean(
    currentUserId && postUserId && String(currentUserId) === String(postUserId),
  );

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <article
      className="border rounded-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--border-color)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div>
        {/* Post User Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={post.user?.photo || fallbackAvatar}
              alt={post.user?.name || "User"}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/20 shrink-0"
              style={{ backgroundColor: "var(--media-bg)" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
              }}
            />
            <div className="min-w-0">
              <h2
                className="font-bold text-sm sm:text-base truncate group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {post.user?.name || "Anonymous User"}
              </h2>
              <div
                className="flex items-center gap-2 text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="truncate">
                  @{post.user?.username || "user"}
                </span>
                {post.createdAt && (
                  <>
                    <span>•</span>
                    <span className="shrink-0">
                      {formatDate(post.createdAt)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Privacy badge */}
            {post.privacy && (
              <span
                className="text-[11px] px-2.5 py-0.5 rounded-full border capitalize shrink-0 font-medium"
                style={{
                  backgroundColor: "var(--surface-subtle)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
              >
                {post.privacy}
              </span>
            )}

            {/* Owner Actions Menu (Edit & Delete) */}
            {isOwner && (
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  title="Post options"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="p-1.5 rounded-xl border opacity-75 hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
                  style={{
                    backgroundColor: "var(--surface-subtle)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                  }}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 top-8 z-30 w-44 rounded-2xl backdrop-blur-xl border p-1.5 text-xs shadow-xl animate-in fade-in zoom-in-95 duration-150"
                    style={{
                      backgroundColor: "var(--popover-bg)",
                      borderColor: "var(--popover-border)",
                      boxShadow: "var(--shadow-dropdown)",
                    }}
                  >
                    {!confirmDelete ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            setIsEditOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-purple-500/10 hover:text-purple-400 transition-colors cursor-pointer font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Pencil className="w-4 h-4 text-purple-400" />
                          <span>Edit Post</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(true)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer font-medium"
                        >
                          <Trash2 className="w-4 h-4 text-rose-500" />
                          <span>Delete Post</span>
                        </button>
                      </>
                    ) : (
                      <div className="p-2 space-y-2">
                        <p
                          className="text-xs font-semibold text-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Delete this post?
                        </p>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => setConfirmDelete(false)}
                            className="flex-1 py-1.5 px-2 rounded-lg border text-[11px] font-medium hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50"
                            style={{
                              backgroundColor: "var(--surface-subtle)",
                              borderColor: "var(--border-color)",
                              color: "var(--text-muted)",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={handleDeletePost}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1 shadow-sm"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post Text Body */}
        {post.body && (
          <div className="px-4 sm:px-5 pb-3">
            <p
              className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-line"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.body}
            </p>
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="px-4 sm:px-5 pb-4">
            <div
              className="w-full overflow-hidden rounded-xl border flex justify-center"
              style={{
                backgroundColor: "var(--media-bg)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <img
                src={post.image}
                alt="Post media"
                className="w-full max-h-[420px] object-contain group-hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* Post Footer Actions */}
      <div
        className="p-3 px-4 sm:px-5 border-t flex items-center justify-between text-xs"
        style={{
          backgroundColor: "var(--surface-subtle)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        <div className="flex items-center gap-5">
          {/* Likes */}
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer group/btn"
          >
            <svg
              className="w-4 h-4 text-inherit group-hover/btn:text-rose-500 group-hover/btn:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="font-semibold">
              {post.likesCount ?? post.likes?.length ?? 0}
            </span>
          </button>

          {/* Comments */}
          <Link
            to={`/PostDetails/${_id}`}
            className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-indigo-400 transition-colors cursor-pointer group/btn"
          >
            <svg
              className="w-4 h-4 text-inherit group-hover/btn:text-purple-600 dark:group-hover/btn:text-indigo-400 group-hover/btn:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-semibold">{post.commentsCount ?? 0}</span>
          </Link>

          {/* Shares */}
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-pointer group/btn"
          >
            <svg
              className="w-4 h-4 text-inherit group-hover/btn:text-emerald-500 group-hover/btn:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span className="font-semibold">{post.sharesCount ?? 0}</span>
          </button>
        </div>

        {/* Bookmark */}
        <button
          type="button"
          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
          title="Bookmark"
        >
          <svg
            className="w-4 h-4 text-inherit"
            fill={post.bookmarked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* Add Comment (details page only) */}
      {isPostDetails && <CreateComment postId={_id} />}

      {/* Comments Section - Clean, light background in light mode, no dark grey mud */}
      {topComment && (
        <div
          className="p-3 px-4 sm:px-5 border-t"
          style={{
            backgroundColor: "var(--comment-section-bg)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              {showAllComments ? "All Comments" : "Top Comment"}
            </span>

            {hasMoreComments &&
              (isPostDetails ? (
                <button
                  id={`toggle-comments-${_id}`}
                  type="button"
                  onClick={() => setShowAllComments((s) => !s)}
                  className="text-[11px] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ color: "var(--brand-primary)" }}
                >
                  {showAllComments
                    ? "Hide comments \u2191"
                    : `View all ${commentsCount} comments \u2193`}
                </button>
              ) : (
                <Link
                  id={`view-comments-${_id}`}
                  to={`/PostDetails/${_id}`}
                  className="text-[11px] font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: "var(--brand-primary)" }}
                >
                  View all {commentsCount} comments &rarr;
                </Link>
              ))}
          </div>

          <div className="flex flex-col gap-3">
            <Comment Comment={topComment} postId={_id} />

            {isPostDetails && showAllComments && (
              <>
                {isLoading &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3 animate-pulse">
                      <div
                        className="w-8 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--border-color)" }}
                      />
                      <div
                        className="flex-1 h-14 rounded-2xl"
                        style={{ backgroundColor: "var(--comment-bubble-bg)" }}
                      />
                    </div>
                  ))}

                {isError && (
                  <p className="text-[11px] text-rose-500">{(error as any)?.message}</p>
                )}

                {comments.map((comment) => (
                  <Comment key={comment._id} Comment={comment} postId={_id} />
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Update Post Modal */}
      <UpdatePost
        post={post}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </article>
  );
}
