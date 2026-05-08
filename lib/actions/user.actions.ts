"use server"
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite/config.";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  APPWRITE_USERS_AVATAR_BUCKET_ID: AVATAR_BUCKET_ID,
  APPWRITE_LISTS_COLLECTION_ID: LISTS_COLLECTION_ID,
  APPWRITE_WATCHLISTS_COLLECTION_ID: WATCHLISTS_COLLECTION_ID,
  APPWRITE_REVIEWS_COLLECTION_ID: REVIEWS_COLLECTION_ID,
  APPWRITE_REACTIONS_COLLECTION_ID: REACTIONS_COLLECTION_ID,
  APPWRITE_RATINGS_COLLECTION_ID: RATINGS_COLLECTION_ID
} = process.env

interface CreateUserInput {
  email: string;
  username: string;
  userId: string;
}

export const createUser = async (userId: string, data: CreateUserInput) => {
  const { database } = await createAdminClient();
  const newUser = await database.createDocument<UserDocument>(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
    data
  )

  return newUser;
}

export const getUser = async (userId: string) => {
  const { database } = await createAdminClient();
  const user = await database.getDocument<UserDocument>(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
  )

  return user;
}

interface UpdateUserInput {
  username?: string;
  email?: string;
  avatarId?: string;
  avatarPath?: string;
  bio?:string;
}

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  const { database } = await createAdminClient();
  const user = await database.updateDocument<UserDocument>(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userId,
    data,
  )
  
  return user;
}

export const deleteUser = async (userId: string) => {
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

interface CreateListInput {
  userId: string; 
  title: string;
  isPublic: boolean;
  description?: string;
}

export const createList = async (data: CreateListInput) => {
  const { database } = await createAdminClient();
  const newList = await database.createDocument<ListDocument>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    ID.unique(),
    {
      userId: data.userId,
      title: data.title,
      isPublic: data.isPublic,
      description: data.description
    }
  )

  return newList;
}

interface UpdateListInput {
  title?: string;
  isPublic?: boolean;
  description?: string;
  mediaIds?: number[];
  mediaTypes?: ("movie" | "tv")[];
}

//for add/remove items from list and editing its privacy, title, description
export const updateList = async (listId: string, data: UpdateListInput) => {
  const { database } = await createAdminClient();
  const list = await database.updateDocument<ListDocument>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId,
    data
  )
  
  return list;
}

export const deleteList = async (listId: string) => {
  const { database } = await createAdminClient();
  await database.deleteDocument(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId,
  )
}

export const deleteListsByUser = async (userId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ListDocument>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    [Query.equal("userId" , userId)]
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

export const getListsByUser = async (userId:string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ListDocument>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    [Query.equal("userId" , userId)]
  )
  
  return documents;
}

export const getList = async (listId: string) => {
  const { database } = await createAdminClient();
  const document = await database.getDocument<ListDocument>(
    DATABASE_ID!,
    LISTS_COLLECTION_ID!,
    listId
  )
  
  return document;
}

/********************* for lists and watchlist items **********************/

export const getMediaItemsDetails = async (ids: number[], types: ("movie" | "tv")[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/tmdb/batch`, {
    method: "POST",
    body: JSON.stringify({ ids, types }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch list items");
  }

  return res.json();
}

/********************* WATCHLISTS **********************/

export const createWatchlist = async (userId: string) => {
  const { database } = await createAdminClient();
  const newWatchlist = await database.createDocument<WatchlistDocument>(
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

interface UpdateWatchlistInput {
  isPublic?: boolean;
  mediaIds?: number[];
  mediaTypes?: ("movie" | "tv")[];
}

//for add/remove items from watchlist and editing its privacy.
export const updateWatchlist = async (watchlistId: string, data: UpdateWatchlistInput) => {
  const { database } = await createAdminClient();
  const watchlist = await database.updateDocument<WatchlistDocument>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    watchlistId,
    data
  )

  return watchlist;
}

export const getWatchlist = async (userId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<WatchlistDocument>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    [Query.equal("userId" , userId)]
  )

  return documents[0];
}

export const deleteWatchlist = async (userId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<WatchlistDocument>(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    [Query.equal("userId" , userId)]
  )

  const watchlist = documents[0];
  await database.deleteDocument(
    DATABASE_ID!,
    WATCHLISTS_COLLECTION_ID!,
    watchlist.$id
  )
}

/********************* REVIEWS **********************/

interface CreateReviewInput {
  userId: string;
  mediaId: number;
  mediaType: "movie" | "tv";
  mediaTitle: string;
  mediaPosterPath: string;
  title?: string;
  content: string;
}

export const createReview = async (data: CreateReviewInput) => {
  const { database } = await createAdminClient();
  const newReview = await database.createDocument<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    ID.unique(),
    data
  )

  return newReview;
}

interface UpdateReviewInput {
  title?: string;
  content?: string;
  likesCount?: number;
  dislikesCount?: number;  
}

export const updateReview = async (reviewId: string, data: UpdateReviewInput) => {
  const { database } = await createAdminClient();
  const review = await database.updateDocument<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    reviewId,
    data
  )

  return review;
}

export const deleteReview = async (reviewId: string) => {
  const { database } = await createAdminClient();
  await database.deleteDocument(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    reviewId,
  )
}

export const getReview = async (reviewId: string) => {
  const { database } = await createAdminClient();
  const document = await database.getDocument<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    reviewId
  )

  return document;
}

//get reviews from 1 user and the current user reactions to them
export const getReviewsByUser = async (userId: string, currentUserId: string | null) => {
  //1- get user reviews
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    [Query.equal("userId", userId)]
  )

  //check if there are any reviews before proceeding
  if(documents.length === 0) {
    return [] as ReviewDocument[];
  }

  //2- if there are reviews, check if there is a logged in user and get his to this reviews
  let reactions : ReactionDocument[];
  if(currentUserId) {
    const reviewIds = documents.map((doc) => doc.$id);
  
    reactions = await getReactionsByUserInReviewsGiven(currentUserId, reviewIds);
  }

  //3- match reviews with the current user reactions
  const reviews: ReviewDocument[] = documents.map((review) => ({
    ...review,
    currentUserReaction: reactions.find((reaction) => reaction.reviewId === review.$id)?.type ?? null,
  }));
  
  return reviews;
}

//get reviews from 1 media(movie or tv show) + their owners and current user reactions to them.
export const getReviewsByMedia = async (mediaId: number, currentUserId: string | null) => {
  //1- get media reviews
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    [Query.equal("mediaId", mediaId)]
  )

  //check if there are any reviews before proceeding
  if(documents.length === 0) {
    return [] as ReviewWithUser[];
  }

  //2- if there are reviews, get their owning users
  const userIds = documents.map((doc) => doc.userId);
  const uniqueUserIds = Array.from(new Set(userIds));
  //fetch those users avoiding duplicates
  const users: UserDocument[] = await Promise.all(
    uniqueUserIds.map((userId) => getUser(userId))
  );
  
  //3- if there is a logged in user, get his reactions to this reviews
  let reactions: ReactionDocument[];
  if(currentUserId) {
    const reviewIds = documents.map((doc) => doc.$id);
    
    reactions = await getReactionsByUserInReviewsGiven(currentUserId, reviewIds);
  }

  //4- finally, match reviews with their owners and the current user reactions.
  const reviews: ReviewWithUser[] = documents.map((review) => ({
    ...review,
    currentUserReaction: currentUserId ? reactions.find((reaction) => reaction.reviewId === review.$id)?.type ?? null : null,
    user: {
      username: users.find((user) => user.userId === review.userId)?.username ?? "account deleted",
      avatarPath: users.find((user) => user.userId === review.userId)?.avatarPath ?? ""
    }
  }));

  return reviews;
}

/********************* REACTIONS (linked with reviews feature) **********************/

export const getReactionByUserInReviewGiven = async (userId: string, reviewId: string) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ReactionDocument>(
    DATABASE_ID!,
    REACTIONS_COLLECTION_ID!,
    [Query.equal("userId", userId), Query.equal("reviewId", reviewId)]
  )
  
  return documents;
}

export const getReactionsByUserInReviewsGiven = async (userId: string, reviewIds: string[]) => {
  const { database } = await createAdminClient();
  const { documents } = await database.listDocuments<ReactionDocument>(
    DATABASE_ID!,
    REACTIONS_COLLECTION_ID!,
    [Query.equal("userId", userId), Query.equal("reviewId", reviewIds)]
  )
  
  return documents;
}

export const createReaction = async (userId: string, reviewId: string, type: "like" | "dislike") => {
  const { database } = await createAdminClient();
  const newReaction = await database.createDocument<ReactionDocument>(
    DATABASE_ID!,
    REACTIONS_COLLECTION_ID!,
    ID.unique(),
    {
      userId: userId,
      reviewId: reviewId,
      type: type
    }
  )

  return newReaction;
}

export const deleteReaction = async (reactionId: string) => {
  const { database } = await createAdminClient();
  await database.deleteDocument(
    DATABASE_ID!,
    REACTIONS_COLLECTION_ID!,
    reactionId,
  )
}

export const updateReaction = async (reactionId: string, type: "like" | "dislike") => {
  const { database } = await createAdminClient();
  const reaction = await database.updateDocument<ReactionDocument>(
    DATABASE_ID!,
    REACTIONS_COLLECTION_ID!,
    reactionId,
    {
      type: type
    }
  )

  return reaction;
}

//toggle reaction LIKE/DISLIKE review
export const toggleReaction = async (currentUserId: string, reviewId: string, type: "like" | "dislike") => {

  //1- Check if there is already a reaction from this current user for this review
  const documents = await getReactionByUserInReviewGiven(currentUserId, reviewId);
  const existingReaction = documents[0];

  //2- Then react to the review accordingly
  if(!existingReaction) {
    //CASE 1: There's no reaction -> create and increment the counter
    await createReaction(currentUserId, reviewId, type);
    await incrementCounter(reviewId, type, +1);
  } else if (existingReaction.type === type) {
    //CASE 2: Same reaction type -> delete and decrement the counter.
    await deleteReaction(existingReaction.$id);
    await incrementCounter(reviewId, type, -1);
  } else {
    //CASE 3: Opposite reaction -> switch reaction type and update the counter
    await updateReaction(existingReaction.$id, type);

    await incrementCounter(reviewId, existingReaction.type, -1);
    await incrementCounter(reviewId, type, +1);
  }
}

export const incrementCounter = async (reviewId: string, type: "like" | "dislike", delta: 1 | -1) => {
  const review = await getReview(reviewId);

  await updateReview(reviewId, {
    ...(type === "like") && {likesCount: review.likesCount + delta},
    ...(type === "dislike") && {dislikesCount: review.dislikesCount + delta}, 
  });
};