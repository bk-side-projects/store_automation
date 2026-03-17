export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  lastOrder: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
