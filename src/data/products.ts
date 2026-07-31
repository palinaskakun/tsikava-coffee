import type { DrinkCardProduct } from "../components/menu/drink-card";

export const products: DrinkCardProduct[] = [
  {
    id: "cornflower-cloud",
    name: "Cornflower Cloud",
    slug: "cornflower-cloud",
    description:
      "Blueberry cold foam, vanilla matcha, and oat milk with a soft and sweet finish.",
    price: 6.5,
    category: "Seasonal matcha",
    artwork: "cornflower",
    featured: true,
  },
  {
    id: "cherry-kava",
    name: "Cherry Kava",
    slug: "cherry-kava",
    description:
      "Espresso, dark cherry, cocoa, and lightly sweet cream over ice.",
    price: 6.25,
    category: "Signature latte",
    artwork: "cherry",
    featured: true,
  },
  {
    id: "honey-linen",
    name: "Honey Linen",
    slug: "honey-linen",
    description:
      "Wildflower honey, espresso, sea salt, and silky steamed milk.",
    price: 5.75,
    category: "Signature latte",
    artwork: "honey",
    featured: true,
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Field",
    slug: "strawberry-field",
    description:
      "Strawberry purée, ceremonial matcha, and your choice of milk.",
    price: 6.75,
    category: "Matcha",
    artwork: "matcha",
  },
  {
    id: "dark-forest-mocha",
    name: "Dark Forest Mocha",
    slug: "dark-forest-mocha",
    description:
      "Dark chocolate, espresso, cherry, and a small pinch of smoked salt.",
    price: 6.5,
    category: "Seasonal coffee",
    artwork: "mocha",
  },
  {
    id: "classic-kava",
    name: "Daily Kava",
    slug: "daily-kava",
    description:
      "A straightforward espresso drink made exactly the way you like it.",
    price: 4.5,
    category: "Classic coffee",
    artwork: "classic",
  },
];