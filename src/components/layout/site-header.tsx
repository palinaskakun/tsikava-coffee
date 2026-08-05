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
      console.error(
        "Unable to read the current user in the header:",
        error.message,
      );

      return false;
    }

    return Boolean(user);
  } catch (error) {
    console.error(
      "Unable to initialize authentication in the header:",
      error,
    );

    return false;
  }
}

export async function SiteHeader() {
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
