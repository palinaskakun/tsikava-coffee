export type ProfileNameState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialProfileNameState: ProfileNameState = {
  status: "idle",
  message: "",
};
