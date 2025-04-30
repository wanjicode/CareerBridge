"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function DashboardNav({ 
  role, 
  userId, 
  items 
}: { 
  role: string,
  userId: string,
  items: NavItemProps[]
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4">
      <div className="flex items-center">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-blue-600">
            Career<span className="text-amber-500">Bridge</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:ml-8 md:flex md:items-center md:space-x-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              )}
            >
              <div className="mr-2">{item.icon}</div>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Link
          href="/login"
          className="hidden md:inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
        >
          Logout
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-base font-medium rounded-md transition",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="mr-2">{item.icon}</div>
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}