import { InferType, object, string } from "yup";

export const AuthLoginSchema = object({
  email: string().email().required(),
  password: string().required(),
})

export type AuthLoginSchemaType = InferType<typeof AuthLoginSchema>
