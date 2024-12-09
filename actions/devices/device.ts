"use server";

export const addDevice = async (name: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-device`, {
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

export const getDevices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/devices`, {
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

export const deleteDevice = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/device/${id}`, {
    method: "DELETE",
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

export const availableTimesForDevice = async ({
  deviceName,
  date,
}: {
  deviceName: string;
  date: Date;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/times/${deviceName}/${date}`,
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

export const createDeviceReservation = async ({
  name,
  email,
  deviceName,
  date,
  time,
}: {
  name: string;
  email: string;
  deviceName: string;
  date: Date;
  time: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reserve-device`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, deviceName, date, time }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};

export const getAllDeviceReservations = async (date: Date) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/device-reservations/${
      date.toISOString().split("T")[0]
    }`,
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
