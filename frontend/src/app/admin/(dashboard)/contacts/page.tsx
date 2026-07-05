"use client";

import { useState, useEffect } from "react";
import { apiAdmin } from "@/lib/apiAdmin";
import { Mail, Check, Trash2, X, Eye } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast, Toast } from "@/components/admin/Toast";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContacts() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => { fetch(); }, []);
  const fetch = () => apiAdmin<{ data: Contact[] }>("admin/contacts").then(r => { setItems(r.data); setLoading(false); });

  const markRead = async (id: number) => {
    try {
      await apiAdmin(`admin/contacts/${id}/read`, { method: "PATCH" });
      setItems(prev => prev.map(c => c.id === id ? { ...c, isRead: true } : c));
      if (selected?.id === id) setSelected(p => p ? { ...p, isRead: true } : null);
      showToast("Marked as read", "success");
    } catch {
      showToast("Failed to mark as read", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await apiAdmin(`admin/contacts/${deleteId}`, { method: "DELETE" });
      setItems(prev => prev.filter(c => c.id !== deleteId));
      if (selected?.id === deleteId) setSelected(null);
      setDeleteId(null);
      showToast("Message deleted!", "success");
    } catch {
      showToast("Failed to delete message", "error");
    }
  };

  if (loading) return (
    <div className="animate-pulse space-y-4">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      <div className="w-full max-w-lg bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <h1 className="font-heading text-2xl font-bold">Contacts</h1>
          <p className="text-sm text-gray-500 mt-0.5">{items.filter(c => !c.isRead).length} unread</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 px-4 pt-3 pb-1">
          <div className="flex gap-2">
            {["All", "Unread", "Read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === f ? "bg-zinc-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs ml-auto">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 pl-10" />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y">
          {(() => {
            const filtered = filter === "All" ? items : items.filter(c => filter === "Unread" ? !c.isRead : c.isRead);
            const searched = filtered.filter(c =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.email.toLowerCase().includes(search.toLowerCase()) ||
              (c.subject || "").toLowerCase().includes(search.toLowerCase())
            );
            return searched.length === 0 ? (
              <p className="p-8 text-center text-gray-400">No messages yet.</p>
            ) : searched.map((c) => (
            <div
              key={c.id}
              onClick={() => { setSelected(c); if (!c.isRead) markRead(c.id); }}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === c.id ? "bg-gray-50" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{c.name}</span>
                    {!c.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.subject || "No subject"}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{c.message}</p>
            </div>
          ));
          })()}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-y-auto">
        {selected ? (
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-blue-600 hover:underline">{selected.email}</a>
              </div>
              <div className="flex gap-2">
                {!selected.isRead && (
                  <button onClick={() => markRead(selected.id)} className="flex items-center gap-1.5 text-xs text-gray-600 px-3 py-1.5 rounded-lg border hover:bg-gray-50">
                    <Eye className="w-3.5 h-3.5" /> Mark Read
                  </button>
                )}
                <button onClick={() => setDeleteId(selected.id)} className="flex items-center gap-1.5 text-xs text-red-500 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
            {selected.subject && (
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Subject:</span> {selected.subject}
              </div>
            )}
            <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap leading-relaxed">
              {selected.message}
            </div>
            <p className="text-xs text-gray-400">{new Date(selected.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Mail className="w-10 h-10 mb-3" />
            <p className="text-sm">Select a message to view</p>
          </div>
        )}
      </div>

      <ConfirmDialog open={deleteId !== null} title="Delete Message" message="Are you sure you want to delete this message?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
