"use client";

import { useState, useEffect, type FormEvent } from "react";
import { apiAdmin } from "@/lib/apiAdmin";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { useToast, Toast } from "@/components/admin/Toast";

interface Certificate {
  id: number;
  title: string;
  org: string;
  category: string;
  issuedDate: string;
  credentialId: string | null;
  description: string | null;
  imageUrl: string | null;
  credentialUrl: string | null;
}

const empty: Certificate = { id: 0, title: "", org: "", category: "", issuedDate: "", credentialId: "", description: "", imageUrl: "", credentialUrl: "" };

export default function AdminCertificates() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Certificate>(empty);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => { fetch(); }, []);
  const fetch = () => apiAdmin<{ data: Certificate[] }>("admin/certificates").then(r => { setItems(r.data); setLoading(false); });

  const openCreate = () => { setEditing({ ...empty, issuedDate: new Date().toISOString().split("T")[0] }); setModal(true); };
  const openEdit = (c: Certificate) => { setEditing(c); setModal(true); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        title: editing.title,
        org: editing.org,
        category: editing.category,
        issued_date: editing.issuedDate,
        credential_id: editing.credentialId || null,
        description: editing.description || null,
        image_url: editing.imageUrl || null,
        credential_url: editing.credentialUrl || null,
      };
      if (editing.id) {
        await apiAdmin(`admin/certificates/${editing.id}`, { method: "PUT", body: JSON.stringify(body) });
        showToast("Certificate updated!", "success");
      } else {
        await apiAdmin("admin/certificates", { method: "POST", body: JSON.stringify(body) });
        showToast("Certificate created!", "success");
      }
      setModal(false);
      fetch();
    } catch {
      showToast("Failed to save certificate", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await apiAdmin(`admin/certificates/${deleteId}`, { method: "DELETE" });
      showToast("Certificate deleted!", "success");
      setDeleteId(null);
      fetch();
    } catch {
      showToast("Failed to delete certificate", "error");
    }
  };

  const filtered = activeCategory === "All" ? items : items.filter(c => c.category === activeCategory);
  const searched = filtered.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.org.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 rounded-lg w-48" />
      <div className="h-10 bg-gray-200 rounded-lg" />
      <div className="space-y-2">
        {Array(4).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-lg" />)}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Certificates</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.97]">
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["All", ...new Set(items.map((c) => c.category))].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all active:scale-[0.97] ${
              activeCategory === cat ? "bg-zinc-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat} <span className="opacity-60">({cat === "All" ? items.length : items.filter(c => c.category === cat).length})</span>
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search certificates..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 pl-10" />
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      <p className="text-xs text-gray-400 mb-3">{searched.length} of {filtered.length} certificates</p>

      <div className="bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium w-14">Image</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Organization</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searched.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No certificates found.</td></tr>
            )}
            {searched.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  {c.imageUrl
                    ? <img src={c.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                    : <div className="w-10 h-10 rounded-lg bg-gray-100 border" />
                  }
                </td>
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3 text-gray-500">{c.org}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-gray-100">{c.category}</span></td>
                <td className="px-4 py-3 text-gray-500">{c.issuedDate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-all active:scale-[0.92]"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all active:scale-[0.92]"><Trash2 className="w-4 h-4" /></button>
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
              <h2 className="font-heading text-lg font-semibold">{editing.id ? "Edit Certificate" : "New Certificate"}</h2>
              <button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 active:scale-[0.92]"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={v => setEditing(p => ({ ...p, title: v }))} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Organization" value={editing.org} onChange={v => setEditing(p => ({ ...p, org: v }))} required />
                <Input label="Category" value={editing.category} onChange={v => setEditing(p => ({ ...p, category: v }))} required />
              </div>
              <Input label="Issued Date" type="date" value={editing.issuedDate} onChange={v => setEditing(p => ({ ...p, issuedDate: v }))} required />
              <Input label="Credential ID" value={editing.credentialId || ""} onChange={v => setEditing(p => ({ ...p, credentialId: v }))} />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea value={editing.description || ""} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Image</label>
                <ImageUpload value={editing.imageUrl || ""} onChange={v => setEditing(p => ({ ...p, imageUrl: v }))} />
              </div>
              <Input label="Credential URL" type="text" value={editing.credentialUrl || ""} onChange={v => setEditing(p => ({ ...p, credentialUrl: v }))} />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button type="button" onClick={() => setModal(false)} className="px-4 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-all active:scale-[0.97]">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg text-sm bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-[0.97]">Save</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog open={deleteId !== null} title="Delete Certificate" message="Are you sure you want to delete this certificate?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

function Input({ label, value, onChange, required, type }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
      <input type={type || "text"} required={required} value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
    </div>
  );
}
