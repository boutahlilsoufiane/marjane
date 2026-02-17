import Link from "next/link";

const products = [
  {
    id: "prod_1",
    name: "Wireless Headphones",
    price: 129.99,
    description: "Noise-cancelling over-ear headphones with 30h battery life.",
    stock: 24,
  },
  {
    id: "prod_2",
    name: "Mechanical Keyboard",
    price: 89.5,
    description: "Hot-swappable switches, RGB backlight, compact layout.",
    stock: 12,
  },
  {
    id: "prod_3",
    name: "4K Monitor",
    price: 329.0,
    description: "27-inch IPS panel with HDR support and thin bezels.",
    stock: 8,
  },
  {
    id: "prod_4",
    name: "USB-C Hub",
    price: 59.99,
    description: "7-in-1 hub with HDMI, Ethernet, and fast USB-A ports.",
    stock: 45,
  },
];

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Demo catalog</p>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        </div>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to cart
        </Link>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-lg border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h2>
              <span className="text-sm text-gray-500">#{product.id}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Stock: {product.stock}
              </div>
            </div>
            <button className="mt-4 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
