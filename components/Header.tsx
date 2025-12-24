"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-6xl z-50 px-4">
      <div className="flex items-center justify-between backdrop-blur-md border border-cyan-400/50 shadow-lg rounded-full px-6 py-3 md:px-10 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-bold text-lg md:text-xl tracking-wide hover:text-cyan-400 transition"
        >
          ʙᴇᴋᴢᴀᴛ ɪʟʏᴀꜱᴏᴠ
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm md:text-base mx-auto">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hire Me button */}
        <Link
          href="/contact"
          className="hidden md:block ml-auto bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full text-sm md:text-base border border-cyan-400 hover:bg-cyan-400/20 transition"
        >
          Hire Me
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden ml-auto text-white focus:outline-none"
        >
          {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-black/80 backdrop-blur-md border border-cyan-400/50 rounded-xl px-6 py-4 flex flex-col gap-4 text-white/90">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition text-lg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full border border-cyan-400 text-center hover:bg-cyan-400/20 transition"
          >
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
