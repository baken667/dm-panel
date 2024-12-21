export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  created_at: Date
  updated_at: Date
}

export type UserRole = "admin" | "owner"

export const UserRoles: UserRole[] = ["admin", "owner"]