"use server"
import { createAdminClient } from "../appwrite/config.";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  APPWRITE_USERS_AVATAR_BUCKET_ID: AVATAR_BUCKET_ID,
} = process.env

export const createUserDocument = async (userId: string, user:{email:string, username: string, userId:string}) => {
  const { database } = await createAdminClient();
  const newUser:UserType = await database.createDocument(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
    user
  )

  return newUser;
}

export const getUserDocument = async (userId: string) => {
  const { database } = await createAdminClient();
  const user:UserType = await database.getDocument(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
  )

  return user;
}

export const updateUserDocument = async (userId: string, newUserData:NewUserDataType) => {
  const { database } = await createAdminClient();
  const user:UserType = await database.updateDocument(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
    newUserData
  )
  
  return user;
}

export const deleteUserDocument = async (userId: string) => {
  const { database } = await createAdminClient();
  await database.deleteDocument(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
  )
}

export const deleteUserAvatar = async (avatarId: string) => {
  const { storage } = await createAdminClient();
  await storage.deleteFile(
    AVATAR_BUCKET_ID!,
    avatarId
  ); 
}