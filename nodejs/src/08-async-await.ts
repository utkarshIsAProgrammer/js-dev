import { fetchUser } from "./07-promises.ts";

type User = {
  id: number;
  name: string;
  role: "user" | "admin";
};

const users: User[] = [
  {
    id: 1,
    name: "indiedev",
    role: "admin",
  },

  {
    id: 2,
    name: "alisa",
    role: "user",
  },

  {
    id: 3,
    name: "lucia",
    role: "user",
  },
];

async function findUser(userId: number): Promise<void> {
  try {
    const user = await fetchUser(userId);
    console.log("Result:", user?.id, user?.name, user?.role);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    console.log(message);
  }
}

findUser(1);
