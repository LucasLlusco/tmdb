import { ACCEPTED_IMAGE_TYPES } from "@/constants"
import { z } from "zod"

export const authFormSchema = (type: 'sign-in' | 'sign-up') => z.object({
  username: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8)
})

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

export const ChangeEmailFormSchema = () => z.object({
  password: z.string().min(8, {message: "Password must contain at least 8 characters"}),
  newEmail: z.string().email(),
  confirmNewEmail: z.string().email(),
}).refine((data) => data.newEmail === data.confirmNewEmail, {
  message: "Emails do not match",
  path: ["confirmNewEmail"]
})

export const ChangePasswordFormSchema = () => z.object({
  currentPassword: z.string().min(8, {message: "Password must contain at least 8 characters"}),
  newPassword: z.string().min(8, {message: "Password must contain at least 8 characters"}),
  confirmNewPassword: z.string().min(8, {message: "Password must contain at least 8 characters"}),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"]
})