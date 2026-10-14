import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ImagePlus, SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ACCEPTED_COMMENT_IMAGE_TYPES,
  CreateCommentSchema,
  MAX_COMMENT_LENGTH,
  type CreateCommentSchemaType,
} from "../../Schemas/comment.schema";

interface CreateCommentProps {
  postId: string;
}

export default function CreateComment({ postId }: CreateCommentProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<CreateCommentSchemaType>({
    defaultValues: { content: "", image: null },
    resolver: zodResolver(CreateCommentSchema),
    mode: "onChange",
  });

  const content = watch("content") ?? "";
  const image = watch("image");

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setValue("image", file, { shouldValidate: true, shouldDirty: true });
    e.target.value = "";
  }

  function removeImage() {
    setValue("image", null, { shouldValidate: true, shouldDirty: true });
  }

  function addComment(values: CreateCommentSchemaType) {
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    if (values.content) formData.append("content", values.content);
    if (values.image) formData.append("image", values.image);

    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      },
    );
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["getPostComments", postId] });
      queryClient.invalidateQueries({ queryKey: ["getPostDetails", postId] });
    },
  });

  const onSubmit = handleSubmit((values) => mutate(values));

  const apiMessage =
    (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
    error?.message;

  const errorMessage =
    errors.image?.message || (isDirty ? errors.content?.message : undefined);

  return (
    <form
      onSubmit={onSubmit}
      className="p-3 px-4 sm:px-5 border-t"
      style={{
        backgroundColor: "var(--comment-section-bg)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div
            className="rounded-2xl border transition-colors focus-within:ring-2 focus-within:ring-purple-500/20"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: errorMessage ? "rgba(239, 68, 68, 0.5)" : "var(--input-border)",
            }}
          >
            <div className="flex items-end">
              <textarea
                id={`comment-input-${postId}`}
                {...register("content")}
                rows={1}
                placeholder="Write a comment..."
                disabled={isPending}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit();
                  }
                }}
                className="flex-1 min-w-0 resize-none bg-transparent px-4 py-2.5 text-sm outline-none disabled:opacity-60"
                style={{
                  color: "var(--input-text)",
                }}
              />

              {/* Image picker */}
              <input
                ref={fileInputRef}
                id={`comment-image-${postId}`}
                type="file"
                accept={ACCEPTED_COMMENT_IMAGE_TYPES.join(",")}
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                title="Add image"
                disabled={isPending}
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 p-2.5 hover:opacity-100 opacity-60 hover:text-purple-600 transition-colors cursor-pointer disabled:opacity-40"
                style={{ color: "var(--text-muted)" }}
              >
                <ImagePlus className="w-4 h-4" />
              </button>
            </div>

            {/* Image preview */}
            {preview && (
              <div className="px-3 pb-3">
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Comment attachment preview"
                    className="max-h-40 rounded-xl border object-contain"
                    style={{
                      backgroundColor: "var(--media-bg)",
                      borderColor: "var(--border-subtle)",
                    }}
                  />
                  <button
                    type="button"
                    title="Remove image"
                    onClick={removeImage}
                    disabled={isPending}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                    style={{
                      backgroundColor: "var(--surface-card)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-1 px-1 text-[11px]">
            <span className="text-rose-500">
              {errorMessage}
              {isError && apiMessage}
            </span>
            {content.length > 0 && (
              <span
                style={{
                  color: content.length > MAX_COMMENT_LENGTH ? "#ef4444" : "var(--text-muted)",
                }}
              >
                {content.length}/{MAX_COMMENT_LENGTH}
              </span>
            )}
          </div>
        </div>

        <button
          id={`comment-submit-${postId}`}
          type="submit"
          disabled={isPending || !isValid}
          title="Send comment"
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed enabled:cursor-pointer"
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <SendHorizontal className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
}
