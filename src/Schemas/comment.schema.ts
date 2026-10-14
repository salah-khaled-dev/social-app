import { z } from "zod";

export const MAX_COMMENT_LENGTH = 500;
export const MAX_COMMENT_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_COMMENT_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const CreateCommentSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(
        MAX_COMMENT_LENGTH,
        `Comment must be ${MAX_COMMENT_LENGTH} characters or less`,
      ),
    image: z
      .instanceof(File)
      .refine(
        (file) => ACCEPTED_COMMENT_IMAGE_TYPES.includes(file.type),
        "Only JPG, PNG, WEBP or GIF images are allowed",
      )
      .refine(
        (file) => file.size <= MAX_COMMENT_IMAGE_SIZE,
        "Image must be 5MB or less",
      )
      .nullable()
      .optional(),
  })
  // a comment needs text OR an image
  .refine((data) => data.content.length > 0 || !!data.image, {
    message: "Write something or add an image",
    path: ["content"],
  });

export type CreateCommentSchemaType = z.infer<typeof CreateCommentSchema>;

export const UpdateCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment can't be empty")
    .max(
      MAX_COMMENT_LENGTH,
      `Comment must be ${MAX_COMMENT_LENGTH} characters or less`,
    ),
});

export type UpdateCommentSchemaType = z.infer<typeof UpdateCommentSchema>;
