export type TUpdateUserInfoPayload = {
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
};

export type TUpdateUserInfo = {
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
};

export type TChangeUserPassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TUpdateProfilePayload = {
  image?: string;
  imagePublicId?: string;
};
