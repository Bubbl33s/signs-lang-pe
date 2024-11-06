export type CreateUpdateUser = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  isDeafMute?: boolean;
  role?: "user" | "moderator";
};
