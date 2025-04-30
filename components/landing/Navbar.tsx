"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                Career<span className="text-amber-500">Bridge</span>
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/" active={isActive("/")}>Home</NavLink>
              <NavLink href="/about" active={isActive("/about")}>About</NavLink>
              <NavLink href="/how-it-works" active={isActive("/how-it-works")}>How It Works</NavLink>
              <NavLink href="/resources" active={isActive("/resources")}>Resources</NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Log In
              </Button>
            </Link>
            <Link href="/apply/mentee">
              <Button className="bg-blue-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink href="/" active={isActive("/")}>Home</MobileNavLink>
            <MobileNavLink href="/about" active={isActive("/about")}>About</MobileNavLink>
            <MobileNavLink href="/how-it-works" active={isActive("/how-it-works")}>How It Works</MobileNavLink>
            <MobileNavLink href="/resources" active={isActive("/resources")}>Resources</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4 space-x-3">
              <Link href="/login" className="block w-full">
                <Button variant="outline" className="border-blue-600 text-blue-600 w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/apply/mentee" className="block w-full">
                <Button className="bg-blue-600 text-white w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        active 
          ? "border-blue-500 text-gray-900 dark:text-white" 
          : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
        active
          ? "bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-100"
          : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}