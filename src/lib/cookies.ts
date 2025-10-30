export type Cookie = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  size: string;
  delightLevel: string;
  ingredients: string[];
};

export const cookies: Cookie[] = [
  {
    id: "oreo-delight",
    name: "Oreo Overload",
    price: 35,
    image: "/images/oreo-cookie.png",
    description:
      "A decadent vanilla base stacked with crushed Oreos, creamy white chocolate, and a drizzle of dark cocoa ganache.",
    size: "Large (90g)",
    delightLevel: "★★★★★",
    ingredients: [
      "Brown butter",
      "Cane sugar",
      "Crushed Oreos",
      "White chocolate",
      "Organic flour",
      "Free-range eggs",
    ],
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Melt",
    price: 38,
    image: "/images/lotus-cookie.png",
    description:
      "Caramelised Biscoff spread swirled through brown butter dough, topped with spicy biscuit shards and a salted caramel drizzle.",
    size: "Large (92g)",
    delightLevel: "★★★★★",
    ingredients: [
      "Brown butter",
      "Lotus Biscoff spread",
      "Biscoff biscuits",
      "Brown sugar",
      "Organic flour",
      "Sea salt",
    ],
  },
];

export const cookieMap = new Map(cookies.map((cookie) => [cookie.id, cookie]));
