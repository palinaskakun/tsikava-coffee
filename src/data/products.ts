import type { DrinkCardProduct } from "../components/menu/drink-card";

export const products: DrinkCardProduct[] = [
  {
    id: "cornflower-cloud",
    name: "Cornflower Cloud",
    slug: "cornflower-cloud",
    description:
      "Blueberry syrup, oat milk, vanilla matcha, and blueberry cold foam over ice.",
    price: 6.5,
    category: "Summer matcha",
    artwork: "cornflower",
    featured: true,
  },
  {
    id: "cherry-kava",
    name: "Cherry Kava",
    slug: "cherry-kava",
    description:
      "Espresso, dark cherry, cocoa, and lightly sweet cream served over ice.",
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
      "Wildflower honey, salted caramel, espresso, and silky milk.",
    price: 5.75,
    category: "Signature latte",
    artwork: "honey",
    featured: true,
  },
  {
    id: "forest-berry-refresher",
    name: "Forest Berry Refresher",
    slug: "forest-berry-refresher",
    description:
      "Blackberry, blueberry, blackcurrant, lemon, and sparkling water.",
    price: 5.95,
    category: "Summer refresher",
    artwork: "berry",
    featured: true,
  },
  {
    id: "kupalle-sunset",
    name: "Kupalle Sunset",
    slug: "kupalle-sunset",
    description:
      "Strawberry, raspberry, hibiscus, and lemonade with a bright citrus finish.",
    price: 5.95,
    category: "Summer refresher",
    artwork: "kupalle",
  },
  {
    id: "birch-morning",
    name: "Birch Morning",
    slug: "birch-morning",
    description:
      "Crisp apple, white peach, lemon, and sparkling birch water.",
    price: 5.75,
    category: "Sparkling refresher",
    artwork: "birch",
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