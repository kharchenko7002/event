export type FormValues = {
  name: string;
  email: string;
};

export type FormStatus =
  | { type: "idle" }
  | { type: "error"; message: string }
  | { type: "success"; message: string };
