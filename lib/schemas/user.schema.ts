import { z } from "zod"

export const createListFormSchema = () => z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must contain at most 50 characters"),
  privacy: z.enum(["public", "private"]),
  description: z.string()
    .max(1000, {message: "Description must contain at most 1000 characters"
  }).optional()
})

export const editListFormSchema = () => z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must contain at most 50 characters"),
  privacy: z.enum(["public", "private"]),
  description: z.string()
    .max(1000, {message: "Description must contain at most 1000 characters"
  }).optional()
})

export const editWatchlistFormSchema = () => z.object({
  privacy: z.boolean()
})

export const createReviewFormSchema = () => z.object({
  title: z.string().max(50, "Title must contain at most 50 characters").optional(),
  content: z.string()
    .min(100, "Review must be at least 100 characters")
    .max(1000, {message: "Review must contain at most 1000 characters"
  })
})

export const editReviewFormSchema = () => z.object({
  title: z.string().max(50, "Title must contain at most 50 characters").optional(),
  content: z.string()
    .min(100, "Review must be at least 100 characters")
    .max(1000, {message: "Review must contain at most 1000 characters"
  })
})