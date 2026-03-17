
'use client';

import { useProductStore } from '@/store/products';

interface DeleteProductProps {
  productId: string;
}

export default function DeleteProduct({ productId }: DeleteProductProps) {
  const { deleteProduct } = useProductStore();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Delete
    </button>
  );
}
