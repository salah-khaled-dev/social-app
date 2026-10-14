import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Smile,
  X,
  Globe,
  Loader2,
  Sparkles,
  SendHorizontal,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { UserType } from "../../Types/Profile";
import {
  ACCEPTED_POST_IMAGE_TYPES,
  CreatePostSchema,
  type CreatePostSchemaType,
} from "../../Schemas/post.schema";

const POPULAR_EMOJIS = ["✨", "🔥", "❤️", "🚀", "💡", "😊", "🎉", "👏", "🙌", "💯"];

interface CreatePostProps {
  className?: string;
}

export default function CreatePost({
  className = "max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 w-full",
}: CreatePostProps = {}) {
  const { userLogin } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const token = localStorage.getItem("userToken");

  const { data: profileData } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: () =>
      axios.get("https://route-posts.routemisr.com/users/profile-data", {
        headers: {
          token: token,
          Authorization: `Bearer ${token}`,
        },
      }),
    enabled: !!token,
  });

  const userData: UserType =
    profileData?.data?.data?.user || profileData?.data?.user;
  const displayName =
    userData?.name ||
    (typeof userLogin === "object" ? userLogin?.name : null) ||
    "User";
  const displayPhoto =
    userData?.photo ||
    (typeof userLogin === "object" ? userLogin?.photo : null);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=7c3aed&color=fff&size=80`;

  // ── react-hook-form ──
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<CreatePostSchemaType>({
    defaultValues: {
      body: "",
      image: null,
    },
    resolver: zodResolver(CreatePostSchema),
    mode: "onChange",
  });

  const bodyValue = watch("body") ?? "";
  const imageValue = watch("image");

  // Manage image preview
  useEffect(() => {
    if (!imageValue) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(imageValue);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageValue]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setValue("image", file, { shouldValidate: true, shouldDirty: true });
    e.target.value = "";
  }

  function handleRemoveImage() {
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

  // ── TanStack Query useMutation ──
  const { mutate, isPending, isError, error, reset: resetMutation } = useMutation({
    mutationFn: (values: CreatePostSchemaType) => {
      const token = localStorage.getItem("userToken");
      const formData = new FormData();

      // Backend expects 'body' field; fallback to single space if user only attaches an image
      formData.append("body", values.body?.trim() || " ");

      if (values.image) {
        formData.append("image", values.image);
      }

      return axios.post("https://route-posts.routemisr.com/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });
    },
    onSuccess: () => {
      reset({ body: "", image: null });
      setPreview(null);
      setShowEmojiPicker(false);
      resetMutation();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3500);

      // Invalidate posts list query so the new post displays instantly
      queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
      queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  const apiErrorMessage =
    (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
    error?.message;

  const canSubmit = !isPending && (bodyValue.trim().length > 0 || !!imageValue);

  // Connect register to textareaRef
  const { ref: formRegisterRef, ...restRegister } = register("body");

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        className="rounded-3xl border p-5 sm:p-6 transition-all duration-300 shadow-lg relative overflow-hidden backdrop-blur-xl"
        style={{
          backgroundColor: "var(--surface-card)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Subtle decorative gradient glow at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-600 via-indigo-500 to-pink-500 opacity-80" />

        {/* ── User Header ── */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={displayPhoto || fallbackAvatar}
                alt={displayName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/30 shadow-sm"
                style={{ backgroundColor: "var(--media-bg)" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>

            <div className="min-w-0">
              <h3
                className="font-bold text-sm sm:text-base leading-snug truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {displayName}
              </h3>
              <div
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border mt-0.5"
                style={{
                  backgroundColor: "var(--surface-subtle)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
              >
                <Globe className="w-3 h-3 text-purple-400" />
                <span>Public Feed</span>
              </div>
            </div>
          </div>

          <div
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: "var(--accent-purple-bg)",
              borderColor: "var(--accent-purple-border)",
              color: "var(--accent-purple-text)",
            }}
          > 
            <span>Create a Post</span>
          </div>
        </div>

        {/* ── Textarea Input Field ── */}
        <div className="relative mb-3">
          <textarea
            {...restRegister}
            ref={(e) => {
              formRegisterRef(e);
              (textareaRef as any).current = e;
            }}
            id="create-post-body"
            rows={3}
            disabled={isPending}
            placeholder={`What's on your mind, ${
              userLogin?.name ? userLogin.name.split(" ")[0] : "friend"
            }? Share your thoughts, updates or questions...`}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                onSubmit();
              }
            }}
            className="w-full resize-none rounded-2xl p-4 text-sm sm:text-[15px] leading-relaxed transition-all duration-200 outline-none border focus:ring-2 focus:ring-purple-500/30 disabled:opacity-60"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: errors.body ? "rgba(239, 68, 68, 0.5)" : "var(--input-border)",
              color: "var(--input-text)",
            }}
          />

          {/* Validation or API error alert */}
          {(errors.body?.message || isError) && (
            <div className="flex items-center gap-2 mt-2 px-1 text-xs text-rose-500 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.body?.message || apiErrorMessage || "Failed to create post"}</span>
            </div>
          )}

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Post published successfully!</span>
            </div>
          )}
        </div>

        {/* ── Selected Image Preview Card ── */}
        {preview && (
          <div
            className="mb-4 p-3 rounded-2xl border flex items-center justify-between gap-4 animate-fadeIn"
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border shrink-0" style={{ borderColor: "var(--border-subtle)" }}>
                <img
                  src={preview}
                  alt="Post attachment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  {imageValue?.name || "Attached photo"}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {imageValue ? `${(imageValue.size / (1024 * 1024)).toFixed(2)} MB` : "Ready to upload"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isPending}
              title="Remove photo"
              className="p-2 rounded-xl border hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-500 transition-colors cursor-pointer shrink-0 disabled:opacity-40"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Quick Emojis Strip (Toggleable) ── */}
        {showEmojiPicker && (
          <div
            className="mb-3.5 p-2.5 rounded-2xl border flex items-center gap-2 overflow-x-auto no-scrollbar animate-fadeIn"
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider pl-1 shrink-0" style={{ color: "var(--text-muted)" }}>
              Quick:
            </span>
            <div className="flex items-center gap-1">
              {POPULAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleInsertEmoji(emoji)}
                  className="w-8 h-8 rounded-lg hover:scale-125 transition-transform flex items-center justify-center text-base hover:bg-purple-500/10 cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom Controls Toolbar ── */}
        <div
          className="pt-3.5 border-t flex flex-wrap items-center justify-between gap-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {/* Left Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              id="post-image-file"
              type="file"
              accept={ACCEPTED_POST_IMAGE_TYPES.join(",")}
              onChange={handleImageChange}
              disabled={isPending}
              className="hidden"
            />

            {/* Photo Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border-subtle)",
                color: preview ? "var(--brand-primary)" : "var(--text-primary)",
              }}
            >
              <ImagePlus className="w-4 h-4 text-purple-400" />
              <span>{preview ? "Change Photo" : "Add Photo"}</span>
            </button>

            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              disabled={isPending}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border hover:opacity-90 disabled:opacity-50 ${
                showEmojiPicker ? "ring-2 ring-amber-400/40" : ""
              }`}
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              <Smile className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Feeling</span>
            </button>
          </div>

          {/* Right Action: Character Count & Submit Button */}
          <div className="flex items-center gap-3 ml-auto">
            {bodyValue.length > 0 && (
              <span
                className="text-xs font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {bodyValue.length} characters
              </span>
            )}

            <button
              id="submit-post-btn"
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-md shadow-purple-500/25 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:opacity-95 hover:shadow-lg hover:shadow-purple-500/35 active:scale-95 bg-linear-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-110"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <SendHorizontal className="w-4 h-4" />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}