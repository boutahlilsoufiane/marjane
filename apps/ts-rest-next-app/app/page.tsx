"use client"
import { initQueryClient } from '@ts-rest/react-query';
import contract from '../../../packages/ts-rest/contract';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const client = initQueryClient(contract, {
  baseUrl: apiBaseUrl,
  baseHeaders: {},
});


export default function Home() {

  const { data: cart, isLoading, error } = client.cart.useQuery(['cart'])


  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mt-6"></div>
        </div>
      </div>
    );
  }

  if (error || !cart) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load cart data
      </div>
    );
  }

  const items = cart.body.items;
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = cart.body.total ?? subtotal;
  const tax = Math.max(total - subtotal, 0);

  return (
    <div className="p-6">
      {/* Cart Items List */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                ${item.price.toFixed(2)} × {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Totals */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-300">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
