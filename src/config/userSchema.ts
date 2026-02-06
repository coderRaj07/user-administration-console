import * as yup from "yup";
import type { User } from "../types/user";

/**
 * UI field configuration
 * Used only for rendering inputs
 */
export type UserFormField = {
  name: keyof Omit<User, "id">;
  label: string;
  type: string;
  required: boolean;
};

export const userFields: readonly UserFormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
  },
];

/**
 * Validation schema
 * All length + format rules live here
 */
export const userValidationSchema: yup.Schema<Omit<User, "id">> = yup
  .object({
    firstName: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .required("First name is required"),

    lastName: yup
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .required("Last name is required"),

    email: yup
      .string()
      .email("Invalid email address")
      .max(100, "Email cannot exceed 100 characters")
      .required("Email is required"),

    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .required("Phone number is required"),
  })
  .required();

/**
 * Example for future extension (DOB)
 *
 * {
 *   name: "dob",
 *   label: "Date of Birth",
 *   type: "date",
 *   required: false,
 * }
 */
