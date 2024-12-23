import { UserRole } from "@/types/user-type";
import { boolean, date, InferType, object, string } from "yup";

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

export const UpdateEstablishmentSchema = (userRole: UserRole) => {
  return object({
    name: string().required(),
    slug: string()
      .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
      .when([], {
        is: () => userRole === "admin",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    active_at: date().notRequired(),
  });
};

export type UpdateEstablishmentSchemaType = InferType<
  ReturnType<typeof UpdateEstablishmentSchema>
>;
