"use server";

import client from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UpdateUserType } from "@/types";

export const currentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user?.id) {
      return null;
    }

    const user = await client.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export const updateUser = async ({ name, imageUrl }: UpdateUserType) => {
  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      error: "failed to updated user"
    }
  }

  try {
    const updateUser = await client.user.update({
      where: {
        id: user?.id
      },
      data: {
        name: name,
        image: imageUrl
      }
    });

    return {
      success: true,
      message: "User updated successfully"
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "failed to update user"
    }
  }
};