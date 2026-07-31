"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  Check,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  DrinkCard,
  type DrinkCardProduct,
} from "@/components/menu/drink-card";

const categories = [
  "All drinks",
  "Coffee",
  "Matcha",
  "Tea",
  "Seasonal",
] as const;

type Category = (typeof categories)[number];

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name";

type MenuCatalogProps = {
  products: DrinkCardProduct[];
};

function matchesCategory(
  product: DrinkCardProduct,
  category: Category,
) {
  if (category === "All drinks") {
    return true;
  }

  const searchableText = [
    product.name,
    product.category,
    product.description,
    product.artwork,
  ]
    .join(" ")
    .toLowerCase();

  const categoryKeywords: Record<
    Exclude<Category, "All drinks">,
    string[]
  > = {
    Coffee: [
      "coffee",
      "espresso",
      "latte",
      "mocha",
      "americano",
      "cappuccino",
      "cold brew",
      "macchiato",
    ],

    Matcha: [
      "matcha",
      "cornflower",
    ],

    Tea: [
      "tea",
      "chai",
      "earl grey",
      "black tea",
      "green tea",
      "herbal tea",
    ],

    Seasonal: [
      "seasonal",
      "limited",
      "summer",
      "winter",
      "spring",
      "fall",
    ],
  };

  return categoryKeywords[category].some(
    (keyword) => {
      const escapedKeyword = keyword.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );

      const keywordPattern = new RegExp(
        `\\b${escapedKeyword}\\b`,
        "i",
      );

      return keywordPattern.test(searchableText);
    },
  );
}

export function MenuCatalog({
  products,
}: MenuCatalogProps) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All drinks");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [featuredOnly, setFeaturedOnly] =
    useState(false);

  const [maxPrice, setMaxPrice] =
    useState<number | null>(null);

  const [sortBy, setSortBy] =
    useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const matchingProducts = products.filter(
      (product) => {
        const categoryMatches =
          matchesCategory(
            product,
            activeCategory,
          );

        const featuredMatches =
          !featuredOnly ||
          product.featured === true;

        const priceMatches =
          maxPrice === null ||
          product.price <= maxPrice;

        return (
          categoryMatches &&
          featuredMatches &&
          priceMatches
        );
      },
    );

    return [...matchingProducts].sort(
      (firstProduct, secondProduct) => {
        switch (sortBy) {
          case "price-low":
            return (
              firstProduct.price -
              secondProduct.price
            );

          case "price-high":
            return (
              secondProduct.price -
              firstProduct.price
            );

          case "name":
            return firstProduct.name.localeCompare(
              secondProduct.name,
            );

          case "featured":
          default:
            return (
              Number(
                Boolean(
                  secondProduct.featured,
                ),
              ) -
                Number(
                  Boolean(
                    firstProduct.featured,
                  ),
                ) ||
              firstProduct.name.localeCompare(
                secondProduct.name,
              )
            );
        }
      },
    );
  }, [
    activeCategory,
    featuredOnly,
    maxPrice,
    products,
    sortBy,
  ]);

  const activeFilterCount =
    Number(featuredOnly) +
    Number(maxPrice !== null) +
    Number(sortBy !== "featured");

  function clearFilters() {
    setActiveCategory("All drinks");
    setFeaturedOnly(false);
    setMaxPrice(null);
    setSortBy("featured");
  }

  return (
    <div className="menu-catalog">
      <div className="menu-toolbar">
        <div
          aria-label="Menu categories"
          className="category-list"
          role="group"
        >
          {categories.map((category) => {
            const isActive =
              category === activeCategory;

            return (
              <button
                aria-pressed={isActive}
                className={
                  isActive
                    ? "category-pill active"
                    : "category-pill"
                }
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>

        <button
          aria-expanded={filtersOpen}
          className={
            filtersOpen ||
            activeFilterCount > 0
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() =>
            setFiltersOpen(
              (currentValue) =>
                !currentValue,
            )
          }
          type="button"
        >
          <SlidersHorizontal size={16} />
          Filters

          {activeFilterCount > 0 ? (
            <span className="filter-count">
              {activeFilterCount}
            </span>
          ) : null}
        </button>
      </div>

      {filtersOpen ? (
        <div className="menu-filter-panel">
          <div className="menu-filter-panel-header">
            <div>
              <p className="menu-filter-label">
                Refine the menu
              </p>

              <h2>Filters</h2>
            </div>

            <button
              aria-label="Close filters"
              className="filter-close-button"
              onClick={() =>
                setFiltersOpen(false)
              }
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <div className="menu-filter-grid">
            <fieldset className="menu-filter-group">
              <legend>Availability</legend>

              <button
                aria-pressed={featuredOnly}
                className={
                  featuredOnly
                    ? "filter-choice active"
                    : "filter-choice"
                }
                onClick={() =>
                  setFeaturedOnly(
                    (currentValue) =>
                      !currentValue,
                  )
                }
                type="button"
              >
                <span className="filter-checkbox">
                  {featuredOnly ? (
                    <Check size={13} />
                  ) : null}
                </span>

                Featured drinks only
              </button>
            </fieldset>

            <fieldset className="menu-filter-group">
              <legend>Maximum price</legend>

              <div className="filter-choice-row">
                {[5, 6, 7].map((price) => {
                  const isActive =
                    maxPrice === price;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={
                        isActive
                          ? "filter-choice filter-price active"
                          : "filter-choice filter-price"
                      }
                      key={price}
                      onClick={() =>
                        setMaxPrice(
                          isActive
                            ? null
                            : price,
                        )
                      }
                      type="button"
                    >
                      ${price} or less
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="menu-filter-group">
              <span className="filter-legend">
                Sort by
              </span>

              <select
                className="filter-select"
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption,
                  )
                }
                value={sortBy}
              >
                <option value="featured">
                  Featured first
                </option>

                <option value="price-low">
                  Price: low to high
                </option>

                <option value="price-high">
                  Price: high to low
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>
            </label>
          </div>

          <div className="menu-filter-footer">
            <button
              className="clear-filter-button"
              disabled={
                activeFilterCount === 0 &&
                activeCategory ===
                  "All drinks"
              }
              onClick={clearFilters}
              type="button"
            >
              Clear all
            </button>

            <button
              className="apply-filter-button"
              onClick={() =>
                setFiltersOpen(false)
              }
              type="button"
            >
              Show {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "drink"
                : "drinks"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="menu-results-row">
        <p aria-live="polite">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "drink"
            : "drinks"}
        </p>

        {activeCategory !== "All drinks" ||
        activeFilterCount > 0 ? (
          <button
            onClick={clearFilters}
            type="button"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="drink-grid menu-drink-grid">
          {filteredProducts.map((product) => (
            <DrinkCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty-menu-message">
          <h2>No drinks match those filters.</h2>

          <p>
            Try another category or clear the
            current filters.
          </p>

          <button
            className="primary-button"
            onClick={clearFilters}
            type="button"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}