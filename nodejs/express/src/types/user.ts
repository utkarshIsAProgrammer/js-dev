export type User = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
};

export type DBUserRow = {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
};

export type DBUserWithPasswordRow = DBUserRow & {
  password_hash: string | null;
};

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};
