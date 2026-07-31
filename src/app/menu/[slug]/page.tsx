import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Coffee, Flower2, Sparkles } from "lucide-react";
import {
  DrinkIllustration,
  type DrinkArtwork,
} from "@/components/menu/drink-illustration";
import {
  ProductCustomizer,
  type ProductOptionGroup,
} from "@/features/menu/product-customizer";
import { createClient } from "@/lib/supabase/server";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
  option_groups:
    | {
        id: string;
        name: string;
        selection_type: "single" | "multiple";
        is_required: boolean;
        min_selections: number;
        max_selections: number | null;
        display_order: number;
        product_options: {
          id: string;
          name: string;
          additional_price: number | string;
          display_order: number;
        }[];
      }[]
    | null;
};

const validArtwork = [
  "cornflower",
  "cherry",
  "honey",
  "matcha",
  "mocha",
  "classic",
] as const;

function isDrinkArtwork(value: string): value is DrinkArtwork {
  return (validArtwork as readonly string[]).includes(value);
}

function getCategoryName(categories: ProductRow["categories"]) {
  if (!categories) {
    return "TSIKAVA drink";
  }

  if (Array.isArray(categories)) {
    return categories[0]?.name ?? "TSIKAVA drink";
  }

  return categories.name;
}

async function getProduct(slug: string) {
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
        ),
        option_groups (
          id,
          name,
          selection_type,
          is_required,
          min_selections,
          max_selections,
          display_order,
          product_options (
            id,
            name,
            additional_price,
            display_order
          )
        )
      `,
    )
    .eq("slug", slug)
    .eq("is_available", true)
    .maybeSingle();

  if (error) {
    console.error("Could not load product:", error);
  }

  return (data as ProductRow | null) ?? null;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Drink not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const artwork: DrinkArtwork = isDrinkArtwork(product.artwork)
    ? product.artwork
    : "classic";

  const optionGroups: ProductOptionGroup[] = (product.option_groups ?? [])
    .sort((first, second) => first.display_order - second.display_order)
    .map((group) => ({
      id: group.id,
      name: group.name,
      selectionType: group.selection_type,
      isRequired: group.is_required,
      minSelections: group.min_selections,
      maxSelections: group.max_selections,
      options: [...group.product_options]
        .sort((first, second) => first.display_order - second.display_order)
        .map((option) => ({
          id: option.id,
          name: option.name,
          additionalPrice: Number(option.additional_price),
        })),
    }));

  return (
    <main className="page-main product-detail-page">
      <section className="page-shell product-detail-back">
        <Link href="/menu">
          <ArrowLeft size={17} />
          Back to menu
        </Link>
      </section>

      <section className="page-shell product-detail-grid">
        <div className="product-detail-art">
          <DrinkIllustration artwork={artwork} />

          <div className="product-detail-art-label" aria-hidden="true">
            ЦІКАВА · КАВА
          </div>
        </div>

        <div className="product-detail-copy">
          <p className="eyebrow">
            <Flower2 size={16} />
            {getCategoryName(product.categories)}
          </p>

          <h1>{product.name}</h1>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-notes">
            <div>
              <Sparkles size={19} />

              <span>
                <strong>TSIKAVA original</strong>
                <small>Created for this café concept</small>
              </span>
            </div>

            <div>
              <Coffee size={19} />

              <span>
                <strong>Made to order</strong>
                <small>Choose size, milk, temperature, and extras</small>
              </span>
            </div>
          </div>

          <div className="product-detail-base-price">
            <span>Starting at</span>
            <strong>${Number(product.base_price).toFixed(2)}</strong>
          </div>

          <ProductCustomizer
            optionGroups={optionGroups}
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              basePrice: Number(product.base_price),
              artwork,
            }}
          />
        </div>
      </section>
    </main>
  );
}
