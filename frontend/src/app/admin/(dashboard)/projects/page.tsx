"use client";

import { useState, useEffect, type FormEvent } from "react";
import { apiAdmin } from "@/lib/apiAdmin";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { useToast, Toast } from "@/components/admin/Toast";

interface Project {
  id: number;
  title: string;
  category: string;
  label: string;
  description: string | null;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
}

const empty: Project = { id: 0, title: "", category: "", label: "", description: "", techStack: [], imageUrl: "", liveUrl: "", githubUrl: "" };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Project>(empty);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [activeLabel, setActiveLabel] = useState("All");
  const [search, setSearch] = useState("");
  const { toast, showToast, dismissToast } = useToast();

  useEffect(() => { fetch(); }, []);
  const fetch = () => apiAdmin<{ data: Project[] }>("admin/projects").then(r => { setProjects(r.data); setLoading(false); });

  const openCreate = () => { setEditing(empty); setModal(true); };
  const openEdit = (p: Project) => { setEditing(p); setModal(true); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        title: editing.title,
        category: editing.category,
        label: editing.label,
        description: editing.description || null,
        tech_stack: editing.techStack,
        image_url: editing.imageUrl || null,
        live_url: editing.liveUrl || null,
        github_url: editing.githubUrl || null,
      };
      if (editing.id) {
        await apiAdmin(`admin/projects/${editing.id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await apiAdmin("admin/projects", { method: "POST", body: JSON.stringify(body) });
      }
      setModal(false);
      showToast(editing.id ? "Project updated!" : "Project created!", "success");
      fetch();
    } catch {
      showToast("Failed to save project", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await apiAdmin(`admin/projects/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      showToast("Project deleted!", "success");
      fetch();
    } catch {
      showToast("Failed to delete project", "error");
    }
  };

  const filtered = activeLabel === "All" ? projects : projects.filter(p => p.label === activeLabel);
  const searched = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  if (loading) return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Projects</h1>
        <div className="h-10 w-32 bg-gray-200 rounded-lg" />
      </div>
      <div className="animate-pulse rounded-xl border shadow-sm overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              {["Image", "Title", "Category", "Label", "Actions"].map(h => (
                <th key={h} className="px-4 py-3"><div className="h-4 w-16 bg-gray-200 rounded" /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="border-b last:border-0">
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} className="px-4 py-3"><div className="h-5 bg-gray-100 rounded" style={{ width: j === 0 ? 40 : j === 4 ? 60 : 80 }} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">
          Projects
          {projects.length > 0 && (
            <span className="ml-2 text-base font-normal text-gray-400">
              {searched.length} of {filtered.length}
            </span>
          )}
        </h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.97]">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["All", ...new Set(projects.map((p) => p.label))].map((label) => (
          <button
            key={label}
            onClick={() => setActiveLabel(label)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all active:scale-[0.97] ${
              activeLabel === label ? "bg-zinc-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label} <span className="opacity-60">({label === "All" ? projects.length : projects.filter(p => p.label === label).length})</span>
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 pl-10"
        />
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      <div className="bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium w-14">Image</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Label</th>
              <th className="px-4 py-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searched.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">No projects found.</td></tr>
            )}
            <AnimatePresence>
              {searched.map((p) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-gray-100">{p.label}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-all active:scale-[0.92]"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all active:scale-[0.92]"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <form onSubmit={save} className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-semibold">{editing.id ? "Edit Project" : "New Project"}</h2>
              <button type="button" onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 active:scale-[0.92]"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Input label="Title" value={editing.title} onChange={v => setEditing(p => ({ ...p, title: v }))} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Category" value={editing.category} onChange={v => setEditing(p => ({ ...p, category: v }))} required />
                <Input label="Label" value={editing.label} onChange={v => setEditing(p => ({ ...p, label: v }))} required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea value={editing.description || ""} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Tech Stack</label>
                <input value={editing.techStack.join(", ")} onChange={e => setEditing(p => ({ ...p, techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} placeholder="Separate with commas" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Image</label>
                <ImageUpload value={editing.imageUrl || ""} onChange={v => setEditing(p => ({ ...p, imageUrl: v }))} />
              </div>
              <Input label="Live URL" type="text" value={editing.liveUrl || ""} onChange={v => setEditing(p => ({ ...p, liveUrl: v }))} />
              <Input label="GitHub URL" type="text" value={editing.githubUrl || ""} onChange={v => setEditing(p => ({ ...p, githubUrl: v }))} />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button type="button" onClick={() => setModal(false)} className="px-4 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-all active:scale-[0.97]">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg text-sm bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-[0.97]">Save</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog open={deleteId !== null} title="Delete Project" message="Are you sure you want to delete this project?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
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
