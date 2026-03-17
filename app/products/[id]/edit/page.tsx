
'use client';

import ProductForm from '@/components/products/ProductForm';
import { useProductStore } from '@/store/products';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {product ? <ProductForm product={product} /> : <p>Product not found</p>}
    </div>
  );
}
