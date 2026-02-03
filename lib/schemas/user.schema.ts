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