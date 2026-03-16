
// This component is now a simple layout wrapper and can remain a Server Component
// or be a Client Component if it needs interactivity, but it no longer handles auth logic.
import Header from './Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
