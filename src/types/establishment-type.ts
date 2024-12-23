import { ImageRecord } from "./image-record";
import { User } from "./user-type";

export type Establishment = {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  details: string | null;
  logo: ImageRecord
  users?: User[];
  active_at: Date | null;
  created_at: Date;
  updated_at: Date;
};
