"use server"
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite/config.";
import { cookies } from "next/headers";
import { createUserDocument, deleteUserAvatar, deleteUserDocument, getUserDocument, updateUserDocument } from "./user.actions";

export const login = async (email:string, password:string) => {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const signup = async (email:string, password:string, username:string) => {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getLoggedInUser = async () => {
  try {
    const sessionCookie = cookies().get("appwrite-session");
    const { account } = await createSessionClient(sessionCookie!.value);
    const result = await account.get();

    const user = await getUserDocument(result.$id);
    return user;
  } catch (error) {
    console.log("Error session")
    return null;
  }
}

export const logout = async () => {
  try {
    const sessionCookie = cookies().get("appwrite-session");
    const { account } = await createSessionClient(sessionCookie!.value);

    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
  }
}

export const updateEmail = async (newEmail:string, password:string) => {
  try {
    const sessionCookie = cookies().get("appwrite-session");
    const { account } = await createSessionClient(sessionCookie!.value);

    const result = await account.updateEmail(
      newEmail,
      password
    );

    const updatedUser = await updateUserDocument(result.$id, {email: newEmail});
    return updatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updatePassword = async (newPassword:string, currentPassword:string) => {
  try {
    const sessionCookie = cookies().get("appwrite-session");
    const { account } = await createSessionClient(sessionCookie!.value);

    const result = await account.updatePassword(
      newPassword,
      currentPassword
    );

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const deleteAccount = async (email:string, password:string, avatarId?:string) => {
  try {
    const { account, users } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    if(avatarId) {
      await deleteUserAvatar(avatarId);
    }

    await deleteUserDocument(session.userId);

    await users.delete(session.userId);
    return { success:true };
  } catch (error) {
    console.log(error);
  }
}

export const requestPasswordReset = async (email:string) => {
  try {
    const { account } = await createAdminClient();
    const result = await account.createRecovery(
      email,
      "http://localhost:3000/reset-password"
    );
  } catch (error) {
    console.log("error requesting password reset: ", error);
  }
}

export const confirmPasswordReset = async (userId: string, secret:string, newPassword:string) => {
  try {
    const { account } = await createAdminClient();
    const result = await account.updateRecovery(
      userId,
      secret,
      newPassword
    );
  } catch (error) {
    console.log("error confirming password reset: ", error);
  }
}