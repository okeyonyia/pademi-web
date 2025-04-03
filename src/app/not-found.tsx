"use client";

import { useRouter } from "next/navigation";
import "./globals.css";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-6 p-10 bg-white rounded-xl shadow-lg text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008H14.25V9.75zM12 14.25c1.623 0 3.086.624 4.207 1.643a.75.75 0 01-.997 1.12A5.988 5.988 0 0012 15.75c-1.496 0-2.861.548-3.94 1.463a.75.75 0 01-.997-1.12A7.488 7.488 0 0112 14.25z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-gray-600">
          Oops! We couldn't find what you were looking for.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
