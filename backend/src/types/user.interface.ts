export interface User {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  civility: string;
  isVerified: boolean;
  isAdmin: boolean;
}
