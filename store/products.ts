
import { create } from 'zustand';
import { Product } from '@/types/product';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Product 1', price: 100, stock: 10 },
  { id: '2', name: 'Product 2', price: 200, stock: 20 },
  { id: '3', name: 'Product 3', price: 300, stock: 30 },
];

export const useProductStore = create<ProductState>((set) => ({
  products: initialProducts,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: Date.now().toString() }],
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
}));
