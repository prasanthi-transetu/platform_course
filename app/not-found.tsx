import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

