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

function findUser(
  userId: number,
  callback: (err: Error | null, user?: User) => void,
): void {
  setTimeout(() => {
    const user = users.find((currentUser) => currentUser.id === userId);
    if (!user) {
      callback(new Error(`User with id ${userId} was not found!`));
      return;
    }

    callback(null, user);
  }, 500);
}

findUser(2, (err, user) => {
  if (err) {
    console.log("Callback error!", err.message);
    return;
  }

  console.log("Callback result:", user?.id, user?.name, user?.role);
});
