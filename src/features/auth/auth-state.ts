export type AuthState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
  };
};

export const initialAuthState: AuthState = {
  status: "idle",
  message: "",
};