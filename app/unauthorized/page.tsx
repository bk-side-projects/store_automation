
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
      <p className="text-lg mb-8">You do not have permission to access this page.</p>
      <Link href="/" className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">
        Go to Homepage
      </Link>
    </div>
  );
}
