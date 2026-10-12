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

export function fetchUser(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((currentUser) => currentUser.id === userId);

      if (!user) {
        reject(new Error(`User with id ${userId} was not found!`));
        return;
      }

      resolve(user);
    }, 1000);
  });
}

fetchUser(3)
  .then((user) => {
    console.log("Promise result:", user?.id, user?.name, user?.role);
  })
  .catch((err: Error) => {
    console.log("Promise error:", err.message);
  });
