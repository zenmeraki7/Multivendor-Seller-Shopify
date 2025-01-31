import * as Yup from "yup";


export const vendorUpdateSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full name is required."),
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Email is required."),
  phoneNum: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required."),
  address: Yup.string().required("Address is required."),
  zipCode: Yup.string()
    .matches(/^[0-9]{6}$/, "Zip code must be exactly 6 digits.")
    .required("Zip code is required."),
  city: Yup.string().required("City is required."),
  state: Yup.string().required("State is required."),
  country: Yup.string().default("India").required("Country is required."),
  companyName: Yup.string().trim().required("Company name is required."),
  website: Yup.string().url("Website must be a valid URL.").notRequired(),
  businessType: Yup.string().required("Business type is required."),
  supportContact: Yup.object().shape({
    email: Yup.string()
      .email("Support email must be a valid email.")
      .notRequired(),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Support phone number must be exactly 10 digits.")
      .notRequired(),
  }),
});
