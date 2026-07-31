"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { FavoriteDrinkState } from "@/features/account/favorite-drink-state";
import { createClient } from "@/lib/supabase/server";

const favoriteDrinkSchema = z.object({
  productId: z.string().uuid("Choose a valid drink."),
});

export async function updateFavoriteDrinkAction(
  _previousState: FavoriteDrinkState,
  formData: FormData,
): Promise<FavoriteDrinkState> {
  const result = favoriteDrinkSchema.safeParse({
    productId: formData.get("productId"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Choose a valid drink.",
    };
  }

  const supabase = await createClient();

  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  const user = userData.user;

  if (userError || !user) {
    redirect("/auth/login");
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id")
    .eq("id", result.data.productId)
    .eq("is_available", true)
    .maybeSingle();

  if (productError || !product) {
    return {
      status: "error",
      message: "That drink is no longer available.",
    };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      favorite_product_id: product.id,
    })
    .eq("id", user.id);

  if (updateError) {
    console.error(
      "Could not update favorite drink:",
      updateError,
    );

    return {
      status: "error",
      message: "Your favorite drink could not be saved.",
    };
  }

  revalidatePath("/account");

  return {
    status: "success",
    message: "Your favorite drink was updated.",
  };
}