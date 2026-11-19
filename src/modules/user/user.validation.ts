import z from "zod";

export const updateMyUserInfoValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name can't be less than 2 characters")
    .max(50, "Name can't be more than 50 characters")
    .optional(),

  dateOfBirth: z.coerce
    .date({ message: "Invalid date of birth format" })
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine(
      (date) => {
        const minAge = new Date();
        minAge.setFullYear(minAge.getFullYear() - 13);
        return date <= minAge;
      },
      { message: "You must be at least 13 years old" },
    )
    .optional(),

  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional(),
});

export const updateMyUserPasswordValidationSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "Password is required")
    .max(72, "Invalid credentials"),
  newPassword: z
    .string()
    .min(6, "Password Can't be less then 6 Character!")
    .max(50, "Password Can't be more then 50 Characters!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character!",
    ),
  confirmPassword: z
    .string()
    .min(6, "Password Can't be less then 6 Character!")
    .max(50, "Password Can't be more then 50 Characters!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character!",
    ),
});

export const updateProfilePictureValidationSchema = z.object({
  image: z.string().url("Invalid image URL").optional(),
});
