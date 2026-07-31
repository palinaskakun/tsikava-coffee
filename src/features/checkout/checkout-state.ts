export type CheckoutState = {
  status: "idle" | "error" | "success";
  message: string;
  checkoutUrl?: string;
  fieldErrors?: {
    customerName?: string[];
    customerEmail?: string[];
    pickupMinutes?: string[];
    customerNotes?: string[];
    cart?: string[];
  };
};

export const initialCheckoutState: CheckoutState = {
  status: "idle",
  message: "",
};