export type User = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  civility: string;
};

export enum ExpiresIn {
  "24_HOUR" = "24h",
  "15_MIN" = "15m",
}
