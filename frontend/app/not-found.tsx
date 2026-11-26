import { Link } from "@/i18n/routing";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white text-[#172B3A] p-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-[#102D46] mb-2">404</h1>
          <p className="text-lg font-semibold text-[#147D78] mb-4">Page Not Found</p>
          <p className="text-sm text-[#647580] mb-6">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#102D46] hover:bg-[#183F5B] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
