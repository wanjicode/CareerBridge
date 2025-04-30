import React from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { getUserById } from "@/lib/mock-data";

interface DashboardShellProps {
  children: React.ReactNode;
  role: string;
  userId: string;
  navItems: Array<{
    href: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

export default function DashboardShell({
  children,
  role,
  userId,
  navItems,
}: DashboardShellProps) {
  const user = getUserById(userId);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav role={role} userId={userId} items={navItems} />
      
      <div className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h1>
          {user && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Welcome, {user.name} ({user.id})
            </p>
          )}
        </div>
        
        <div className="w-full">
          {children}
        </div>
      </div>
      
      <footer className="border-t border-gray-200 dark:border-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} CareerBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}