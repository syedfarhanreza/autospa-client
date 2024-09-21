export type TRole = "admin" | "user";
export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  _id: string;
  address: string;
  phone: string;
  createdAt: string;
  role?: TRole;
  auth?: {
    role: TRole;
    email: string;
  };
};
