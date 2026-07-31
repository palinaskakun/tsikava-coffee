import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  DrinkIllustration,
  type DrinkArtwork,
} from "@/components/menu/drink-illustration";

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

export function DrinkCard({
  product,
}: DrinkCardProps) {
  return (
    <article
      className={`drink-card drink-card-${product.artwork}`}
    >
      <div className="drink-card-topline">
        <p>{product.category}</p>

        {product.featured ? (
          <span className="featured-pill">
            Featured
          </span>
        ) : null}
      </div>

      <Link
        aria-label={`View ${product.name}`}
        className="drink-card-art-link"
        href={`/menu/${product.slug}`}
      >
        <DrinkIllustration
          artwork={product.artwork}
        />
      </Link>

      <div className="drink-card-copy">
        <div className="drink-card-title-row">
          <h3>
            <Link href={`/menu/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <Link
            aria-label={`Open ${product.name}`}
            className="round-icon-link"
            href={`/menu/${product.slug}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="drink-description">
          {product.description}
        </p>
      </div>

      <div className="drink-card-footer">
        <strong>
          From {formatPrice(product.price)}
        </strong>

        <Link
          className="add-button"
          href={`/menu/${product.slug}`}
        >
          Choose
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}