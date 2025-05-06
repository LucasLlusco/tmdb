import { ACCEPTED_IMAGE_TYPES } from "@/constants"
import { z } from "zod"

const imageSchema = typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, "Invalid image file type").transform<File>(files => files.item(0) as File)

export const editProfileFormSchema = () => z.object({
  newAvatar: imageSchema,
  newUsername: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must contain at most 20 characters")
    .optional().or(z.literal('')),
  newBio: z.string()
    .max(1000, {message: "Bio must contain at most 1000 characters"
  }).optional(),
})