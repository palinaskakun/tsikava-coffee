export type FavoriteDrinkState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialFavoriteDrinkState: FavoriteDrinkState = {
  status: "idle",
  message: "",
};