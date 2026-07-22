"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  UserPlus,
  Users,
  Mail,
  MessageSquare,
  ShieldAlert,
  Wrench,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { name: "Client Onboarding", href: "/dashboard/onboarding", icon: UserPlus },
  { name: "Clients Management", href: "/dashboard/clients", icon: Users },
  { name: "Finance Inbox", href: "/dashboard/finance-inbox", icon: Mail },
  { name: "Communications", href: "/dashboard/communications", icon: MessageSquare },
  { name: "Compliance", href: "/dashboard/compliance", icon: ShieldAlert },
  { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      suppressHydrationWarning
      className={`flex flex-col h-screen fixed top-0 left-0 bg-[#0a0a0a] border-r border-white/10 z-[9999] transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Identity & Collapse Toggle Button */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] shrink-0">
            S
          </div>
          {!isCollapsed && (
            <span className="text-base font-semibold tracking-tight text-white whitespace-nowrap">
              StrataPilot AI
            </span>
          )}
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {!isCollapsed && (
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-4 px-2">
            Main Menu
          </div>
        )}
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : ""}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} className={`shrink-0 ${isActive ? "text-blue-400" : "text-gray-500"}`} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User / Settings Section */}
      <div className="p-3 border-t border-white/5 space-y-1.5">
        <Link
          href="/settings"
          title={isCollapsed ? "Settings" : ""}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            pathname === "/settings"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Settings size={18} className={`shrink-0 ${pathname === "/settings" ? "text-teal-400" : "text-gray-500"}`} />
          {!isCollapsed && <span className="truncate">Settings</span>}
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }}
          title={isCollapsed ? "Log out" : ""}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-red-400 transition-all duration-200 text-left cursor-pointer"
        >
          <LogOut size={18} className="text-gray-500 shrink-0" />
          {!isCollapsed && <span className="truncate">Log out</span>}
        </button>
      </div>
    </aside>
  );
}