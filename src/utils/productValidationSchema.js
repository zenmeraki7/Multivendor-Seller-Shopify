import * as Yup from "yup";

export const productCreationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").trim(),
  description: Yup.string().required("Description is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"), // Replace with ObjectId validation if necessary
  categoryType: Yup.string().required("Category Type is required"), // Replace with ObjectId validation if necessary
  subcategory: Yup.string().required("Subcategories are required"), // Replace with ObjectId validation if necessary
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be at least 0"),
  discountedPrice: Yup.number()
    .required("Discounted price is required")
    .min(0, "Discounted price must be at least 0"),
  specifications: Yup.array()
    .of(
      Yup.object().shape({
        key: Yup.string(),
        value: Yup.string(),
      })
    )
    .optional(),
  stock: Yup.number().min(0, "Stock must be at least 0").default(0),
  tags: Yup.string().optional(),
  shippingDetails: Yup.object()
    .shape({
      weight: Yup.string().optional(),
      freeShipping: Yup.boolean().optional().default(false),
      ShippingCharge: Yup.number().optional(),
    })
    .optional(),
  returnPolicy: Yup.object()
    .shape({
      isReturnable: Yup.boolean().default(false),
      returnWindow: Yup.number().optional(),
    })
    .optional(),
  meta: Yup.object()
    .shape({
      title: Yup.string().optional(),
      description: Yup.string().optional(),
      keywords: Yup.string().optional(),
    })
    .optional(),
  // Validation for thumbnail (required)
  thumbnail: Yup.mixed()
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      const supportedFormats = ["image/jpeg", "image/png", "image/webp"];
      return value && supportedFormats.includes(value.type);
    })
    .required("Thumbnail is required"),
  // Validation for product images
  images: Yup.array()
    .of(
      Yup.mixed()
        .test("fileSize", "File size is too large", (value) => {
          return value && value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test("fileFormat", "Unsupported file format", (value) => {
          const supportedFormats = ["image/jpeg", "image/png", "image/webp"];
          return value && supportedFormats.includes(value.type);
        })
    )
    .min(1, "At least one product image is required")
    .required("Product images are required"),
});
