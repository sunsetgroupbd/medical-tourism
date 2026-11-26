"use client";

import React, { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

export const LanguageSwitcher: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "bn" ? "en" : "bn";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      title={locale === "bn" ? "Switch to English" : "বাংলা ভাষায় পরিবর্তন করুন"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[#E1E7E8] text-[#172B3A] hover:bg-[#F3F6F5] hover:text-[#102D46] transition-colors focus:outline-none focus:ring-1 focus:ring-[#147D78] ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-[#147D78]" />
      <span className={locale === "bn" ? "font-bold text-[#102D46]" : "text-[#647580]"}>
        বাংলা
      </span>
      <span className="text-[#E1E7E8]">/</span>
      <span className={locale === "en" ? "font-bold text-[#102D46]" : "text-[#647580]"}>
        EN
      </span>
    </button>
  );
};
