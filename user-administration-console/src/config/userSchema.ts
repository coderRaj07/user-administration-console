import * as yup from "yup";

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

export const userValidationSchema = yup.object(
  userFields.reduce<yup.ObjectShape>((acc, field) => {
    let validator = yup.string();

    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }

    if (field.name === "email") {
      validator = validator.email("Invalid email");
    }

    acc[field.name] = validator;
    return acc;
  }, {})
);


// TODO: test by adding dob example later
// {
//   name: "dob",
//   label: "Date of Birth",
//   type: "date",
//   required: false,
// }
