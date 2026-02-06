import * as yup from "yup";
import type { User } from "../types/user";

export const userFields = [
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
] as const;



export const userValidationSchema: yup.Schema<Omit<User, "id">> = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
  })
  .required();



// TODO: test by adding dob example later
// {
//   name: "dob",
//   label: "Date of Birth",
//   type: "date",
//   required: false,
// }
