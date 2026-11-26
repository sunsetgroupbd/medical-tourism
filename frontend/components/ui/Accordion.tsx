"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = "" }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`divide-y divide-[#E1E7E8] border-y border-[#E1E7E8] ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left gap-4 py-1 text-base md:text-lg font-semibold text-[#102D46] hover:text-[#147D78] transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#647580] transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180 text-[#147D78]" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="pt-3 pb-1 text-[#647580] text-sm md:text-base leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
