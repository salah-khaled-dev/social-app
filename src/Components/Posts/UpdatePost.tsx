import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ImagePlus,
  Smile,
  Loader2,
  Sparkles,
  AlertCircle,
  Save,
  RotateCcw,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { PostType } from "../../Types/Post.type";
import {
  ACCEPTED_POST_IMAGE_TYPES,
  UpdatePostSchema,
  type UpdatePostSchemaType,
} from "../../Schemas/post.schema";

const POPULAR_EMOJIS = ["✨", "🔥", "❤️", "🚀", "💡", "😊", "🎉", "👏", "🙌", "💯"];

interface UpdatePostProps {
  post: PostType;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePost({ post, isOpen, onClose }: UpdatePostProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    post.user?.name || "User",
  )}&background=7c3aed&color=fff&size=80`;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdatePostSchemaType>({
    defaultValues: {
      body: post.body || "",
      image: null,
    },
    resolver: zodResolver(UpdatePostSchema),
    mode: "onChange",
  });

  const bodyValue = watch("body") ?? "";
  const imageValue = watch("image");

  // Re-sync form whenever modal opens or post changes
  useEffect(() => {
    if (isOpen) {
      reset({
        body: post.body || "",
        image: null,
      });
      setNewImagePreview(null);
      setShowEmojiPicker(false);
    }
  }, [isOpen, post, reset]);

  // Handle preview for new chosen image
  useEffect(() => {
    if (!imageValue) {
      setNewImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageValue);
    setNewImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageValue]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setValue("image", file, { shouldValidate: true, shouldDirty: true });
    e.target.value = "";
  }

  function handleRemoveNewImage() {
    setValue("image", null, { shouldValidate: true, shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleInsertEmoji(emoji: string) {
    const current = getValues("body") || "";
    setValue("body", current + emoji, { shouldValidate: true, shouldDirty: true });
    textareaRef.current?.focus();
  }

  // ── TanStack Query Mutation ──
  const {
    mutate: updatePost,
    isPending,
    isError,
    error,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (values: UpdatePostSchemaType) => {
      const token = localStorage.getItem("userToken");
      const formData = new FormData();

      // Send the body text
      formData.append("body", values.body?.trim() || " ");

      // If user uploaded a new image, attach it
      if (values.image) {
        formData.append("image", values.image);
      }

      return axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        formData,
        {
          headers: {
            token: token,
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
      queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getPostDetails", post._id] });
      resetMutation();
      onClose();
    },
  });

  const onSubmit = handleSubmit((data) => {
    updatePost(data);
  });

  if (!isOpen) return null;

  const axiosErr = error as AxiosError<{ message?: string }> | null;
  const errorMessage =
    axiosErr?.response?.data?.message ||
    axiosErr?.message ||
    "Failed to update post";

  const hasChanges = isDirty || !!newImagePreview;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      style={{ backgroundColor: "var(--modal-overlay)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border overflow-hidden transition-all duration-300 shadow-2xl animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: "var(--surface-card)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-dropdown)",
        }}
      >
        {/* ── Modal Header ── */}
        <div
          className="p-4 sm:p-5 border-b flex items-center justify-between"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--surface-subtle)",
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={post.user?.photo || fallbackAvatar}
              alt={post.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
              }}
            />
            <div>
              <h3
                className="font-bold text-base flex items-center gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                <span>Edit Post</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full border font-normal"
                  style={{
                    backgroundColor: "var(--accent-purple-bg)",
                    borderColor: "var(--accent-purple-border)",
                    color: "var(--accent-purple-text)",
                  }}
                >
                  Update
                </span>
              </h3>
              <p
                className="text-xs mt-0.5 truncate max-w-[240px] sm:max-w-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {post.user?.name} (@{post.user?.username || "user"})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="p-2 rounded-xl border hover:opacity-80 transition-all cursor-pointer disabled:opacity-50"
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Modal Body / Form ── */}
        <form onSubmit={onSubmit}>
          <div className="p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Textarea */}
            <div className="relative">
              <textarea
                {...register("body")}
                ref={(e) => {
                  register("body").ref(e);
                  (textareaRef as any).current = e;
                }}
                rows={4}
                disabled={isPending}
                placeholder="What would you like to edit?"
                className="w-full resize-none rounded-xl border p-3.5 text-sm sm:text-base outline-none transition-colors focus:ring-2 focus:ring-purple-500/30"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: errors.body
                    ? "rgba(239, 68, 68, 0.5)"
                    : "var(--input-border)",
                  color: "var(--input-text)",
                }}
              />
              <div className="flex items-center justify-between text-xs mt-1.5 px-1">
                <span
                  style={{ color: "var(--text-muted)" }}
                >
                  {bodyValue.length} characters
                </span>
                {errors.body && (
                  <span className="text-rose-500 font-medium">
                    {errors.body.message}
                  </span>
                )}
              </div>
            </div>

            {/* Emoji Quick Bar */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
                  style={{
                    backgroundColor: "var(--surface-subtle)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Smile className="w-4 h-4 text-amber-400" />
                  <span>Emoji</span>
                </button>

                <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
                  {POPULAR_EMOJIS.slice(0, 6).map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleInsertEmoji(emoji)}
                      className="p-1 rounded-md hover:scale-125 transition-transform text-sm cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extended Emoji Picker Popup */}
              {showEmojiPicker && (
                <div
                  className="mt-2 p-3 rounded-xl border grid grid-cols-5 sm:grid-cols-10 gap-2 text-xl"
                  style={{
                    backgroundColor: "var(--popover-bg)",
                    borderColor: "var(--popover-border)",
                    boxShadow: "var(--shadow-dropdown)",
                  }}
                >
                  {POPULAR_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        handleInsertEmoji(emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="p-2 hover:bg-purple-500/10 rounded-lg hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image Preview & Replacement Section */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_POST_IMAGE_TYPES.join(",")}
                onChange={handleImageChange}
                className="hidden"
                disabled={isPending}
              />

              {newImagePreview ? (
                /* New Image Uploaded Preview */
                <div
                  className="relative rounded-xl border p-2 overflow-hidden"
                  style={{
                    backgroundColor: "var(--media-bg)",
                    borderColor: "var(--brand-primary)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span
                      className="text-xs font-semibold flex items-center gap-1.5"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      <Sparkles className="w-3.5 h-3.5" /> New image ready to update
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveNewImage}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Discard new image
                    </button>
                  </div>
                  <img
                    src={newImagePreview}
                    alt="New preview"
                    className="w-full max-h-56 object-contain rounded-lg"
                  />
                </div>
              ) : post.image ? (
                /* Existing Post Image */
                <div
                  className="relative rounded-xl border p-2 overflow-hidden"
                  style={{
                    backgroundColor: "var(--media-bg)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Current image attached
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer"
                      style={{
                        backgroundColor: "var(--surface-subtle)",
                        borderColor: "var(--border-color)",
                        color: "var(--brand-primary)",
                      }}
                    >
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>Change photo</span>
                    </button>
                  </div>
                  <img
                    src={post.image}
                    alt="Current post media"
                    className="w-full max-h-56 object-contain rounded-lg"
                  />
                </div>
              ) : (
                /* No image yet on this post */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed rounded-xl p-4 flex items-center justify-center gap-2 hover:border-purple-500/50 transition-colors cursor-pointer"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--surface-subtle)",
                    color: "var(--text-muted)",
                  }}
                >
                  <ImagePlus className="w-5 h-5 text-purple-500" />
                  <span className="text-xs sm:text-sm font-medium">
                    Add a photo to this post
                  </span>
                </button>
              )}

              {errors.image && (
                <p className="text-xs text-rose-500 font-medium px-1">
                  {errors.image.message as string}
                </p>
              )}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* ── Modal Footer ── */}
          <div
            className="p-4 sm:p-5 border-t flex items-center justify-end gap-3"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--surface-subtle)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid || !hasChanges || isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95"
              style={{
                background:
                  "linear-gradient(135deg, #9333ea 0%, #6366f1 100%)",
                boxShadow: "0 4px 15px rgba(147, 51, 234, 0.3)",
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
