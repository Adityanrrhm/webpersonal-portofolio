"use client";

import { useState, useEffect } from "react";
import { apiAdmin } from "@/lib/apiAdmin";
import {
  FolderKanban,
  ScrollText,
  Briefcase,
  Wrench,
  MessageSquare,
  Mail,
} from "lucide-react";

interface Stats {
  totalProjects: number;
  totalCertificates: number;
  totalExperiences: number;
  totalSkills: number;
  unreadContacts: number;
  totalContacts: number;
}

const cards = [
  { key: "totalProjects",     label: "Projects",     icon: FolderKanban,  color: "text-blue-600", bg: "bg-blue-50" },
  { key: "totalCertificates", label: "Certificates", icon: ScrollText,    color: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "totalExperiences",  label: "Experiences",  icon: Briefcase,     color: "text-violet-600", bg: "bg-violet-50" },
  { key: "totalSkills",       label: "Skills",       icon: Wrench,        color: "text-amber-600", bg: "bg-amber-50" },
  { key: "unreadContacts",    label: "Unread Messages", icon: Mail,       color: "text-rose-600", bg: "bg-rose-50" },
  { key: "totalContacts",     label: "Total Messages",  icon: MessageSquare, color: "text-gray-600", bg: "bg-gray-100" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiAdmin<{ data: Stats }>("admin/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const value = stats ? String((stats as unknown as Record<string, number>)[card.key] ?? "—") : "—";
          return (
            <div key={card.key} className="bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-6">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
