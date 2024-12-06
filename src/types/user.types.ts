export type UpdateUser = {
  username: string;
  fullName: string;
  isDeafMute?: boolean;
  knowsSignLanguage?: boolean;
  role?: "user" | "moderator";
};

export type CreateUser = UpdateUser & {
  email: string;
  password: string;
};
