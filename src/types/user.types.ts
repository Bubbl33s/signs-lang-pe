export type UpdateUser = {
  username: string;
  fullName: string;
  isDeafMute?: boolean;
  role?: "user" | "moderator";
};

export type CreateUser = UpdateUser & {
  email: string;
  password: string;
};
