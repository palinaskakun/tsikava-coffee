"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { FavoriteDrinkState } from "@/features/account/favorite-drink-state";
import type { ProfileNameState } from "@/features/account/profile-name-state";
import { createClient } from "@/lib/supabase/server";

const favoriteDrinkSchema = z.object({
  productId: z.string().uuid("Choose a valid drink."),
});

const profileNameSchema = z.object({
  fullName: z.string().trim().min(2, "Enter at least two characters.").max(100, "Keep your name under 100 characters."),
});

export async function updateProfileNameAction(
  _previousState: ProfileNameState,
  formData: FormData,
): Promise<ProfileNameState> {
  const result = profileNameSchema.safeParse({
    fullName: formData.get("fullName"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Enter a valid name.",
    };
  }

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;

  if (userError || !user) {
    redirect("/auth/login");
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ full_name: result.data.fullName })
    .eq("id", user.id);

  if (updateError) {
    console.error("Could not update profile name:", updateError);

    return {
      status: "error",
      message: "Your name could not be saved.",
    };
  }

  revalidatePath("/account");
  revalidatePath("/checkout");

  return {
    status: "success",
    message: "Your name was updated.",
  };
}

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
