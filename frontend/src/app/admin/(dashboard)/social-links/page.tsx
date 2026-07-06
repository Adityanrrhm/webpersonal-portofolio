"use client";

import { useState, useEffect, type FormEvent } from "react";
import { apiAdmin } from "@/lib/apiAdmin";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast, Toast } from "@/components/admin/Toast";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  iconName: string;
}

const empty: SocialLink = { id: 0, platform: "", url: "", iconName: "" };

export default function AdminSocialLinks() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<SocialLink>(empty);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => { fetch(); }, []);
  const fetch = () => apiAdmin<{ data: SocialLink[] }>("admin/social-links").then(r => { setItems(r.data); setLoading(false); });

  const openCreate = () => { setEditing(empty); setModal(true); };
  const openEdit = (s: SocialLink) => { setEditing(s); setModal(true); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const body = { platform: editing.platform, url: editing.url, icon_name: editing.iconName };
    try {
      if (editing.id) {
        await apiAdmin(`admin/social-links/${editing.id}`, { method: "PUT", body: JSON.stringify(body) });
        showToast("Social link updated!", "success");
      } else {
        await apiAdmin("admin/social-links", { method: "POST", body: JSON.stringify(body) });
        showToast("Social link created!", "success");
      }
      setModal(false);
      fetch();
    } catch {
      showToast("Failed to save social link", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await apiAdmin(`admin/social-links/${deleteId}`, { method: "DELETE" });
      showToast("Social link deleted!", "success");
      setDeleteId(null);
      fetch();
    } catch {
      showToast("Failed to delete social link", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-40 bg-gray-200 rounded-lg" />
        <div className="h-10 w-28 bg-gray-200 rounded-lg" />
      </div>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Platform</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array(4).fill(0).map((_, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-48" /></td>
                <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const searched = items.filter(s =>
    s.platform.toLowerCase().includes(search.toLowerCase()) ||
    s.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Social Links</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.97]">
          <Plus className="w-4 h-4" /> Add Link
        </button>
      </div>

      <div className="relative mb-4 max-w-md">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search social links..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 pl-10" />
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      <div className="bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Platform</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searched.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-400">No social links yet.</td></tr>
            )}
            {searched.map((s) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.platform}</td>
                <td className="px-4 py-3 text-gray-500 text-xs truncate max-w-[300px]">{s.url}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{s.iconName}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-all active:scale-[0.92]"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all active:scale-[0.92]"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <form onSubmit={save} className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-semibold">{editing.id ? "Edit Social Link" : "New Social Link"}</h2>
              <button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 active:scale-[0.92]"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Input label="Platform" value={editing.platform} onChange={v => setEditing(p => ({ ...p, platform: v }))} required placeholder="LinkedIn, GitHub, etc" />
              <Input label="URL" type="text" value={editing.url} onChange={v => setEditing(p => ({ ...p, url: v }))} required />
              <Input label="Icon Name" value={editing.iconName} onChange={v => setEditing(p => ({ ...p, iconName: v }))} required placeholder="FaLinkedin, SiGithub, Mail" />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button type="button" onClick={() => setModal(false)} disabled={isSaving} className="px-4 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-all active:scale-[0.97] disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-[0.97] disabled:opacity-70">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog open={deleteId !== null} loading={isDeleting} title="Delete Social Link" message="Are you sure you want to delete this social link?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

function Input({ label, value, onChange, required, type, placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
      <input type={type || "text"} required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
    </div>
  );
}
