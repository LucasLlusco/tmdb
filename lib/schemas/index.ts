import { ACCEPTED_IMAGE_TYPES } from "@/constants"
import { z } from "zod"

export const authFormSchema = (type: 'sign-in' | 'sign-up') => z.object({
  username: type === 'sign-in' ? z.string().optional() : z.string().min(2, "Username must be at least 2 characters").max(20, "Username must contain at most 20 characters"),
  email: z.string().email(),
  password: z.string().min(8, {message: type === "sign-in" ? "Password is required": "Password must contain at least 8 characters"})
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
  }).optional()
})

export const changeEmailFormSchema = () => z.object({
  password: z.string().min(8, {message: "Password is required"}),
  newEmail: z.string().email(),
  confirmNewEmail: z.string().email(),
}).refine((data) => data.newEmail === data.confirmNewEmail, {
  message: "Emails do not match",
  path: ["confirmNewEmail"]
})

export const changePasswordFormSchema = () => z.object({
  currentPassword: z.string().min(8, {message: "Password is required"}),
  newPassword: z.string().min(8, {message: "Password must contain at least 8 characters"}),
  confirmNewPassword: z.string().min(8, {message: "Password must contain at least 8 characters"}),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"]
})

export const deleteAccountFormSchema = () => z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: "Password is required"})
})

export const requestPasswordResetSchema = () => z.object({
  email: z.string().email()
})

export const confirmPasswordResetSchema = () => z.object({
  password: z.string().min(8, {message: "Password must contain at least 8 characters"}),
  confirmPassword:  z.string().min(8, {message: "Password must contain at least 8 characters"})
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

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