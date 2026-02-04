"use server"
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite/config.";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  APPWRITE_USERS_AVATAR_BUCKET_ID: AVATAR_BUCKET_ID,
  APPWRITE_LISTS_COLLECTION_ID: LISTS_COLLECTION_ID,
  APPWRITE_WATCHLISTS_COLLECTION_ID: WATCHLISTS_COLLECTION_ID,
  APPWRITE_RATINGS_COLLECTION_ID: RATINGS_COLLECTION_ID,
  APPWRITE_REVIEWS_COLLECTION_ID: REVIEWS_COLLECTION_ID
} = process.env

export const createUserDocument = async (userId: string, user:{email:string, username: string, userId:string}) => {
  const { database } = await createAdminClient();
  const newUser = await database.createDocument<UserType>(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
    user
  )

  return newUser;
}

export const getUserDocument = async (userId: string) => {
  const { database } = await createAdminClient();
  const user = await database.getDocument<UserType>(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
  )

  return user;
}

export const updateUserDocument = async (userId: string, newUserData:NewUserDataType) => {
  const { database } = await createAdminClient();
  const user = await database.updateDocument<UserType>(
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

/********************* LISTS **********************/

export const createListDocument = async (userId: string, title: string, isPublic: boolean, description?: string) => {
  const { database } = await createAdminClient();
  const newList = await database.createDocument<ListType>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    ID.unique(),
    {
      userId,
      title,
      isPublic,
      description
    }
  )

  return newList;
}

//for add/remove items from list and editing its privacy, title, description
export const updateListDocument = async (listId:string, updatedList: UpdatedListDataType) => {
  const { database } = await createAdminClient();
  const list = await database.updateDocument<ListType>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId,
    updatedList
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

export const deleteAllListDocuments = async (userId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ListType>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    [
      Query.equal("userId" , userId)
    ]
  )

  if(documents) { 
    await Promise.all(
      documents.map((list) =>
        database.deleteDocument(
          DATABASE_ID!,
          LISTS_COLLECTION_ID!,
          list.$id,
        )
      )
    );
  }
}

export const getListDocuments = async (userId:string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ListType>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    [
      Query.equal("userId" , userId)
    ]
  )
  
  return documents;
}

export const getListDocument = async (listId: string) => {
  const { database } = await createAdminClient();
  const document = await database.getDocument<ListType>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId
  )
  
  return document;
}

/********************* for lists and watchlist items **********************/

export const getMediaItemsDetails = async (ids: number[], types: ("movie" | "tv")[]) => {
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

/********************* WATCHLISTS **********************/

export const createWatchlistDocument = async (userId: string) => {
  const { database } = await createAdminClient();
  const newWatchlist = await database.createDocument<WatchlistType>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    ID.unique(),
    {
      userId,
      isPublic: true
    }
  )

  return newWatchlist;
}

//for add/remove items from watchlist and editing its privacy.
export const updateWatchlistDocument = async (watchlistId: string, updatedWatchlist: UpdatedWatchlistDataType) => {
  const { database } = await createAdminClient();
  const watchlist = await database.updateDocument<WatchlistType>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    watchlistId,
    updatedWatchlist
  )

  return watchlist;
}

export const getWatchlistDocument = async (userId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<WatchlistType>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    [
      Query.equal("userId" , userId)
    ]
  )

  return documents[0];
}

export const deleteWatchlistDocument = async (userId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<WatchlistType>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    [
      Query.equal("userId" , userId)
    ]
  )

  const watchlist = documents[0];
  await database.deleteDocument(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    watchlist.$id
  )
}