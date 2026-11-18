import * as z from "zod";

export const UserRegistrationValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name Can't be less then 2 Characters")
    .max(50, "Name Can't be More then 50 Character!"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Password Can't be less then 6 Character!")
    .max(50, "Password Can't be more then 50 Characters!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character!",
    ),
});
