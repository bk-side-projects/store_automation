import { Order, Product, Customer } from '../types';

// Mock Data
const mockOrders: Order[] = [
  { id: '#8546', customerName: 'John Doe', date: '2023-11-20', amount: 150.00, status: 'Delivered' },
  { id: '#8547', customerName: 'Jane Smith', date: '2023-11-21', amount: 250.50, status: 'Processing' },
  { id: '#8548', customerName: 'Bob Johnson', date: '2023-11-22', amount: 75.25, status: 'Shipped' },
  { id: '#8549', customerName: 'Alice Williams', date: '2023-11-23', amount: 300.00, status: 'Pending' },
  { id: '#8550', customerName: 'Charlie Brown', date: '2023-11-24', amount: 50.75, status: 'Delivered' },
];

const mockSalesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 4500 },
    { name: 'Fri', sales: 6000 },
    { name: 'Sat', sales: 8000 },
    { name: 'Sun', sales: 7500 },
];

// Mock API Functions
export async function getSummaryMetrics() {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = mockOrders.length;
  const totalCustomers = new Set(mockOrders.map(o => o.customerName)).size;

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
  };
}

export async function getRecentOrders(): Promise<Order[]> {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 800));
  return mockOrders.slice(0, 5);
}

export async function getSalesData() {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1200));
    return mockSalesData;
}
