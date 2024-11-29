export type CreateCategory = {
  name: string;
  description: string;
  icon?: string;
};

export type UpdateCategory = {
  name?: string;
  description?: string;
  icon?: string;
};
