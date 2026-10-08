// z = The namespace object (an object that groups all of Zod's constructors)
/**
 * *******  email: z
    .email("Please provide a valid email") ******
 * error: normalize(params), // message, stored for later
 *  message is only stored	The string is saved as data inside the object. It is not used until validation fails.
 * 
 * ********.transform((email)=> email.toLowerCase().trim()), *****************
 * A user registers with Sam@Gmail.com.
Later they log in typing sam@gmail.com. User.findOne({ email }) finds nothing, so login fails.
Someone registers again with sam@gmail.com. MongoDB's unique: true index is also case-sensitive, so it accepts a duplicate account for the same person.
 */
import {email, z} from "zod";
import { _email } from "zod/v4/core";

// register Zod schema------------------------
const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

    email: z.email("Please provide a valid email").transform((email)=> email.toLowerCase().trim()),

    password: z.string().min(6, "Password is required with minimum 6 characters").maxLength(12, "Password is required with maximum 12 characters")
});

// login Zod schema ------------------
const loginSchema = z.object({
  email: z
    .email("Please provide a valid email")
    .transform((email) => email.toLowerCase().trim()),

  password: z
    .string()
    .min(1, "Password is required"),
});
export {registerSchema, loginSchema};
