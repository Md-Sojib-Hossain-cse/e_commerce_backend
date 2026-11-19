import z from "zod";

export const UserUpdateValidationSchema = z.object({
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

  image: z.string().url("Invalid image URL").optional(),
});
