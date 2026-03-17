
'use client';

import { useForm } from 'react-hook-form';
import { useProductStore } from '@/store/products';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>({
    defaultValues: product,
  });
  const { addProduct, updateProduct } = useProductStore();
  const router = useRouter();

  const onSubmit = (data: Product) => {
    if (product) {
      updateProduct({ ...product, ...data });
    } else {
      addProduct(data);
    }
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          type="number"
          {...register('price', { required: 'Price is required', valueAsNumber: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>
      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
        <input
          id="stock"
          type="number"
          {...register('stock', { required: 'Stock is required', valueAsNumber: true })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
        {product ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
}
