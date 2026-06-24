const productImage = (label, accent) => {
  const encodedLabel = encodeURIComponent(label);
  const encodedAccent = encodeURIComponent(accent);

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23f8fafc'/%3E%3Crect x='38' y='38' width='524' height='524' rx='42' fill='%23ffffff' stroke='%23e5e7eb' stroke-width='8'/%3E%3Ccircle cx='300' cy='228' r='118' fill='${encodedAccent}' opacity='.16'/%3E%3Cpath d='M180 316h240l-36 78H216l-36-78Z' fill='%231f2937'/%3E%3Cpath d='M224 206h152c34 0 62 28 62 62v34H162v-34c0-34 28-62 62-62Z' fill='${encodedAccent}'/%3E%3Cpath d='M214 302h172l-24 48H238l-24-48Z' fill='%23ffffff' opacity='.78'/%3E%3Ctext x='300' y='465' text-anchor='middle' font-family='Arial, sans-serif' font-size='32' font-weight='700' fill='%23111827'%3E${encodedLabel}%3C/text%3E%3C/svg%3E`;
};

export const mockProducts = [
  {
    id: 1,
    name: "Motorcycle Helmet - Full Face",
    price: 6500,
    category: "Safety",
    image: productImage("Full Face Helmet", "#dc2626"),
    description: "Premium full-face motorcycle helmet with advanced safety features and comfortable padding.",
    stock: 15
  },
  {
    id: 2,
    name: "Motorcycle Gloves - Racing",
    price: 1850,
    category: "Apparel",
    image: productImage("Racing Gloves", "#d97706"),
    description: "High-performance racing gloves with reinforced knuckles and palm protection.",
    stock: 25
  },
  {
    id: 3,
    name: "Motorcycle Jacket - Leather",
    price: 8200,
    category: "Apparel",
    image: productImage("Leather Jacket", "#7c2d12"),
    description: "Premium leather motorcycle jacket with armor protection and ventilation.",
    stock: 10
  },
  {
    id: 4,
    name: "Motorcycle Boots - Touring",
    price: 5400,
    category: "Apparel",
    image: productImage("Touring Boots", "#374151"),
    description: "Comfortable touring boots with ankle protection and oil-resistant soles.",
    stock: 20
  },
  {
    id: 5,
    name: "Motorcycle Handlebar Grips",
    price: 650,
    category: "Accessories",
    image: productImage("Handlebar Grips", "#059669"),
    description: "Ergonomic handlebar grips for reduced vibration and improved comfort.",
    stock: 40
  },
  {
    id: 6,
    name: "Motorcycle Side Mirrors",
    price: 1450,
    category: "Accessories",
    image: productImage("Side Mirrors", "#2563eb"),
    description: "Wide-angle side mirrors with anti-glare coating for better visibility.",
    stock: 18
  },
  {
    id: 7,
    name: "Motorcycle Chain Lube",
    price: 320,
    category: "Maintenance",
    image: productImage("Chain Lube", "#ca8a04"),
    description: "Professional-grade chain lubricant for optimal performance and longevity.",
    stock: 60
  },
  {
    id: 8,
    name: "Motorcycle Crash Bars",
    price: 6800,
    category: "Protection",
    image: productImage("Crash Bars", "#4b5563"),
    description: "Heavy-duty crash bars to protect your motorcycle frame in case of accidents.",
    stock: 8
  },
  {
    id: 9,
    name: "Motorcycle Phone Mount",
    price: 750,
    category: "Accessories",
    image: productImage("Phone Mount", "#0891b2"),
    description: "Secure phone mount with 360-degree rotation and vibration damping.",
    stock: 35
  },
  {
    id: 10,
    name: "Motorcycle Air Filter",
    price: 950,
    category: "Maintenance",
    image: productImage("Air Filter", "#16a34a"),
    description: "High-flow air filter for improved engine performance and fuel efficiency.",
    stock: 22
  }
];

export const categories = [
  "All Products",
  "Safety",
  "Apparel",
  "Accessories",
  "Protection",
  "Maintenance"
];
