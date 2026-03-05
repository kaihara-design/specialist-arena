"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  Home,
  FileText,
  BookOpen,
  ExternalLink,
  ChevronsUpDown,
  CircleUserRound,
  LogOut,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  active?: "home" | "tasks" | "arena" | "settings";
}

export function DashboardSidebar({ active }: DashboardSidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-[255px] min-h-screen bg-[#fafaff] border-r border-[#e5e7eb] flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-[23px] bg-[#0f172b] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">C</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[#64748b] leading-none">
              Centaur.ai
            </p>
            <p className="text-[18px] font-bold text-[#1e293b] leading-[28px]">
              Specialist Home
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-4 h-[36px] px-[12px] rounded-[8px] text-[14px] transition-colors",
            active === "home"
              ? "bg-slate-100 text-[#0f172b] font-medium"
              : "text-[#1e293b] hover:bg-slate-100 font-normal"
          )}
        >
          <Home className="h-4 w-4 flex-shrink-0" />
          Home
        </Link>

        <Link
          href="#"
          className={cn(
            "flex items-center gap-4 h-[36px] px-[12px] rounded-[8px] text-[14px] transition-colors",
            active === "tasks"
              ? "bg-slate-100 text-[#0f172b] font-medium"
              : "text-[#1e293b] hover:bg-slate-100 font-normal"
          )}
        >
          <FileText className="h-4 w-4 flex-shrink-0" />
          My Tasks
        </Link>

        <Link
          href="/arena"
          className={cn(
            "flex items-center gap-4 h-[36px] px-[12px] rounded-[8px] text-[14px] transition-colors",
            active === "arena"
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-[#1e293b] hover:bg-slate-100 font-normal"
          )}
        >
          <Trophy className="h-4 w-4 flex-shrink-0" />
          Arena
        </Link>
      </nav>

      {/* Expert Labeler Guides */}
      <div className="px-4 pb-4">
        <a
          href="#"
          className="flex items-center gap-4 h-[36px] px-[12px] rounded-[8px] text-[14px] font-normal text-[#1e293b] hover:bg-slate-100 transition-colors"
        >
          <BookOpen className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1">Specialist Guides</span>
          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[#94a3b8]" />
        </a>
      </div>

      {/* User */}
      <div
        className="px-4 py-[17px] border-t border-[#e5e7eb] relative"
        ref={menuRef}
      >
        {menuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden z-50">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <div className="h-8 w-8 rounded-full bg-[#e5e7eb] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#1e293b]">JL</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0f172b] truncate">
                  Jane Liam
                </p>
                <p className="text-xs text-[#62748e] truncate">
                  jliam@centaurlabs.com
                </p>
              </div>
            </div>
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#1e293b] hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <CircleUserRound className="h-4 w-4 text-[#62748e]" />
              My Profile
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#1e293b] hover:bg-slate-50 transition-colors"
            >
              <LogOut className="h-4 w-4 text-[#62748e]" />
              Log out
            </button>
          </div>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-full flex items-center gap-[12px] px-2 py-1 rounded-[9999px] hover:bg-slate-100 transition-colors text-left"
        >
          <div className="h-10 w-10 rounded-full bg-[#e5e7eb] flex items-center justify-center flex-shrink-0">
            <span className="text-[16px] font-normal text-[#1e293b]">JL</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-normal text-[#1e293b] truncate leading-[20px]">
              Jane Liam
            </p>
          </div>
          <svg className="h-5 w-5 text-[#94a3b8] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
