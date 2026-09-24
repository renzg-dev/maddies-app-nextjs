export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  description: string
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Chocolate Cake",
    category: "Cakes",
    price: 850,
    stock: 12,
    description: "Rich chocolate sponge cake with fudge frosting.",
  },
  {
    id: "2",
    name: "Blueberry Muffin",
    category: "Pastries",
    price: 95,
    stock: 40,
    description: "Soft muffin loaded with fresh blueberries.",
  },
  {
    id: "3",
    name: "Sourdough Bread",
    category: "Bread",
    price: 180,
    stock: 8,
    description: "Naturally leavened sourdough with a crisp crust.",
  },
  {
    id: "4",
    name: "Red Velvet Cupcake",
    category: "Cupcakes",
    price: 75,
    stock: 25,
    description: "Classic red velvet topped with cream cheese icing.",
  },
  {
    id: "5",
    name: "Butter Croissant",
    category: "Pastries",
    price: 110,
    stock: 18,
    description: "Flaky, buttery croissant baked fresh every morning.",
  },
]

export const productCategories = [
  "Cakes",
  "Cupcakes",
  "Pastries",
  "Bread",
  "Cookies",
]
