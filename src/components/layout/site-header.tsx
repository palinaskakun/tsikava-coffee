import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SiteHeaderMenu } from "@/components/layout/site-header-menu";

async function getIsAuthenticated() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      // A stale refresh-token cookie simply means this visitor is signed out.
      // Do not surface it as a server error from a shared layout component.
      return false;
    }

    return Boolean(user);
  } catch {
    return false;
  }
}

export async function SiteHeader() {
  // The signed-in state is based on request cookies, so this shared header
  // must render after a request exists instead of during static generation.
  await connection();

  const isAuthenticated =
    await getIsAuthenticated();

  return (
    <div className="site-header-stack">
      <div
        aria-hidden="true"
        className="pattern-strip"
      />

      <SiteHeaderMenu isAuthenticated={isAuthenticated} />
    </div>
  );
}
