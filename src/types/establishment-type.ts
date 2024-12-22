import { User } from "./user-type";

export type Establishment = {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  details: string | null;
  logo: string | null;
  users?: User[];
  created_at: Date;
  updated_at: Date;
};
