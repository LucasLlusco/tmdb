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

export const getReviewsByUser = async (userId: string, currentUserId: string | null) => {
  const { database } = await createAdminClient();
  const { documents: reviews } = await database.listDocuments<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    [Query.equal("userId", userId)]
  )

  let reactions : ReactionDocument[];
  if(currentUserId) {
    const reviewIds = reviews.map((doc) => doc.$id);
    
    reactions = await getReactionsByUserInReviewsGiven(currentUserId, reviewIds);
  }

  const finalReviews: ReviewDocument[] = reviews.map((review) => ({
    ...review,
    currentUserReaction: reactions.find((reaction) => reaction.reviewId === review.$id)?.type ?? null,
  }));
  
  return finalReviews;
}

export const getReviewsByMedia = async (mediaId: number, currentUserId: string | null) => {
  const { database } = await createAdminClient();
  const { documents: reviews } = await database.listDocuments<ReviewDocument>(
    DATABASE_ID!,
    REVIEWS_COLLECTION_ID!,
    [Query.equal("mediaId" , mediaId)]
  )

  const userIds = reviews.map((doc) => doc.userId);
  const uniqueUserIds = Array.from(new Set(userIds));

  const users = await Promise.all(
    uniqueUserIds.map((userId) => getUser(userId))
  );

  let reactions : ReactionDocument[];
  if(currentUserId) {
    const reviewIds = reviews.map((doc) => doc.$id);
    
    reactions = await getReactionsByUserInReviewsGiven(currentUserId, reviewIds);
  }

  const reviewsWithUser: ReviewWithUser[] = reviews.map((review) => ({
    ...review,
    currentUserReaction: reactions.find((reaction) => reaction.reviewId === review.$id)?.type ?? null,
    user: {
      username: users.find((user) => user.userId === review.userId)?.username ?? "Uknown",
      avatarPath: users.find((user) => user.userId === review.userId)?.avatarPath ?? "",
    }
  }));

  return reviewsWithUser;
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

export const toggleReaction = async (currentUserId: string, reviewId: string, type: "like" | "dislike") => {
  const documents = await getReactionByUserInReviewGiven(currentUserId, reviewId);
  const existingReview = documents[0];

  if(!existingReview) {
    await createReaction(currentUserId, reviewId, type);

    await incrementCounter(reviewId, type, +1);
  } else if (existingReview.type === type) {
    await deleteReaction(existingReview.$id);

    await incrementCounter(reviewId, type, -1);
  } else {
    await updateReaction(existingReview.$id, type);

    await incrementCounter(reviewId, existingReview.type, -1);
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