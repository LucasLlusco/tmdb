"use server"
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite/config.";
import { cookies } from "next/headers";
import { createUserDocument, deleteUserAvatar, deleteUserDocument, getUserDocument, updateUserDocument } from "./user.actions";

export const login = async (email:string, password:string) => {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  const user = await getUserDocument(session.userId);
  return user;
}

export const signup = async (email:string, password:string, username:string) => {
  const { account } = await createAdminClient();
  await account.create(ID.unique(), email, password, username);

  const session = await account.createEmailPasswordSession(email, password);
  cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  const newUser = await createUserDocument(session.userId, {
    email, 
    username,
    userId: session.userId, 
  });

  return newUser;
}

export const getLoggedInUser = async () => {
  const sessionCookie = cookies().get("appwrite-session");
  if(!sessionCookie) {
    return null;
  }

  const { account } = await createSessionClient(sessionCookie.value);
  const result = await account.get();

  const user = await getUserDocument(result.$id); 
  return user; 
}

export const logout = async () => {
  const sessionCookie = cookies().get("appwrite-session");
  const { account } = await createSessionClient(sessionCookie!.value);

  cookies().delete("appwrite-session"); 
  await account.deleteSession("current"); 
}

export const updateEmail = async (newEmail:string, password:string) => {
  const sessionCookie = cookies().get("appwrite-session");
  const { account } = await createSessionClient(sessionCookie!.value);

  const result = await account.updateEmail(
    newEmail,
    password
  );

  const updatedUser = await updateUserDocument(result.$id, {email: newEmail});
  return updatedUser; 
}

export const updatePassword = async (newPassword:string, currentPassword:string) => {
  const sessionCookie = cookies().get("appwrite-session");
  const { account } = await createSessionClient(sessionCookie!.value);

  await account.updatePassword(
    newPassword,
    currentPassword 
  );
}

export const deleteAccount = async (email:string, password:string, avatarId?:string) => {
  const { account, users } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  if(avatarId) {
    await deleteUserAvatar(avatarId);
  }

  await deleteUserDocument(session.userId);
  await users.delete(session.userId); 
  cookies().delete("appwrite-session");   
}

export const requestPasswordReset = async (email:string) => {
  const { account } = await createAdminClient();
  await account.createRecovery(
    email,
    "http://localhost:3000/reset-password" 
  );
}

export const confirmPasswordReset = async (userId: string, secret:string, newPassword:string) => {  
  const { account } = await createAdminClient();
  await account.updateRecovery(
    userId,
    secret,
    newPassword
  );
}