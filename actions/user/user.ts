"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const registerUser = async ({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, password }),
  });

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  revalidateTag("user");

  const data = await res.json();

  return data;
};

export const getUser = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["user"] },
  });

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};
