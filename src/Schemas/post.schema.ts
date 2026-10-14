import { z } from "zod";

export const MAX_POST_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_POST_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const CreatePostSchema = z
  .object({
    body: z.string().trim(),
    image: z
      .custom<File | null | undefined>(
        (val) => val === null || val === undefined || val instanceof File,
        "Invalid file"
      )
      .refine(
        (file) => !file || ACCEPTED_POST_IMAGE_TYPES.includes(file.type),
        "Only JPG, PNG, WEBP, or GIF images are allowed"
      )
      .refine(
        (file) => !file || file.size <= MAX_POST_IMAGE_SIZE,
        "Image must be 5MB or less"
      )
      .nullable()
      .optional(),
  })
  .refine((data) => (data.body && data.body.length > 0) || !!data.image, {
    message: "Please write something or attach an image to create a post",
    path: ["body"],
  });

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = z.object({
  body: z.string().trim(),
  image: z
    .custom<File | null | undefined>(
      (val) => val === null || val === undefined || val instanceof File,
      "Invalid file"
    )
    .refine(
      (file) => !file || ACCEPTED_POST_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG, WEBP, or GIF images are allowed"
    )
    .refine(
      (file) => !file || file.size <= MAX_POST_IMAGE_SIZE,
      "Image must be 5MB or less"
    )
    .nullable()
    .optional(),
});

export type UpdatePostSchemaType = z.infer<typeof UpdatePostSchema>;
