import type { Metadata } from "next";
import { Flower2, SlidersHorizontal } from "lucide-react";
import {
  DrinkCard,
  type DrinkCardProduct,
} from "@/components/menu/drink-card";
import type { DrinkArtwork } from "@/components/menu/drink-illustration";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore TSIKAVA coffee, matcha, tea, and rotating seasonal drinks.",
};

const categories = ["All drinks", "Coffee", "Matcha", "Tea", "Seasonal"];

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number | string;
  artwork: string;
  is_featured: boolean;
  categories:
    | {
        name: string;
      }
    | {
        name: string;
      }[]
    | null;
};

function isDrinkArtwork(value: string): value is DrinkArtwork {
  return [
    "cornflower",
    "cherry",
    "honey",
    "matcha",
    "mocha",
    "classic",
  ].includes(value);
}

function getCategoryName(category: ProductRow["categories"]) {
  if (!category) {
    return "Drink";
  }

  if (Array.isArray(category)) {
    return category[0]?.name ?? "Drink";
  }

  return category.name;
}

async function getProducts(): Promise<DrinkCardProduct[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        name,
        slug,
        description,
        base_price,
        artwork,
        is_featured,
        categories (
          name
        )
      `,
    )
    .eq("is_available", true)
    .order("is_featured", { ascending: false })
    .order("name");

  if (error) {
    console.error("Could not load menu products:", error.message);
    return [];
  }

  return ((data ?? []) as ProductRow[]).map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.base_price),
    artwork: isDrinkArtwork(product.artwork)
      ? product.artwork
      : "classic",
    featured: product.is_featured,
    category: getCategoryName(product.categories),
  }));
}

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <main className="page-main">
      <section className="menu-hero">
        <div className="menu-glow menu-glow-red" aria-hidden="true" />
        <div className="menu-glow menu-glow-blue" aria-hidden="true" />

        <div className="page-shell menu-hero-content">
          <p className="eyebrow">
            <Flower2 size={16} />
            Small menu, strong personality
          </p>

          <h1>Pick something interesting.</h1>

          <p>
            A focused collection of espresso, matcha, and seasonal drinks.
            Familiar enough to love, different enough to remember.
          </p>
        </div>
      </section>

      <section className="page-shell menu-section">
        <div className="menu-toolbar">
          <div className="category-list" aria-label="Menu categories">
            {categories.map((category, index) => (
              <button
                className={index === 0 ? "category-pill active" : "category-pill"}
                key={category}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <button className="filter-button" type="button">
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        {products.length > 0 ? (
          <div className="drink-grid menu-drink-grid">
            {products.map((product) => (
              <DrinkCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-menu-message">
            <h2>The menu is being prepared.</h2>
            <p>
              No available products were found. Check the Supabase products
              table and environment variables.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}