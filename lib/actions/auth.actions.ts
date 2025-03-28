"use server"
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite/config.";
import { cookies } from "next/headers";

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

    const user = await getLoggedInUser();
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

    const user = await getLoggedInUser();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getLoggedInUser = async () => {
  try {
    const sessionCokie = cookies().get("appwrite-session");
    const { account } = await createSessionClient(sessionCokie!.value);

    const user: AuthUserType = await account.get();
    return user;
  } catch (error) {
    console.log("Error session")
    return null;
  }
}

export const logout = async () => {
  try {
    const sessionCokie = cookies().get("appwrite-session");
    const { account } = await createSessionClient(sessionCokie!.value);

    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
  }
}