export type TUpdateUserInfoPayload = {
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
  img?: Express.Multer.File;
};

export type TUpdateUserInfo = {
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
  imagePublicId?: string;
  image?: string;
};
