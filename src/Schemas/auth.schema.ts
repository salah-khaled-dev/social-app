import * as zod from "zod";
 export const RegisterSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name Is Required")
      .min(3, "Must Be 3 Characters")
      .max(30, "Must Be 30 Characters at most"),
    email: zod
      .string()
      .nonempty("Email Is Required")
      .email("Invalid Email Address")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Error In Email"),
    password: zod
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8+ chars with uppercase, lowercase, number & special char"
      ),
    rePassword: zod.string().nonempty("Write Match Password"),
    dateOfBirth: zod.string().nonempty("Date of birth is required"),
    gender: zod.enum(["male", "female"], {
      message: "Gender is required",
    }),
  })
  .refine((obj) => obj.password === obj.rePassword, {
    message: "Passwords Not match",
    path: ["rePassword"],
  });
 export type RegisterSchemaType=zod.infer<typeof RegisterSchema>


 /////////////////////////////////////////////////////////////////////// 
//  Login Schema

 export const LoginSchema = zod
  .object({
  
    email: zod
      .string()
      .nonempty("Email Is Required")
      .email("Invalid Email Address")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Error In Email"),
    password: zod
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8+ chars with uppercase, lowercase, number & special char"
      ),
  });
 export type LoginSchemaType=zod.infer<typeof LoginSchema>