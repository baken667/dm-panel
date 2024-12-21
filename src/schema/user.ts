import { InferType, object, string } from "yup";
import { UserRoles } from "@/types/user-type";

export const UserUpdateSchema = object({
  name: string().required(),
  email: string().email().required(),
  role: string().oneOf(UserRoles).required(),
  // password_confirmation: string().when("password", (password, schema) => {
  // return password
  // ? schema.optional()
  // : schema.required().oneOf([ref("password")]);
  // }),
});

export type UserUpdateSchemaType = InferType<typeof UserUpdateSchema>;

export const ProfileUpdateSchema = object({
  name: string().required(),
  email: string().email().required(),
});

export type ProfileUpdateSchemaType = InferType<typeof ProfileUpdateSchema>;

export const UserCreateSchema = object({
  name: string().required(),
  email: string().email().required(),
  role: string().oneOf(UserRoles).required(),
});

export type UserCreateSchemaType = InferType<typeof UserCreateSchema>;
