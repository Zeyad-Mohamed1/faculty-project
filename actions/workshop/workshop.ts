"use server";

export const createWorkshop = async (name: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-workshop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};

export const getWorkshops = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/workshops`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};

export const deleteWorkshop = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/workshop/${id}`,
    {
      method: "DELETE",
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

export const availableTimesForWorkshop = async ({
  deviceName,
  date,
}: {
  deviceName: string;
  date: Date;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/timess/${deviceName}/${date}`,
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

export const reserveWorkshop = async ({
  name,
  email,
  workshopName,
  date,
  time,
}: {
  name: string;
  email: string;
  workshopName: string;
  date: Date;
  time: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reserve-workshop`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, workshopName, date, time }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};

export const getAllWorkshopReservations = async (date: Date) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/workshops-reservations/${
      date.toISOString().split("T")[0]
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(date.toISOString().split("T")[0]);

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};
