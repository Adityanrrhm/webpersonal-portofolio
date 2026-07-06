"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  ScrollText,
  Briefcase,
  Wrench,
  Link2,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react";

const links = [
  { label: "Dashboard",  href: "/admin",              icon: LayoutDashboard },
  { label: "Projects",   href: "/admin/projects",      icon: FolderKanban },
  { label: "Certificates", href: "/admin/certificates", icon: ScrollText },
  { label: "Experiences", href: "/admin/experiences",   icon: Briefcase },
  { label: "Skills",     href: "/admin/skills",        icon: Wrench },
  { label: "Social Links", href: "/admin/social-links", icon: Link2 },
  { label: "Profile",    href: "/admin/profile",       icon: User },
  { label: "Contacts",   href: "/admin/contacts",      icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-zinc-900 text-white flex flex-col shrink-0 min-h-screen shadow-[4px_0_12px_rgba(0,0,0,0.08)]">
      <div className="px-6 py-6 border-b border-zinc-800">
        <h1 className="font-heading text-lg font-bold">Portfolio Admin</h1>
        <p className="text-xs text-zinc-400 mt-0.5">{user?.email}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all active:scale-[0.97] w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
