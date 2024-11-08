export type CreateContent = {
  fileBuffer: Express.Multer.File["buffer"];
  labelId?: string;
  labelName?: string;
  contributorId: string;
};
