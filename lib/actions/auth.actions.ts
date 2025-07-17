"use server"
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite/config.";
import { cookies } from "next/headers";
import { createUserDocument, getUserDocument, updateUserDocument } from "./user.actions";

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
