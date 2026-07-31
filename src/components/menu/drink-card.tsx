import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { DrinkIllustration, type DrinkArtwork } from "./drink-illustration";

export type DrinkCardProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  artwork: DrinkArtwork;
  featured?: boolean;
};

type DrinkCardProps = {
  product: DrinkCardProduct;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function DrinkCard({ product }: DrinkCardProps) {
  return (
    <article className={`drink-card drink-card-${product.artwork}`}>
      <div className="drink-card-topline">
        <p>{product.category}</p>

        {product.featured ? (
          <span className="featured-pill">Featured</span>
        ) : null}
      </div>

      <Link
        className="drink-card-art-link"
        href={`/menu/${product.slug}`}
        aria-label={`View ${product.name}`}
      >
        <DrinkIllustration artwork={product.artwork} />
      </Link>

      <div className="drink-card-copy">
        <div className="drink-card-title-row">
          <h3>
            <Link href={`/menu/${product.slug}`}>{product.name}</Link>
          </h3>

          <Link
            className="round-icon-link"
            href={`/menu/${product.slug}`}
            aria-label={`Open ${product.name}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="drink-description">{product.description}</p>
      </div>

      <div className="drink-card-footer">
        <strong>{formatPrice(product.price)}</strong>

        <button className="add-button" type="button">
          <Plus size={17} />
          Add
        </button>
      </div>
    </article>
  );
}
