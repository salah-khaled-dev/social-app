import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MAX_COMMENT_LENGTH,
  UpdateCommentSchema,
  type UpdateCommentSchemaType,
} from "../../Schemas/comment.schema";
import type { CommentType } from "../../Types/Comment";
import { formatDate } from "../../Types/Post.type";
import { getCurrentUserId } from "../../utils/auth";

const BASE_URL = "https://route-posts.routemisr.com";

function authHeaders() {
  const token = localStorage.getItem("userToken");
  return { Authorization: `Bearer ${token}`, token };
}

interface CommentProps {
  Comment?: CommentType | null;
  postId?: string;
}

export default function Comment({ Comment, postId }: CommentProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateCommentSchemaType>({
    defaultValues: { content: Comment?.content ?? "" },
    resolver: zodResolver(UpdateCommentSchema),
    mode: "onChange",
  });

  // close the menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  function refreshQueries() {
    queryClient.invalidateQueries({ queryKey: ["getPostComments", postId] });
    queryClient.invalidateQueries({ queryKey: ["getPostDetails", postId] });
    queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
  }

  // ---------- Update ----------
  const updateMutation = useMutation({
    mutationFn: (values: UpdateCommentSchemaType) => {
      const formData = new FormData();
      formData.append("content", values.content);
      return axios.put(
        `${BASE_URL}/posts/${postId}/comments/${Comment?._id}`,
        formData,
        { headers: authHeaders() },
      );
    },
    onSuccess: (_res, values) => {
      setIsEditing(false);
      reset({ content: values.content });
      refreshQueries();
    },
  });

  // ---------- Delete ----------
  const deleteMutation = useMutation({
    mutationFn: () =>
      axios.delete(`${BASE_URL}/posts/${postId}/comments/${Comment?._id}`, {
        headers: authHeaders(),
      }),
    onSuccess: () => {
      setMenuOpen(false);
      refreshQueries();
    },
  });

  if (!Comment) return null;

  const creator = Comment.commentCreator || Comment.user;
  const isOwner = !!postId && !!creator?._id && creator._id === getCurrentUserId();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creator?.name || "User",
  )}&background=7c3aed&color=fff`;

  const content = watch("content") ?? "";
  const mutationError = (updateMutation.error || deleteMutation.error) as
    | AxiosError<{ message?: string }>
    | null;
  const apiMessage =
    mutationError?.response?.data?.message || mutationError?.message;

  function cancelEdit() {
    reset({ content: Comment?.content ?? "" });
    updateMutation.reset();
    setIsEditing(false);
  }

  const onSubmit = handleSubmit((values) => updateMutation.mutate(values));

  return (
    <div
      className={`flex items-start gap-3 transition-opacity ${
        deleteMutation.isPending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <img
        src={creator?.photo || fallbackAvatar}
        alt={creator?.name || "User"}
        className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-500/20 shrink-0 mt-0.5"
        style={{ backgroundColor: "var(--media-bg)" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
        }}
      />
      <div className="min-w-0 flex-1">
        <div
          className="group/comment transition-colors rounded-2xl rounded-tl-xs px-3.5 py-2.5 border"
          style={{
            backgroundColor: "var(--comment-bubble-bg)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4
              className="font-semibold text-xs sm:text-sm truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {creator?.name || "Anonymous User"}
            </h4>
            <div className="flex items-center gap-1 shrink-0">
              {Comment.createdAt && (
                <span
                  className="text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(Comment.createdAt)}
                </span>
              )}

              {/* Owner actions menu */}
              {isOwner && !isEditing && (
                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    title="Comment options"
                    onClick={() => {
                      setMenuOpen((o) => !o);
                      setConfirmDelete(false);
                    }}
                    className="p-1 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {menuOpen && (
                    <div
                      className="absolute right-0 top-7 z-20 w-40 rounded-xl backdrop-blur-xl border p-1 text-xs"
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
                              setIsEditing(true);
                              setMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            style={{ color: "var(--text-primary)" }}
                          >
                            <Pencil className="w-3.5 h-3.5 text-purple-500" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(true)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </>
                      ) : (
                        <div className="p-2">
                          <p
                            className="mb-2 text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Delete this comment?
                          </p>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(false)}
                              className="flex-1 px-2 py-1.5 rounded-lg border hover:opacity-80 transition-opacity cursor-pointer text-[11px]"
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
                              disabled={deleteMutation.isPending}
                              onClick={() => deleteMutation.mutate()}
                              className="flex-1 px-2 py-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer disabled:opacity-60 text-[11px] font-bold"
                            >
                              {deleteMutation.isPending ? "..." : "Delete"}
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

          {creator?.username && (
            <p
              className="text-[11px] -mt-0.5 mb-1.5 truncate"
              style={{ color: "var(--text-muted)" }}
            >
              @{creator.username}
            </p>
          )}

          {/* Edit mode */}
          {isEditing ? (
            <form onSubmit={onSubmit} className="mt-1">
              <textarea
                {...register("content")}
                autoFocus
                rows={2}
                disabled={updateMutation.isPending}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit();
                  }
                  if (e.key === "Escape") cancelEdit();
                }}
                className="w-full resize-none rounded-xl border px-3 py-2 text-xs sm:text-[13px] outline-none transition-colors disabled:opacity-60"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.content ? "rgba(239, 68, 68, 0.5)" : "var(--input-border)",
                  color: "var(--input-text)",
                }}
              />
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-[11px] text-rose-500 truncate">
                  {errors.content?.message ||
                    (updateMutation.isError && apiMessage)}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {content.length}/{MAX_COMMENT_LENGTH}
                  </span>
                  <button
                    type="button"
                    title="Cancel (Esc)"
                    onClick={cancelEdit}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="submit"
                    title="Save (Enter)"
                    disabled={
                      !isValid || !isDirty || updateMutation.isPending
                    }
                    className="p-1.5 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 transition-transform enabled:cursor-pointer disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {updateMutation.isPending ? (
                      <span className="block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            Comment.content && (
              <p
                className="text-xs sm:text-[13px] leading-relaxed wrap-break-word whitespace-pre-line"
                style={{ color: "var(--text-secondary)" }}
              >
                {Comment.content}
              </p>
            )
          )}

          {Comment.image && (
            <img
              src={Comment.image}
              alt="Comment attachment"
              loading="lazy"
              className="mt-2 max-h-60 rounded-xl border object-contain"
              style={{
                backgroundColor: "var(--media-bg)",
                borderColor: "var(--border-subtle)",
              }}
            />
          )}

          {deleteMutation.isError && (
            <p className="text-[11px] text-rose-500 mt-1">{apiMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
