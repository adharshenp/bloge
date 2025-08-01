'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full py-4 bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo + Brand Name */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png" 
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-bold text-gray-900">Blog</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/about" className="hover:text-black">About Us</Link>
          <Link href="/features" className="hover:text-black">Features</Link>
          <Link href="/blog" className="hover:text-black">Blog</Link>
          <Link href="/contact" className="hover:text-black">Contact Us</Link>
          <Link href="/blog" className="px-4 py-2 bg-gray-200 text-white rounded-full transition">demo</Link>
          <Link
            href="/get-started"
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
