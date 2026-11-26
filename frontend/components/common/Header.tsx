"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "../ui/Button";
import {
  Menu,
  X,
  PhoneCall,
  Mail,
  Clock,
  Search,
} from "lucide-react";

export const Header: React.FC = () => {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Curated, elegant navigation links with generous spacing
  const navLinks = [
    { href: "/medical-tourism", label: t("medicalTourism") },
    { href: "/destinations", label: t("destinations") },
    { href: "/hospitals", label: t("hospitals") },
    { href: "/specialties", label: t("specialties") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/about", label: t("about") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E1E7E8]">
      {/* Top micro-bar: Solid colors, pristine alignment */}
      <div className="bg-[#102D46] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block border-b border-[#183F5B]">
        <div className="max-w-[1360px] mx-auto flex justify-between items-center text-xs text-white/90">
          <div className="flex items-center gap-2 text-white/70 text-[11px] font-medium tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#147D78]" />
            <span>International Medical Concierge Desk</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/90">
            <Link
              href="/portal"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded text-[11px] font-medium"
            >
              <Search className="w-3 h-3 text-[#147D78]" />
              <span>{t("trackCase")}</span>
            </Link>
            <a
              href="tel:+8801730000000"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#147D78]" />
              <span className="font-mono">+880 1730 000000</span>
            </a>
            <a
              href="mailto:info@sunbreezehealthcare.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#147D78]" />
              <span>info@sunbreezehealthcare.com</span>
            </a>
            <span className="flex items-center gap-1.5 text-white/80">
              <Clock className="w-3.5 h-3.5 text-[#147D78]" />
              {tCommon("operatingHours")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation: Spacious, uncluttered luxury layout */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo with Wave/Sun Breeze Emblem */}
        <Link href="/" className="flex items-center gap-3 group select-none shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-[#147D78] flex items-center justify-center p-1 bg-white shrink-0">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[#147D78]">
              <circle cx="20" cy="20" r="18" stroke="#102D46" strokeWidth="2.5" />
              <path d="M10 21C14 17 18 24 22 20C26 16 30 22 32 19" stroke="#147D78" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M11 25C15 21 19 28 23 24C27 20 30 24 31 23" stroke="#102D46" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#102D46] group-hover:text-[#183F5B] transition-colors leading-none">
              Sun Breeze
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#647580] mt-0.5">
              HEALTHCARE
            </span>
          </div>
        </Link>

        {/* Center Navigation Links: Generously spaced editorial menu */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-9 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 whitespace-nowrap transition-colors relative tracking-wide ${
                  active
                    ? "text-[#102D46] font-bold"
                    : "text-[#647580] hover:text-[#102D46]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#147D78] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar: Contact + Language Switcher + Free Case Review */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className={`text-sm font-medium whitespace-nowrap transition-colors ${
              isActive("/contact")
                ? "text-[#102D46] font-bold"
                : "text-[#647580] hover:text-[#102D46]"
            }`}
          >
            {t("contact")}
          </Link>

          <LanguageSwitcher />

          <Button href="/inquiry" variant="teal" size="md" className="whitespace-nowrap px-5 py-2.5 text-xs font-semibold shadow-none">
            {tCommon("freeCaseReview")}
          </Button>
        </div>

        {/* Mobile / Tablet Navigation Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <div className="sm:hidden">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#102D46] hover:bg-[#F3F6F5] rounded-md focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E1E7E8] bg-white px-6 py-6 space-y-5 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                pathname === "/"
                  ? "bg-[#F3F6F5] text-[#102D46] font-bold"
                  : "text-[#647580] hover:bg-[#F3F6F5] hover:text-[#102D46]"
              }`}
            >
              {t("home")}
            </Link>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                    active
                      ? "bg-[#F3F6F5] text-[#102D46] font-bold"
                      : "text-[#647580] hover:bg-[#F3F6F5] hover:text-[#102D46]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                pathname.startsWith("/contact")
                  ? "bg-[#F3F6F5] text-[#102D46] font-bold"
                  : "text-[#647580] hover:bg-[#F3F6F5] hover:text-[#102D46]"
              }`}
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#E1E7E8] space-y-3">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-sm font-semibold text-[#102D46] py-2.5 border border-[#E1E7E8] rounded-md hover:bg-[#F3F6F5] transition-colors"
            >
              <Search className="w-4 h-4 text-[#147D78]" />
              <span>{t("trackCase")}</span>
            </Link>
            <Button
              href="/inquiry"
              variant="teal"
              size="lg"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {tCommon("freeCaseReview")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
