
'use client';

import { useProductStore } from '@/store/products';
import Link from 'next/link';
import DeleteProduct from './DeleteProduct';

export default function ProductList() {
  const { products } = useProductStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/products/add" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 flex items-center space-x-2">
                  <Link href={`/products/${product.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                  <DeleteProduct productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
