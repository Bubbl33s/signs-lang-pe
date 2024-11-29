export type CreateContent = {
  fileBuffer: Express.Multer.File["buffer"];
  labelId?: string;
  labelName?: string;
  categoryId?: string;
  contributorId: string;
};
