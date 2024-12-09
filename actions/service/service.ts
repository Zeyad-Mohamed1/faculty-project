"use server";

export const createFactoryService = async ({
  name,
  phone,
  organization,
  description,
  level,
  device,
  file,
}: {
  name: string;
  phone: string;
  organization: string;
  description: string;
  level: string;
  device: string;
  file: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/factory-laboratory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        organization,
        description,
        level,
        device,
        file,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};

export const getFactoryServices = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/factory-laboratories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};
