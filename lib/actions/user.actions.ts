"use server"
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite/config.";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  APPWRITE_USERS_AVATAR_BUCKET_ID: AVATAR_BUCKET_ID,
  APPWRITE_LISTS_COLLECTION_ID: LISTS_COLLECTION_ID,
  APPWRITE_RATINGS_COLLECTION_ID: RATINGS_COLLECTION_ID,
  APPWRITE_REVIEWS_COLLECTION_ID: REVIEWS_COLLECTION_ID
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

export const createListDocument = async (userId: string, title: string, isPublic: boolean) => {
  const { database } = await createAdminClient();
  const newList:ListType = await database.createDocument(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    ID.unique(),
    {
      userId,
      title,
      isPublic
    }
  )

  return newList;
}

export const updateListDocument = async (listId:string, newListData: newListDataType) => {
  const { database } = await createAdminClient();
  const list:ListType = await database.updateDocument(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId,
   newListData
  )
  
  return list;
}

export const deleteListDocument = async (listId: string) => {
  const { database } = await createAdminClient();
  await database.deleteDocument(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId,
  )
}

export const getListDocuments = async (userId:string) => {
  const { database } = await createAdminClient();
  const lists: DocumentsListType = await database.listDocuments(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    [
      Query.equal("userId" , userId)
    ]
  )
  
  return lists.documents;
}

export const getListDocument = async (listId: string) => {
  const { database } = await createAdminClient();
  const lists: DocumentsListType = await database.listDocuments(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    [
      Query.equal("$id" , listId)
    ]
  )
  
  return lists.documents[0];
}

export const getListItemsDetails = async (ids: number[], types: ("movie" | "tv")[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/tmdb`, {
    method: "POST",
    body: JSON.stringify({ ids, types }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch list items");
  }

  return res.json();
}