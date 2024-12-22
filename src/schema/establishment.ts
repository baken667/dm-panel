import { boolean, InferType, object, string } from "yup";

export const CreateEstablishmentSchema = object({
  name: string().required(),
  slug: string()
    .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
    .required(),
  active: boolean().required(),
});

export type CreateEstablishmentSchemaType = InferType<
  typeof CreateEstablishmentSchema
>;
