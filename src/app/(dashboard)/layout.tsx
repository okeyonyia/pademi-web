import type { Metadata } from "next";
import Sidebar from "@/components/common/layout/Sidebar";
import { AuthProvider } from "@/lib/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NoSSR from "@/components/common/NoSSR";

export const metadata: Metadata = {
  title: "Pademi",
  description: "—no more messy group chats or endless email threads.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <AuthProvider>
        <ProtectedRoute>
          <div className="flex min-h-screen">
            <NoSSR 
              fallback={
                <div className="w-72 h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-white/10 animate-pulse">
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-white/10 rounded w-20"></div>
                        <div className="h-3 bg-white/5 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <Sidebar />
            </NoSSR>
            <main className="flex-1 lg:ml-0 p-6 lg:p-8 overflow-auto min-h-screen">
              <div className="max-w-7xl mx-auto w-full">
                <NoSSR>
                  {children}
                </NoSSR>
              </div>
            </main>
          </div>
        </ProtectedRoute>
      </AuthProvider>
    </div>
  );
}
